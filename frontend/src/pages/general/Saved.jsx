import React, { useEffect, useRef, useState } from "react";
import BottomNav from "../../components/BottomNav";
import "../../styles/reels.css";
import { useSaved } from "../../context/SavedContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Saved = () => {
  const { saved, isSaved, toggleSave } = useSaved();
  const [liked, setLiked] = useState(() => new Set());
  const [likeCounts, setLikeCounts] = useState({});
  const [saveCounts, setSaveCounts] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  const hasItems = videos.length > 0;

  useEffect(() => {
    if (!videos.length) return;

    const elements = videoRefs.current.filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.5, 0.8, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [videos]);

   useEffect(() => {
     axios
       .get("http://localhost:3000/api/food/save", {
         withCredentials: true,
       })
       .then((response) => {
         const savedFoods = response.data.savedFoods.map((item) => ({
           _id: item.food._id,
           video: item.food.video,
           description: item.food.description,
           likeCount: item.food.likeCount,
           saveCount: item.food.saveCount,
           commentsCount: item.food.commentsCount,
           foodPartner: item.food.foodPartner,
         }));
         setVideos(savedFoods);
       });
   }, []);

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      const willAdd = !next.has(id);
      if (willAdd) next.add(id);
      else next.delete(id);
      setLikeCounts((c) => ({
        ...c,
        [id]: Math.max(0, (c[id] ?? 0) + (willAdd ? 1 : -1)),
      }));
      return next;
    });
  };

  async function bookmarkVideo(item) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true },
      );
      return response.data.save === true;
    } catch {
      return null;
    }
  }

  const handleToggleSave = async (item) => {
    await bookmarkVideo(item);

    // Always unsave in Saved page
    toggleSave(item);

    // Decrement save count
    setSaveCounts((c) => ({
      ...c,
      [item._id]: Math.max(0, (c[item._id] ?? 1) - 1),
    }));

    // Remove from UI immediately
    setVideos((prev) => prev.filter((v) => v._id !== item._id));
  };

  // Initialize counts when videos list changes
  useEffect(() => {
    if (!Array.isArray(videos)) return;
    const initLikes = {};
    const initSaves = {};
    const initComments = {};
    videos.forEach((item) => {
      if (!item || !item._id) return;
      initLikes[item._id] = item.likeCount ?? 0;
      initSaves[item._id] = item.saveCount ?? 0;
      initComments[item._id] = item.commentsCount ?? 0;
    });
    setLikeCounts(initLikes);
    setSaveCounts(initSaves);
    setCommentCounts(initComments);
  }, [videos]);

  return (
    <div className="savedPage" aria-label="Saved items">
      {hasItems ? (
        <div className="reels" role="feed" aria-label="Saved reels">
          {videos.map((item, idx) => (
            <section
              key={item._id}
              className="reel"
              role="article"
              aria-label={`Saved reel ${idx + 1}`}
            >
              <video
                ref={(el) => (videoRefs.current[idx] = el)}
                src={item.video}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Promotional video"
              />

              <div className="overlay">
                <p
                  className="description"
                  title={item.description}
                  aria-label="Description"
                >
                  {item.description}
                </p>
                {item.foodPartner && (
                  <Link
                    className="storeLink visitBtn"
                    to={`/food-partner/${item.foodPartner}`}
                    aria-label="Visit store"
                  >
                    Visit Store
                  </Link>
                )}
              </div>

              <aside className="actionRail" aria-label="Actions">
                <div className="actionGroup">
                  <button
                    className={`actionBtn ${liked.has(item._id) ? "active" : ""}`}
                    aria-label={liked.has(item._id) ? "Unlike" : "Like"}
                    onClick={() => toggleLike(item._id)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 21s-6.716-4.247-9.066-7.212C1.1 12.76 1 10.4 2.64 8.76 4.28 7.12 6.64 7.02 8.28 8.66L12 12.38l3.72-3.72c1.64-1.64 4-1.54 5.64.1 1.64 1.64 1.54 4-.1 5.64C18.716 16.753 12 21 12 21z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                  <span className="actionCount" aria-label="Likes count">
                    {likeCounts[item._id] ?? 0}
                  </span>
                </div>

                <div className="actionGroup">
                  <button
                    className="actionBtn"
                    aria-label={
                      isSaved(item._id) ? "Remove bookmark" : "Bookmark"
                    }
                    onClick={() => handleToggleSave(item)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 3h12a1 1 0 0 1 1 1v17l-7-3-7 3V4a1 1 0 0 1 1-1z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                  <span className="actionCount" aria-label="Saves count">
                    {saveCounts[item._id] ?? 0}
                  </span>
                </div>

                <div className="actionGroup">
                  <Link
                    to={`/#comments-${item._id}`}
                    className="actionBtn"
                    aria-label="Comments"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </Link>
                  <span className="actionCount" aria-label="Comments count">
                    {commentCounts[item._id] ?? 0}
                  </span>
                </div>
              </aside>
            </section>
          ))}
        </div>
      ) : (
        <div className="savedEmpty">
          <svg viewBox="0 0 24 24" width="64" height="64" aria-hidden="true">
            <path
              d="M6 3h12a1 1 0 0 1 1 1v17l-7-3-7 3V4a1 1 0 0 1 1-1z"
              fill="currentColor"
            ></path>
          </svg>
          <span>No saved items yet</span>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Saved;
