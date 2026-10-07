import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/User/main/common/Navbar";
import Footer from "@/components/User/common/Footer";
import ContactFooter from "@/components/User/Landing/ContactPage";
import { ArrowLeft, Clock, User, Heart, Share2, ThumbsUp, ThumbsDown, MessageSquare, BookOpen, Compass, ChevronRight, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const ARTICLES_DATA = {
  "paris-cafes": {
    title: "10 Beautiful Historic Cafes in Paris",
    subtitle: "Step back in time to neighborhoods where Hemingway, Picasso, and Sartre discussed art and philosophy over espresso and fresh croissants.",
    readTime: "6 min read",
    author: "Chloé Dubois",
    role: "Travel Historian & Journalist",
    date: "June 24, 2026",
    heroImg: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop&q=80",
    category: "Guides & Inspiration",
    tags: ["Paris", "Historic Cafes", "France", "Travel Tips", "Culture"],
    content: [
      {
        type: "paragraph",
        text: "Parisian cafes are more than just places to grab a quick caffeine fix; they are living museums and cultural landmarks. For centuries, the corner bistro has served as a second living room for French writers, international artists, and political thinkers alike. To sit at one of their small round tables on the terrace is to participate in a centuries-old tradition of watching the world go by."
      },
      {
        type: "heading",
        text: "1. Café de Flore (Saint-Germain-des-Prés)"
      },
      {
        type: "paragraph",
        text: "Located on the corner of Boulevard Saint-Germain and Rue Saint-Benoît, Café de Flore is one of the oldest and most prestigious coffeehouses in Paris. Famously the 'office' of Jean-Paul Sartre and Simone de Beauvoir during World War II, it retains its classic Art Deco interior with red seating, mahogany wood, and mirrors. Order their famous 'chocolat chaud spécial' (thick hot chocolate) served in a porcelain pitcher."
      },
      {
        type: "heading",
        text: "2. Les Deux Magots"
      },
      {
        type: "paragraph",
        text: "Right across the street from Café de Flore lies its eternal rival: Les Deux Magots. Named after the two Chinese wooden statues (magots) inside, this cafe welcomed literary giants such as Ernest Hemingway, Albert Camus, James Joyce, and F. Scott Fitzgerald. Sitting on its broad terrace provides a front-row view of the Saint-Germain-des-Prés church, the oldest in Paris."
      },
      {
        type: "heading",
        text: "3. Le Procope (Latin Quarter)"
      },
      {
        type: "paragraph",
        text: "Founded in 1686 by Francesco Procopio dei Coltelli, Le Procope is recognized as the oldest continuously operating cafe and restaurant in Paris. Step inside and you are stepping into history: Benjamin Franklin drafted elements of the American Constitution here, and Napoleon Bonaparte once left his hat behind as collateral for an unpaid bill (which is still displayed in a glass case at the entrance)."
      },
      {
        type: "quote",
        text: " Napoleon's original bicorn hat remains on display in the lobby—a relic from a night he couldn't pay his tab."
      },
      {
        type: "heading",
        text: "4. Café de la Rotonde (Montparnasse)"
      },
      {
        type: "paragraph",
        text: "In the early 20th century, the artistic center of Paris shifted from Montmartre to Montparnasse. La Rotonde became the melting pot for the avant-garde. The owner allowed impoverished painters like Modigliani and Picasso to sit for hours over a ten-centime cup of coffee, often accepting drawings as payment when their pockets were empty."
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80"
    ]
  },
  "shibuya-crossing": {
    title: "A First-Timer's Guide to Shibuya Crossing",
    subtitle: "Experience the electric atmosphere, high-tech neon billboards, traditional alleys, and find the absolute best viewing spots in Tokyo's beating heart.",
    readTime: "8 min read",
    author: "Kenji Sato",
    role: "Tokyo Urban Explorer & Guide",
    date: "June 29, 2026",
    heroImg: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80",
    category: "City Guides",
    tags: ["Tokyo", "Japan", "Shibuya Crossing", "Urban Travel", "Asia"],
    content: [
      {
        type: "paragraph",
        text: "Shibuya Crossing is widely considered the busiest pedestrian intersection in the world. When the lights turn red, all vehicles stop in all directions, and a tidal wave of up to 3,000 pedestrians floods the intersection at once. Known as a 'scramble crossing,' it represents the organized chaos, cutting-edge technology, and sheer human energy of Tokyo."
      },
      {
        type: "heading",
        text: "How to Cross Like a Tokyoite"
      },
      {
        type: "paragraph",
        text: "Navigating the crossing for the first time can be overwhelming. The secret is to keep a steady forward momentum and avoid sudden stops. Japanese pedestrians are exceptionally skilled at side-stepping, meaning you will rarely bump into anyone if you maintain your course. Keep your phone secure, look slightly ahead, and absorb the colossal neon screens blasting advertisements overhead."
      },
      {
        type: "heading",
        text: "Best Spots for the Ultimate Shibuya Crossing View"
      },
      {
        type: "paragraph",
        text: "To truly appreciate the scale of the scramble, you need to head to higher ground. Here are the top three public spots for photography and viewing:"
      },
      {
        type: "paragraph",
        text: "• Shibuya Sky: This breathtaking open-air observation deck on the roof of Shibuya Scramble Square is 229 meters high and offers a stunning, unobstructed bird's-eye view of the entire crossing and Tokyo skyline."
      },
      {
        type: "paragraph",
        text: "• L'Occitane Café (2nd Floor): Grab a window table, order a premium fruit tea, and watch the waves of people surge across the street below in comfort."
      },
      {
        type: "paragraph",
        text: "• Shibuya Station Crossing View (Mark City Walkway): A free glass corridor linking the station and Shibuya Mark City that offers a perfect head-on level view of the crowds."
      },
      {
        type: "quote",
        text: "At peak hours, over 45,000 people cross this single intersection every 30 minutes, representing the heartbeat of modern Tokyo."
      },
      {
        type: "heading",
        text: "Visiting the Legendary Hachiko Statue"
      },
      {
        type: "paragraph",
        text: "Just outside the Shibuya Station Hachiko Exit stands a humble bronze statue of a dog. Hachiko was an Akita who waited at the station every single day for his owner to return from work. Even after his owner passed away in 1925, Hachiko continued to wait there daily for nearly ten years. Today, this statue is Japan's most famous meeting point and a symbol of loyalty."
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop&q=80"
    ]
  }
};

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(148);
  const [liked, setLiked] = useState(false);
  const [helpful, setHelpful] = useState(null); // 'yes' or 'no'
  const [comments, setComments] = useState([
    { author: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", text: "This guide was exactly what I needed! Heading to Paris next month and Café de Flore is definitely on my list now.", date: "2 days ago" },
    { author: "Markus Vance", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", text: "Shibuya Sky is absolutely worth the ticket price. The sunset view is unforgettable.", date: "5 days ago" }
  ]);
  const [newComment, setNewComment] = useState("");

  const article = ARTICLES_DATA[id] || ARTICLES_DATA["paris-cafes"]; // fallback

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
      toast.success("Thank you for liking this article!");
    }
  };

  const handleHelpful = (val) => {
    setHelpful(val);
    toast.success("Thank you for your feedback!");
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments([
      ...comments,
      {
        author: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        text: newComment,
        date: "Just now"
      }
    ]);
    setNewComment("");
    toast.success("Comment posted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 mt-14">
        {/* Navigation Breadcrumb & Back */}
        <button
          onClick={() => navigate("/booking")}
          className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#003580] hover:text-blue-800 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Booking Center
        </button>

        {/* Article Container */}
        <article className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden">

          {/* Article Header Card */}
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <span className="inline-block bg-[#003580]/15 text-[#003580] font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {article.title}
            </h1>
            <p className="text-gray-500 font-medium mt-3 text-sm sm:text-base leading-relaxed">
              {article.subtitle}
            </p>

            {/* Author Profile */}
            <div className="flex items-center justify-between flex-wrap gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-[#003580]/10 p-2.5 rounded-full text-[#003580]">
                  <User size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900">{article.author}</h4>
                  <p className="text-gray-400 text-[10px] sm:text-[11px] font-semibold">{article.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-400 text-xs font-semibold">
                <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime}</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>
            </div>
          </div>

          {/* Hero Banner */}
          <div className="relative h-64 sm:h-96 w-full">
            <img src={article.heroImg} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Article Content */}
          <div className="p-6 sm:p-8 prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-6">
            {article.content.map((sec, idx) => {
              if (sec.type === "heading") {
                return (
                  <h2 key={idx} className="text-lg sm:text-xl font-extrabold text-gray-900 pt-4 flex items-center gap-2">
                    <span className="h-1.5 w-4 rounded-full bg-[#003580] block" />
                    {sec.text}
                  </h2>
                );
              }
              if (sec.type === "quote") {
                return (
                  <div key={idx} className="bg-blue-50 border-l-4 border-[#003580] p-4 rounded-r-xl my-6 flex gap-3 items-start">
                    <AlertCircle className="text-[#003580] shrink-0 mt-0.5" size={20} />
                    <p className="italic font-bold text-[#003580] text-xs sm:text-sm leading-relaxed">{sec.text}</p>
                  </div>
                );
              }
              return (
                <p key={idx} className="font-medium text-gray-600">
                  {sec.text}
                </p>
              );
            })}

            {/* Gallery Grid */}
            <div className="grid grid-cols-3 gap-3 pt-6">
              {article.gallery.map((imgUrl, i) => (
                <div key={i} className="h-20 sm:h-32 rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:scale-102 transition-transform duration-300">
                  <img src={imgUrl} className="w-full h-full object-cover" alt="Gallery detail" />
                </div>
              ))}
            </div>

            {/* Social Share & Likes */}
            <div className="border-t border-b border-gray-150 py-4 mt-8 flex justify-between items-center flex-wrap gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 text-xs sm:text-sm font-black px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer ${liked ? "bg-red-50 text-red-600 scale-105" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                <Heart size={16} fill={liked ? "currentColor" : "none"} />
                Like Article ({likes})
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Article link copied to clipboard!");
                }}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <Share2 size={16} />
                Share
              </button>
            </div>

            {/* Feedback / Helpful Box */}
            <div className="bg-gray-50 border border-gray-150 rounded-xl p-5 text-center mt-6">
              <h4 className="font-extrabold text-sm text-gray-800">Was this travel article helpful to you?</h4>
              <div className="flex justify-center gap-4 mt-3">
                <button
                  onClick={() => handleHelpful("yes")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${helpful === "yes" ? "bg-green-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <ThumbsUp size={13} /> Yes, thanks!
                </button>
                <button
                  onClick={() => handleHelpful("no")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${helpful === "no" ? "bg-red-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <ThumbsDown size={13} /> Not really
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="pt-6">
              <h3 className="text-base sm:text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-[#003580]" />
                Comments ({comments.length})
              </h3>

              <form onSubmit={handleCommentSubmit} className="flex gap-3 mb-6 items-start">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-300 overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col gap-2">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add your thoughts or ask a question about this article..."
                    className="w-full text-xs sm:text-sm bg-white border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#003580] min-h-16 font-medium text-gray-700"
                  />
                  <button
                    type="submit"
                    className="self-end bg-[#003580] text-white text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
                  >
                    Post Comment
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="flex gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
                      <img src={comment.avatar} alt={comment.author} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs sm:text-sm text-gray-900">{comment.author}</span>
                        <span className="text-[10px] text-gray-400 font-semibold">{comment.date}</span>
                      </div>
                      <p className="text-gray-600 font-medium text-xs sm:text-sm mt-1 leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
