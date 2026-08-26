import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import UploadZone from "../components/UploadZone";
import { Loader2Icon, RectangleHorizontalIcon, RectangleVerticalIcon, Wand2Icon, LockIcon, ArrowRightIcon } from "lucide-react";
import { PrimaryButton } from "../components/Buttons";

import { useUser, useClerk } from "../context/AuthContext";

import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../configs/axios";

const Genetator = () => {
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();


  const [credits, setCredits] = useState<number | null>(null);
  const [loadingCredits, setLoadingCredits] = useState(true);

  const [name, setName] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchCredits = async () => {
    try {
      setLoadingCredits(true);
      const { data } = await api.get('/api/user/credits');
      setCredits(data.credits);
    } catch (error) {
      setCredits(0);
    } finally {
      setLoadingCredits(false);
    }
  };


  useEffect(() => {
    if (isLoaded) {
      if (user) {
        fetchCredits();
      } else {
        setLoadingCredits(false);
      }
    }
  }, [isLoaded, user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'model') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'product') setProductImage(e.target.files[0]);
      else setModelImage(e.target.files[0]);
    }
  };

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      openSignIn();
      return;
    }

    if (credits !== null && credits < 5) {
      toast.error('You need an active plan with at least 5 credits to generate UGC.');
      navigate('/plans');
      return;
    }

    if (!productImage || !modelImage || !name || !productName || !aspectRatio) {
      return toast.error('Please upload both images and enter required fields');
    }

    try {
      setIsGenerating(true);
      const formData = new FormData();

      formData.append('name', name);
      formData.append('productName', productName);
      formData.append('productDescription', productDescription);
      formData.append('userPrompt', userPrompt);
      formData.append('aspectRatio', aspectRatio);
      formData.append('images', productImage);
      formData.append('images', modelImage);

      const { data } = await api.post('/api/project/create', formData);


      toast.success(data.message || 'UGC Image generated successfully!');
      navigate('/result/' + data.projectId);


    } catch (error: any) {
      setIsGenerating(false);
      toast.error(error?.response?.data?.message || error.message || 'Generation failed');
    }
  };

  return (
    <div className="min-h-screen text-white p-6 md:p-12 mt-28">
      <div className="max-w-4xl mx-auto mb-40">
        <Title
          heading="Create In-Context UGC Ad"
          description="Upload your product shot and model photo to synthesize hyper-realistic lifestyle imagery and short-form video commercials."
        />

        {/* Credit Check Banner / Paywall Notice */}
        {user && credits !== null && credits < 5 && !loadingCredits && (
          <div className="mb-10 p-6 rounded-3xl bg-gradient-to-r from-indigo-950/60 to-violet-950/60 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4 text-left">
              <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400">
                <LockIcon className="size-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Active UGC Plan Required</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {credits} Credits Balance
                  </span>
                </h4>
                <p className="text-xs text-neutral-300 mt-1">
                  Each UGC image requires 5 credits. Select a plan to start creating commercial-ready campaigns.
                </p>
              </div>
            </div>

            <Link to="/plans" className="shrink-0 w-full sm:w-auto">
              <PrimaryButton className="w-full sm:w-auto py-2.5 px-5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/30">
                <span>View Plans & Top Up</span> <ArrowRightIcon className="size-3.5" />
              </PrimaryButton>
            </Link>
          </div>
        )}

        <form onSubmit={handleGenerate}>
          <div className="flex gap-12 lg:gap-20 max-sm:flex-col items-start justify-between">
            {/* left col  */}
            <div className="flex flex-col w-full sm:max-w-60 gap-8 mt-8 mb-12">
              <UploadZone
                label="Product Image"
                file={productImage}
                onClear={() => setProductImage(null)}
                onChange={(e) => handleFileChange(e, 'product')}
              />
              <UploadZone
                label="Model / Creator Image"
                file={modelImage}
                onClear={() => setModelImage(null)}
                onChange={(e) => handleFileChange(e, 'model')}
              />
            </div>

            {/* right col  */}
            <div className="w-full">
              <div className="mb-4 text-gray-300">
                <label htmlFor="name" className="block text-sm mb-2 font-medium">Project Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Summer Skincare Campaign"
                  required
                  className="w-full bg-white/3 rounded-xl border border-white/10 p-3.5 text-sm focus:border-indigo-500 focus:outline-none transition"
                />
              </div>

              <div className="mb-4 text-gray-300">
                <label htmlFor="productName" className="block text-sm mb-2 font-medium">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Glow Vitamin C Serum"
                  required
                  className="w-full bg-white/3 rounded-xl border border-white/10 p-3.5 text-sm focus:border-indigo-500 focus:outline-none transition"
                />
              </div>

              <div className="mb-4 text-gray-300">
                <label htmlFor="productDescription" className="block text-sm mb-2 font-medium">
                  Product Description <span className="text-xs text-indigo-400">(optional)</span>
                </label>
                <textarea
                  id="productDescription"
                  rows={3}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Describe your product key features and look..."
                  className="w-full bg-white/3 rounded-xl border border-white/10 p-3.5 text-sm focus:border-indigo-500 focus:outline-none resize-none transition"
                />
              </div>

              <div className="mb-4 text-gray-300">
                <label className="block text-sm mb-2 font-medium">Ad Format & Aspect Ratio</label>
                <div className="flex gap-3">
                  <div
                    onClick={() => setAspectRatio('9:16')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition ${
                      aspectRatio === '9:16'
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'bg-white/3 border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <RectangleVerticalIcon className="size-4" />
                    <span className="text-xs font-semibold">9:16 (TikTok / Reels)</span>
                  </div>

                  <div
                    onClick={() => setAspectRatio('16:9')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition ${
                      aspectRatio === '16:9'
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'bg-white/3 border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <RectangleHorizontalIcon className="size-4" />
                    <span className="text-xs font-semibold">16:9 (Landscape Ad)</span>
                  </div>
                </div>
              </div>

              <div className="mb-4 text-gray-300">
                <label htmlFor="userPrompt" className="block text-sm mb-2 font-medium">
                  Scene & Narration Direction <span className="text-xs text-indigo-400">(optional)</span>
                </label>
                <textarea
                  id="userPrompt"
                  rows={3}
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="e.g. Model holding product smiling in natural daylight studio, premium lifestyle commercial"
                  className="w-full bg-white/3 rounded-xl border border-white/10 p-3.5 text-sm focus:border-indigo-500 focus:outline-none resize-none transition"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            {user && credits !== null && credits < 5 ? (
              <Link to="/plans">
                <PrimaryButton type="button" className="px-10 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-indigo-600/25">
                  <LockIcon className="size-4" /> Unlock UGC Plan (5 Credits Required)
                </PrimaryButton>
              </Link>
            ) : (
              <PrimaryButton
                disabled={isGenerating}
                className="px-10 py-3.5 rounded-xl font-bold disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 shadow-xl shadow-indigo-600/25"
              >
                {isGenerating ? (
                  <>
                    <Loader2Icon className="size-5 animate-spin" /> Synthesizing UGC Photo...
                  </>
                ) : (
                  <>
                    <Wand2Icon className="size-5" /> Generate UGC Creative (5 Credits)
                  </>
                )}
              </PrimaryButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Genetator;
