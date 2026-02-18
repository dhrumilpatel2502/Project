import React, { useEffect, useRef, useState } from "react";
import BottomNav from "../../components/BottomNav";
import "../../styles/reels.css";
import { useSaved } from "../../context/SavedContext";
import { Link } from "react-router-dom";

const Saved = () => {
  const { saved, isSaved, toggleSave } = useSaved();
  const [liked, setLiked] = useState(() => new Set());
  const videoRefs = useRef([]);

  const hasItems = saved.length > 0;

  useEffect(() => {
    if (!saved.length) return;

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
  }, [saved]);

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="savedPage" aria-label="Saved items">
      {hasItems ? (
        <div className="reels" role="feed" aria-label="Saved reels">
          {saved.map((item, idx) => (
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

                <button
                  className={`actionBtn ${isSaved(item._id) ? "active" : ""}`}
                  aria-label={
                    isSaved(item._id) ? "Remove bookmark" : "Bookmark"
                  }
                  onClick={() => toggleSave(item)}
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
