import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon, SearchIcon, HeartIcon, Share2Icon, SparklesIcon, VideoIcon, CameraIcon } from "lucide-react";
import { useUser, useClerk } from "../context/AuthContext";

import api from "../configs/axios";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import { AnimatePresence } from "framer-motion";




interface CommunityItem {
  id: string;
  creatorName: string;
  creatorHandle: string;
  productName: string;
  productDescription: string;
  userPrompt: string;
  aspectRatio: string;
  category: string;
  generatedImage: string;
  generatedVideo?: string;
  uploadedImages: string[];
  likesCount: number;
  createdAt: string;
}

// 11 Completely Unique Items — Each with a 100% distinct media file (ZERO duplicates)
const defaultCommunityProjects: CommunityItem[] = [
  {
    id: "comm_1",
    creatorName: "Sarah Jenkins",
    creatorHandle: "@sarah_ugc",
    productName: "Smartphone Unboxing & Creator Reel",
    productDescription: "Vertical short-form product unboxing commercial optimized for TikTok & Reels.",
    userPrompt: "Model holding smartphone in golden-hour studio lighting with clean packaging.",
    aspectRatio: "9:16",
    category: "Tech & Creator Gear",
    generatedImage: assets.generated1,
    generatedVideo: assets.generatedVideo1,
    uploadedImages: [assets.product2, assets.model1],
    likesCount: 14,
    createdAt: "2 hours ago"
  },
  {
    id: "comm_2",
    creatorName: "David Sterling",
    creatorHandle: "@david_audio",
    productName: "AeroMax Studio Wireless Headphones",
    productDescription: "Active noise-canceling over-ear headphones with 40-hour battery life commercial.",
    userPrompt: "Creative influencer demonstrating spatial audio headphones in aesthetic lighting.",
    aspectRatio: "16:9",
    category: "Tech & Audio",
    generatedImage: assets.generated4,
    generatedVideo: assets.generatedVideo2,
    uploadedImages: [assets.product4, assets.model2],
    likesCount: 19,
    createdAt: "5 hours ago"
  },
  {
    id: "comm_3",
    creatorName: "Marcus Vance",
    creatorHandle: "@marcus_kicks",
    productName: "Velocity Runner Urban Sneakers",
    productDescription: "Ultralight breathable knit running shoes engineered for performance and streetwear.",
    userPrompt: "Runner holding sneakers in open sunlit field, crisp textures and natural sunlight.",
    aspectRatio: "9:16",
    category: "Fashion & Footwear",
    generatedImage: assets.generated3,
    uploadedImages: [assets.product6, assets.model1],
    likesCount: 11,
    createdAt: "1 day ago"
  },
  {
    id: "comm_4",
    creatorName: "Elena Rostova",
    creatorHandle: "@elena_travels",
    productName: "Voyager Pro Carry-On Suitcase",
    productDescription: "Aerospace-grade polycarbonate hard-shell spinner luggage with TSA locks.",
    userPrompt: "Business traveler model in stylish jumpsuit posing gracefully with sky-blue suitcase.",
    aspectRatio: "9:16",
    category: "Travel & Luggage",
    generatedImage: assets.generated2,
    uploadedImages: [assets.product7, assets.model2],
    likesCount: 8,
    createdAt: "1 day ago"
  },
  {
    id: "comm_5",
    creatorName: "Liam O'Connor",
    creatorHandle: "@liam_creates",
    productName: "Vintage 35mm Instant Film Camera",
    productDescription: "Classic analog instant camera with automatic exposure and retro aesthetic.",
    userPrompt: "Photographer showcasing retro camera in cozy sunlit apartment setup.",
    aspectRatio: "1:1",
    category: "Photography & Gear",
    generatedImage: assets.product2,
    uploadedImages: [assets.product2, assets.model1],
    likesCount: 6,
    createdAt: "2 days ago"
  },
  {
    id: "comm_6",
    creatorName: "Chloe Martin",
    creatorHandle: "@chloe_visuals",
    productName: "AeroFlex UV Polarized Sunglasses",
    productDescription: "Featherweight titanium frames with anti-reflective polarized UV400 lenses.",
    userPrompt: "Model wearing designer sunglasses during golden hour city stroll.",
    aspectRatio: "9:16",
    category: "Fashion & Footwear",
    generatedImage: assets.product3,
    uploadedImages: [assets.product3, assets.model2],
    likesCount: 12,
    createdAt: "3 days ago"
  },
  {
    id: "comm_7",
    creatorName: "Alex Rivera",
    creatorHandle: "@alex_growth",
    productName: "BassBoom 360 Waterproof Speaker",
    productDescription: "Rugged portable Bluetooth speaker with punchy 360-degree deep bass.",
    userPrompt: "Outdoor poolside commercial showing rugged portable speaker with clean lighting.",
    aspectRatio: "16:9",
    category: "Tech & Audio",
    generatedImage: assets.product5,
    uploadedImages: [assets.product5, assets.model1],
    likesCount: 7,
    createdAt: "3 days ago"
  },
  {
    id: "comm_8",
    creatorName: "Emma Watson-Lee",
    creatorHandle: "@emma_creative",
    productName: "Titanium Precision Chronograph Watch",
    productDescription: "Minimalist sapphire crystal watch with brushed stainless steel link strap.",
    userPrompt: "Close-up macro shot of luxury watch on executive model's wrist, editorial studio lighting.",
    aspectRatio: "9:16",
    category: "Luxury Accessories",
    generatedImage: assets.product1,
    uploadedImages: [assets.product1, assets.model2],
    likesCount: 15,
    createdAt: "4 days ago"
  },
  {
    id: "comm_9",
    creatorName: "Jordan Brooks",
    creatorHandle: "@jordan_apparel",
    productName: "Streetwear Canvas High-Top Sneakers",
    productDescription: "Classic vulcanized high-top sneakers styled for streetwear and lifestyle campaigns.",
    userPrompt: "Streetwear model showing off canvas sneakers against industrial concrete background.",
    aspectRatio: "1:1",
    category: "Fashion & Footwear",
    generatedImage: assets.product6,
    uploadedImages: [assets.product6, assets.model1],
    likesCount: 9,
    createdAt: "5 days ago"
  },
  {
    id: "comm_10",
    creatorName: "Maya Patel",
    creatorHandle: "@maya_lifestyle",
    productName: "SkyBlue Hard-Shell Spinner Bag",
    productDescription: "Durable spinner travel luggage with smooth glide wheels for modern jetsetters.",
    userPrompt: "Lifestyle influencer walking in sunlit airport terminal with sleek luggage.",
    aspectRatio: "9:16",
    category: "Travel & Luggage",
    generatedImage: assets.product7,
    uploadedImages: [assets.product7, assets.model2],
    likesCount: 5,
    createdAt: "6 days ago"
  },
  {
    id: "comm_11",
    creatorName: "Lucas Thorne",
    creatorHandle: "@lucas_audio",
    productName: "Studio Pro Reference Headphones",
    productDescription: "Engineered for music producers and creators with neutral acoustic curve.",
    userPrompt: "Sound engineer testing headphones in sleek home music studio.",
    aspectRatio: "1:1",
    category: "Tech & Audio",
    generatedImage: assets.product4,
    uploadedImages: [assets.product4, assets.model2],
    likesCount: 13,
    createdAt: "1 week ago"
  }
];

