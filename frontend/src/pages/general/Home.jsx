import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/reels.css";
import BottomNav from "../../components/BottomNav";
import { useSaved } from "../../context/SavedContext";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [liked, setLiked] = useState(() => new Set());
  const [likeCounts, setLikeCounts] = useState({});
  const [saveCounts, setSaveCounts] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const videoRefs = useRef([]);
  const { toggleSave, isSaved } = useSaved();

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
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setVideos(response.data.foodItems);
      });
  }, []);

  async function likeVideo(item) {
    const response = await axios.post(
      "http://localhost:3000/api/food/like",
      { foodId: item._id },
      { withCredentials: true },
    );

    if (response.data.like) {
      // console.log("Liked video:", item._id);
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: (v.likeCount ?? 0) + 1 } : v,
        ),
      );
    } else {
      // console.log("Unliked video:", item._id);
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, likeCount: Math.max(0, (v.likeCount ?? 0) - 1) }
            : v,
        ),
      );
    }
  }

  async function bookmarkVideo(item) {
    const response = await axios.post(
      "http://localhost:3000/api/food/save",
      { foodId: item._id },
      { withCredentials: true },
    );

    if (response.data.save) {
      // console.log("Bookmarked video:", item._id);
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, saveCount: (v.saveCount ?? 0) + 1 } : v,
        ),
      );
    } else {
      // console.log("Unbookmarked video:", item._id);
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, saveCount: Math.max(0, (v.saveCount ?? 0) - 1) }
            : v,
        ),
      );
    }
  }

  // Initialize counts when videos change
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
    <div className="reels" role="feed" aria-label="Food partner reels">
      {videos.map((item, idx) => (
        <section
          key={item._id}
          className="reel"
          role="article"
          aria-label={`Reel ${idx + 1}`}
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
            <Link
              className="storeLink visitBtn"
              to={"/food-partner/" + item.foodPartner}
              aria-label="Visit store"
            >
              Visit Store
            </Link>
          </div>

          {/* Action rail on the right */}
          <aside className="actionRail" aria-label="Actions">
            <div className="actionGroup">
              <button
                className={`actionBtn ${liked.has(item._id) ? "active" : ""}`}
                aria-label={liked.has(item._id) ? "Unlike" : "Like"}
                onClick={() => likeVideo(item)}
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
                className={`actionBtn ${isSaved(item._id) ? "saved" : ""}`}
                aria-label={isSaved(item._id) ? "Remove bookmark" : "Bookmark"}
                onClick={() => {
                  bookmarkVideo(item);
                  toggleSave(item);
                }}
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
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

export default Home;
