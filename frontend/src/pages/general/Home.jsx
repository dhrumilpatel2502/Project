import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/reels.css";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

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
      .get("http://localhost:3000/api/food",{withCredentials: true})
      .then((response) => {
        setVideos(response.data.foodItems);
      });
  }, []);

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
        </section>
      ))}
    </div>
  );
};

export default Home;