const Community = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [items, setItems] = useState<CommunityItem[]>(defaultCommunityProjects);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // LocalStorage-backed state for likes
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  const categories = [
    "All",
    "Tech & Audio",
    "Fashion & Footwear",
    "Travel & Luggage",
    "Tech & Creator Gear",
    "Photography & Gear",
    "Luxury Accessories"
  ];

  // Initialize likes and counts from localStorage
  useEffect(() => {
    // 1. Load persisted like counts
    try {
      const savedCounts = localStorage.getItem("ugc_community_counts_v2");
      if (savedCounts) {
        setLikeCounts(JSON.parse(savedCounts));
      }
    } catch (e) {
      console.error(e);
    }

    // 2. Load user's liked items if logged in
    if (user?.id) {
      try {
        const userSavedLikes = localStorage.getItem(`ugc_user_likes_${user.id}`);
        if (userSavedLikes) {
          setLikedIds(JSON.parse(userSavedLikes));
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      setLikedIds({});
    }
  }, [user]);

  // Fetch any published projects from DB
  useEffect(() => {
    const fetchPublished = async () => {
      try {
        const { data } = await api.get("/api/project/published");
        if (data.projects && data.projects.length > 0) {
          const mappedDbProjects: CommunityItem[] = data.projects.map((p: Project, i: number) => ({
            id: p.id,
            creatorName: p.name || `Creator #${i + 1}`,
            creatorHandle: `@creator_${p.id.slice(0, 5)}`,
            productName: p.productName,
            productDescription: p.productDescription || "Commercial UGC Video & Lifestyle Campaign",
            userPrompt: p.userPrompt || "High quality in-context ad showcase",
            aspectRatio: p.aspectRatio || "9:16",
            category: "Tech & Audio",
            generatedImage: p.generatedImage,
            generatedVideo: p.generatedVideo,
            uploadedImages: p.uploadedImages || [],
            likesCount: 7 + (i % 8),
            createdAt: "Just now"
          }));

          setItems([...mappedDbProjects, ...defaultCommunityProjects]);
        }
      } catch (error) {
        // Fallback to default items
      } finally {
        setLoading(false);
      }
    };

    fetchPublished();
  }, []);

  const toggleLike = (id: string) => {
    if (!user) {
      toast.error("Please sign in to like creations");
      openSignIn();
      return;
    }

    const isCurrentlyLiked = !!likedIds[id];
    const newLikedState = !isCurrentlyLiked;

    // Update & persist user's liked set
    const updatedLikedIds = { ...likedIds, [id]: newLikedState };
    setLikedIds(updatedLikedIds);
    try {
      localStorage.setItem(`ugc_user_likes_${user.id}`, JSON.stringify(updatedLikedIds));
    } catch (e) {}

    // Update & persist like count
    const item = items.find((it) => it.id === id);
    const baseCount = item ? item.likesCount : 10;
    const currentStoredCount = likeCounts[id] ?? baseCount;
    const newCount = newLikedState ? currentStoredCount + 1 : Math.max(0, currentStoredCount - 1);

    const updatedCounts = { ...likeCounts, [id]: newCount };
    setLikeCounts(updatedCounts);
    try {
      localStorage.setItem("ugc_community_counts_v2", JSON.stringify(updatedCounts));
    } catch (e) {}

    if (newLikedState) {
      toast.success("Added to your liked creations!");
    }
  };

  const handleShare = (item: CommunityItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.productName,
        text: `Check out this UGC ad for ${item.productName} on UGC.AI!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.creatorHandle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2Icon className="size-7 animate-spin text-indigo-400" />
    </div>
  ) : (
    <div className="min-h-screen text-white p-6 md:p-12 my-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-4">
            <SparklesIcon className="size-3.5" /> Community Gallery
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Creator Community
          </h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            Explore viral short-form video ads and 4K lifestyle creatives generated by brands and creators worldwide.
          </p>
        </header>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search products or creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredItems.map((item) => {
              const isLiked = !!likedIds[item.id];
              const displayLikes = likeCounts[item.id] ?? item.likesCount;

              return (
                <div
                  key={item.id}
                  className="break-inside-avoid rounded-3xl overflow-hidden bg-neutral-900/80 border border-neutral-800 hover:border-indigo-500/40 transition-all duration-300 shadow-xl group flex flex-col"
                >
                  {/* Clean Creator Bar without Picture Avatar */}
                  <div className="p-4 flex items-center justify-between border-b border-neutral-800/80">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-indigo-500" />
                      <span className="text-xs font-bold text-white font-mono">
                        {item.creatorHandle}
                      </span>
                    </div>

                    <span className="text-[11px] text-neutral-500">
                      {item.createdAt}
                    </span>
                  </div>

                  {/* Media Preview (Video or Image) */}
                  <div className="relative overflow-hidden bg-neutral-950">
                    {item.generatedVideo ? (
                      <div className="relative aspect-[9/14]">
                        <video
                          src={item.generatedVideo}
                          poster={item.generatedImage}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-indigo-950/80 backdrop-blur-md text-[10px] font-bold text-indigo-300 flex items-center gap-1 border border-indigo-500/30">
                          <VideoIcon className="size-3" />
                          <span>AI VIDEO</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-[9/13]">
                        <img
                          src={item.generatedImage}
                          alt={item.productName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md text-[10px] font-bold text-neutral-300 flex items-center gap-1 border border-neutral-700">
                          <CameraIcon className="size-3" />
                          <span>4K PHOTO</span>
                        </div>
                      </div>
                    )}

                    {/* Source Upload Images Badges */}
                    {item.uploadedImages && item.uploadedImages.length >= 2 && (
                      <div className="absolute left-3 bottom-3 flex items-center">
                        <img
                          src={item.uploadedImages[0]}
                          alt="product"
                          className="size-9 rounded-full object-cover border-2 border-neutral-900 shadow-md"
                        />
                        <img
                          src={item.uploadedImages[1]}
                          alt="model"
                          className="size-9 rounded-full object-cover border-2 border-neutral-900 shadow-md -ml-3"
                        />
                      </div>
                    )}
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400 bg-neutral-800/60 px-2 py-0.5 rounded">
                          {item.aspectRatio}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2 leading-snug">
                        {item.productName}
                      </h3>

                      <p className="text-neutral-400 text-xs leading-relaxed mb-4 line-clamp-2">
                        {item.productDescription}
                      </p>
                    </div>

                    {/* Engagement Actions (Realistic Likes & Share) */}
                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                      <button
                        onClick={() => toggleLike(item.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                          isLiked
                            ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                            : "bg-neutral-800/40 border-neutral-700/50 text-neutral-300 hover:text-rose-400 hover:border-rose-500/20"
                        }`}
                      >
                        <HeartIcon className={`size-4 ${isLiked ? "fill-rose-400 text-rose-400" : ""}`} />
                        <span className="font-semibold">{displayLikes}</span>
                      </button>

                      <button
                        onClick={() => handleShare(item)}
                        className="hover:text-white transition p-2 rounded-xl hover:bg-neutral-800 border border-transparent hover:border-neutral-700 cursor-pointer"
                        title="Share Creative"
                      >
                        <Share2Icon className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Community;
