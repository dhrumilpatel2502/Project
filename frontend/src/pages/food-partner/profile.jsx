import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  // Example placeholder data – replace with real data later
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      });
  }, [id]);

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src="https://images.unsplash.com/photo-1769114474398-a7aef0625ef0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5OXx8fGVufDB8fHx8fA%3D%3D"
            className="profile-avatar"
          />
          <div className="profile-info">
            <div className="chip">{profile?.name}</div>
            <div className="chip-muted">{profile?.address}</div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat">
            <div className="stat-label">total meals</div>
            <span className="stat-value">{profile?.totalMeals}</span>
          </div>
          <div className="stat">
            <div className="stat-label">customer serve</div>
            <span className="stat-value">{profile?.customersServed}</span>
          </div>
        </div>

        <hr className="profile-divider" />

        <div className="videos-grid">
          {videos.map((v) => (
            // <div key={v.id} className="video-item">
            <video
              className="video-item"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              src={v.video}
              muted
            ></video>
            // {/* </div> */}
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
