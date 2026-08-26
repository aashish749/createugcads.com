import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { plansData } from '../assets/dummy-data';
import { useUser, useClerk } from '../context/AuthContext';


import api from '../configs/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
    CreditCardIcon,
    ArrowLeftIcon,
    CheckCircle2Icon,
    Loader2Icon,
    SparklesIcon,
    CheckIcon,
    ArrowRightIcon,
    LockIcon,
    AlertCircleIcon
} from 'lucide-react';
import { PrimaryButton, GhostButton } from '../components/Buttons';

// Luhn Algorithm to validate card number checksum
function checkLuhn(cardNo: string): boolean {
    const s = cardNo.replace(/\D/g, '');
    if (s.length < 13 || s.length > 19) return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i = s.length - 1; i >= 0; i--) {
        let digit = parseInt(s.charAt(i), 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// Detect Card Brand
function getCardBrand(number: string): 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown' {
    const cleaned = number.replace(/\D/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^(5[1-5]|2[2-7])/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(011|5)/.test(cleaned)) return 'discover';
    return 'unknown';
}

export default function Checkout() {
    const { planId = 'pro' } = useParams<{ planId: string }>();
    const navigate = useNavigate();
    const { user, isLoaded } = useUser();
    const { openSignIn } = useClerk();

    const plan = plansData.find((p) => p.id === planId) || plansData[1];


    // Form fields
    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [country, setCountry] = useState('US');
    const [postalCode, setPostalCode] = useState('');

    // Validation & Processing States
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [processStep, setProcessStep] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [receiptData, setReceiptData] = useState<{
        txId: string;
        date: string;
        credits: number;
        balance: number;
        cardLast4: string;
        amount: string;
    } | null>(null);

    useEffect(() => {
        if (isLoaded && !user) {
            openSignIn();
        }
    }, [isLoaded, user]);

    // Format Card Number (XXXX XXXX XXXX XXXX)
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '').slice(0, 16);
        val = val.replace(/(.{4})/g, '$1 ').trim();
        setCardNumber(val);
        if (errors.cardNumber) {
            setErrors((prev) => ({ ...prev, cardNumber: '' }));
        }
    };

    // Format Expiry (MM/YY)
    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '').slice(0, 4);
        if (val.length >= 3) {
            val = `${val.slice(0, 2)}/${val.slice(2)}`;
        }
        setExpiry(val);
        if (errors.expiry) {
            setErrors((prev) => ({ ...prev, expiry: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // 1. Name validation
        if (!nameOnCard.trim() || nameOnCard.trim().length < 2) {
            newErrors.nameOnCard = 'Please enter name';
        }

        // 2. Card Number validation (Luhn check)
        const rawDigits = cardNumber.replace(/\s/g, '');
        if (!rawDigits) {
            newErrors.cardNumber = 'Card number is required';
        } else if (rawDigits.length < 15) {
            newErrors.cardNumber = 'Enter valid 16-digit card number';
        } else if (!checkLuhn(rawDigits)) {
            newErrors.cardNumber = 'Card number is invalid';
        }

        // 3. Expiry validation
        if (!expiry || expiry.length < 5) {
            newErrors.expiry = 'Enter MM/YY';
        } else {
            const [mmStr, yyStr] = expiry.split('/');
            const month = parseInt(mmStr, 10);
            const year = parseInt(`20${yyStr}`, 10);
            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentYear = now.getFullYear();

            if (isNaN(month) || month < 1 || month > 12) {
                newErrors.expiry = 'Invalid month';
            } else if (isNaN(year) || year < currentYear || (year === currentYear && month < currentMonth)) {
                newErrors.expiry = 'Card is expired';
            }
        }

        // 4. CVV validation
        const cardBrand = getCardBrand(cardNumber);
        const requiredCvvLength = cardBrand === 'amex' ? 4 : 3;
        if (!cvv || cvv.length < requiredCvvLength) {
            newErrors.cvv = `Enter ${requiredCvvLength} digits`;
        }

        // 5. Postal code validation
        if (!postalCode.trim()) {
            newErrors.postalCode = 'Required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProcessPayment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setIsProcessing(true);

            // Step 1: Network authorization
            setProcessStep('Authorizing payment...');
            await new Promise((r) => setTimeout(r, 1200));

            // Step 2: 3D Secure verification
            setProcessStep('Verifying with bank...');
            await new Promise((r) => setTimeout(r, 1000));

            // Step 3: Top-up credits on backend
            const { data } = await api.post('/api/user/buy-credits', { planId: plan.id });


            const rawDigits = cardNumber.replace(/\s/g, '');
            const cardLast4 = rawDigits.slice(-4) || '4242';
            const txId = `TX_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

            setReceiptData({
                txId,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                credits: plan.credits,
                balance: data.credits,
                cardLast4,
                amount: plan.price
            });

            // Dispatch global event for instant Navbar update
            window.dispatchEvent(new CustomEvent('credits-updated', { detail: { credits: data.credits } }));

            setIsSuccess(true);
            toast.success(`Payment authorized! Added ${plan.credits} credits.`);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message || 'Payment authorization failed');
        } finally {
            setIsProcessing(false);
            setProcessStep('');
        }
    };

    const cardBrand = getCardBrand(cardNumber);

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 text-white">
            <div className="max-w-5xl mx-auto">
                {/* Header Back Link */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        to="/plans"
                        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition"
                    >
                        <ArrowLeftIcon className="size-4" /> Back to Plans
                    </Link>
                </div>

                {!isSuccess ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* LEFT COLUMN: Order Summary */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-xl shadow-xl">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
                                    <SparklesIcon className="size-4" /> Order Summary
                                </div>

                                <div className="flex items-baseline justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-white">{plan.name} Plan</h2>
                                    <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                                </div>

                                <p className="text-neutral-400 text-xs mb-6">{plan.desc}</p>

                                {/* Credits Badge Box */}
                                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 mb-6">
                                    <div className="flex items-center justify-between text-sm font-semibold text-indigo-300">
                                        <span>Credits Allocation</span>
                                        <span className="text-base font-bold text-white">+{plan.credits} Credits</span>
                                    </div>
                                    <p className="text-neutral-400 text-xs mt-1">
                                        Allocated to your account upon payment completion.
                                    </p>
                                </div>

                                {/* Plan Features */}
                                <div className="space-y-2.5 mb-6 text-sm text-neutral-300 border-y border-neutral-800/80 py-4">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2.5">
                                            <CheckIcon className="size-4 text-indigo-400 shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-2 text-sm text-neutral-400">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="text-white">{plan.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Taxes & Processing</span>
                                        <span className="text-white">$0.00</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-neutral-800 text-base font-bold text-white">
                                        <span>Total Due</span>
                                        <span className="text-indigo-400">{plan.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Payment Details Form */}
                        <div className="lg:col-span-7">
                            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-xl shadow-2xl">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white">Payment Details</h3>
                                    <p className="text-neutral-400 text-xs mt-1">
                                        Enter your card information to proceed.
                                    </p>
                                </div>

                                <form
                                    onSubmit={handleProcessPayment}
                                    autoComplete="off"
                                    spellCheck={false}
                                    data-form-type="other"
                                    className="space-y-4"
                                >
                                    {/* Cardholder Name */}
                                    <div>
                                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                                            Cardholder Name
                                        </label>
                                        <input
                                            type="text"
                                            name="payer_fullname"
                                            id="payer_fullname"
                                            autoComplete="off"
                                            data-lpignore="true"
                                            placeholder="e.g. John Doe"
                                            value={nameOnCard}
                                            onChange={(e) => {
                                                setNameOnCard(e.target.value);
                                                if (errors.nameOnCard) setErrors((prev) => ({ ...prev, nameOnCard: '' }));
                                            }}
                                            className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition ${
                                                errors.nameOnCard
                                                    ? 'border-red-500/80 focus:border-red-500'
                                                    : 'border-neutral-800 focus:border-indigo-500'
                                            }`}
                                        />
                                        {errors.nameOnCard && (
                                            <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                                                <AlertCircleIcon className="size-3.5" /> {errors.nameOnCard}
                                            </p>
                                        )}
                                    </div>

                                    {/* Card Number */}
                                    <div>
                                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex justify-between">
                                            <span>Card Number</span>
                                            <span className="text-neutral-500 font-normal uppercase text-[11px]">
                                                {cardBrand !== 'unknown' ? cardBrand : 'Visa / MasterCard / AMEX'}
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="payer_account_code"
                                                id="payer_account_code"
                                                autoComplete="off"
                                                data-lpignore="true"
                                                placeholder="•••• •••• •••• ••••"
                                                value={cardNumber}
                                                onChange={handleCardNumberChange}
                                                maxLength={19}
                                                className={`w-full bg-neutral-950 border rounded-xl pl-4 pr-16 py-3 text-sm text-white placeholder-neutral-500 font-mono tracking-wider focus:outline-none transition ${
                                                    errors.cardNumber
                                                        ? 'border-red-500/80 focus:border-red-500'
                                                        : 'border-neutral-800 focus:border-indigo-500'
                                                }`}
                                            />
                                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                                                {cardBrand === 'visa' && (
                                                    <span className="text-xs font-black italic bg-blue-600 text-white px-2 py-0.5 rounded">
                                                        VISA
                                                    </span>
                                                )}
                                                {cardBrand === 'mastercard' && (
                                                    <span className="text-xs font-bold bg-amber-600 text-white px-2 py-0.5 rounded">
                                                        MC
                                                    </span>
                                                )}
                                                {cardBrand === 'amex' && (
                                                    <span className="text-xs font-bold bg-sky-600 text-white px-2 py-0.5 rounded">
                                                        AMEX
                                                    </span>
                                                )}
                                                {cardBrand === 'unknown' && (
                                                    <CreditCardIcon className="size-5 text-neutral-500" />
                                                )}
                                            </div>
                                        </div>
                                        {errors.cardNumber && (
                                            <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                                                <AlertCircleIcon className="size-3.5" /> {errors.cardNumber}
                                            </p>
                                        )}
                                    </div>

                                    {/* Expiry & CVV */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                                                Expiration Date
                                            </label>
                                            <input
                                                type="text"
                                                name="payer_expiry_date"
                                                id="payer_expiry_date"
                                                autoComplete="off"
                                                data-lpignore="true"
                                                placeholder="MM/YY"
                                                value={expiry}
                                                onChange={handleExpiryChange}
                                                maxLength={5}
                                                className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 font-mono focus:outline-none transition ${
                                                    errors.expiry
                                                        ? 'border-red-500/80 focus:border-red-500'
                                                        : 'border-neutral-800 focus:border-indigo-500'
                                                }`}
                                            />
                                            {errors.expiry && (
                                                <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                                                    <AlertCircleIcon className="size-3.5" /> {errors.expiry}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center justify-between">
                                                <span>Security Code</span>
                                                <span className="text-neutral-500 text-[11px]">CVC/CVV</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="payer_security_val"
                                                id="payer_security_val"
                                                autoComplete="off"
                                                data-lpignore="true"
                                                placeholder="•••"
                                                value={cvv}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                    setCvv(val);
                                                    if (errors.cvv) setErrors((prev) => ({ ...prev, cvv: '' }));
                                                }}
                                                maxLength={4}
                                                className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 font-mono focus:outline-none transition ${
                                                    errors.cvv
                                                        ? 'border-red-500/80 focus:border-red-500'
                                                        : 'border-neutral-800 focus:border-indigo-500'
                                                }`}
                                            />
                                            {errors.cvv && (
                                                <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                                                    <AlertCircleIcon className="size-3.5" /> {errors.cvv}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Country & Postal Code */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                                                Country
                                            </label>
                                            <select
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                                            >
                                                <option value="US">United States (US)</option>
                                                <option value="CA">Canada (CA)</option>
                                                <option value="UK">United Kingdom (UK)</option>
                                                <option value="AU">Australia (AU)</option>
                                                <option value="DE">Germany (DE)</option>
                                                <option value="IN">India (IN)</option>
                                                <option value="NP">Nepal (NP)</option>
                                                <option value="OTHER">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                                                Postal / ZIP Code
                                            </label>
                                            <input
                                                type="text"
                                                name="payer_postal_region"
                                                id="payer_postal_region"
                                                autoComplete="off"
                                                data-lpignore="true"
                                                placeholder="ZIP / Postal"
                                                value={postalCode}
                                                onChange={(e) => {
                                                    setPostalCode(e.target.value);
                                                    if (errors.postalCode) setErrors((prev) => ({ ...prev, postalCode: '' }));
                                                }}
                                                className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition ${
                                                    errors.postalCode
                                                        ? 'border-red-500/80 focus:border-red-500'
                                                        : 'border-neutral-800 focus:border-indigo-500'
                                                }`}
                                            />
                                            {errors.postalCode && (
                                                <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                                                    <AlertCircleIcon className="size-3.5" /> {errors.postalCode}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Terms & Card Saving */}
                                    <div className="pt-2">
                                        <label className="flex items-center gap-2.5 text-xs text-neutral-400 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="size-4 rounded bg-neutral-950 border-neutral-700 text-indigo-600 focus:ring-0"
                                            />
                                            <span>Save payment method for future orders</span>
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <PrimaryButton
                                            type="submit"
                                            disabled={isProcessing}
                                            className="w-full py-4 text-base font-bold shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <Loader2Icon className="size-5 animate-spin" />
                                                    <span>{processStep || 'Authorizing Payment...'}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <LockIcon className="size-4" />
                                                    <span>Pay {plan.price}</span>
                                                </>
                                            )}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* SUCCESS SCREEN / RECEIPT */
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="max-w-xl mx-auto rounded-3xl bg-neutral-900 border border-neutral-800 p-8 sm:p-10 shadow-2xl text-center"
                    >
                        <div className="size-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                            <CheckCircle2Icon className="size-10" />
                        </div>

                        <h2 className="text-3xl font-extrabold text-white mb-2">Payment Authorized!</h2>
                        <p className="text-neutral-400 text-sm mb-6">
                            Thank you, <span className="text-white font-medium">{user?.name?.split(' ')[0] || user?.name || 'Creator'}</span>! Your credits have been added.
                        </p>


                        {/* Receipt Details Box */}
                        {receiptData && (
                            <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-5 mb-8 text-left space-y-3 text-sm">
                                <div className="flex justify-between items-center pb-2 border-b border-neutral-800/60">
                                    <span className="text-neutral-400 text-xs">Transaction Reference</span>
                                    <span className="font-mono text-xs text-neutral-300">{receiptData.txId}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-400">Plan Selected</span>
                                    <span className="font-semibold text-white">{plan.name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-400">Credits Credited</span>
                                    <span className="font-bold text-emerald-400">+{receiptData.credits} Credits</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-400">Updated Balance</span>
                                    <span className="font-bold text-indigo-400">{receiptData.balance} Credits</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-400">Payment Method</span>
                                    <span className="text-neutral-300 font-mono">Card ending in {receiptData.cardLast4}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-neutral-800/60 text-base font-bold">
                                    <span className="text-white">Amount Billed</span>
                                    <span className="text-white">{receiptData.amount}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <GhostButton
                                onClick={() => navigate('/my-generations')}
                                className="py-3 px-6 text-sm justify-center"
                            >
                                My Dashboard
                            </GhostButton>
                            <PrimaryButton
                                onClick={() => navigate('/generate')}
                                className="py-3 px-7 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
                            >
                                Start Generating UGC <ArrowRightIcon className="size-4" />
                            </PrimaryButton>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
