interface TitleProps {
    title?: string;
    heading?: string;
    description?: string;
}

export default function Title({ title, heading, description }: TitleProps) {
    return (
        <div 
            className="text-center mb-16"
        >
            {title && (
                <p className="text-xs md:text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-3">
                    {title}
                </p>
            )}
            {heading && (
                <h2 className="text-2xl md:text-4xl text-white font-bold tracking-tight">
                    {heading}
                </h2>
            )}
            {description && (
                <p className="max-w-md mx-auto text-sm text-neutral-400 my-3 leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
}