import React, { useEffect, useState } from "react";
import "../../styles/create-food.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (videoURL) URL.revokeObjectURL(videoURL);
    };
  }, [videoURL]);

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (videoURL) URL.revokeObjectURL(videoURL);
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoURL(url);
    } else {
      setVideoFile(null);
      setVideoURL("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", videoFile);

    const response = await axios.post(
      "http://localhost:3000/api/food",
      formData,
      {
        withCredentials: true,
      },
    );
    console.log(response.data);
    navigate("/");
  };

  return (
    <div className="create-food-page">
      <div className="create-food-card">
        <div className="create-food-header">
          <div className="brand">
            <span className="brand-badge" aria-hidden="true"></span>
            <span className="brand-title">New Food Item</span>
          </div>
          <div className="create-food-subtitle">
            Upload a short video, name and description.
          </div>
        </div>

        <form className="create-food-body" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label htmlFor="video" className="label">
              Video
            </label>
            <div className="file-input">
              <input
                id="video"
                className="file-native"
                type="file"
                accept="video/*"
                capture="environment"
                onChange={handleVideoChange}
              />
              <label
                htmlFor="video"
                className="file-drop"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const el = document.getElementById("video");
                    if (el) el.click();
                  }
                }}
              >
                <span className="file-icon" aria-hidden="true">
                  {/* Simple video camera icon */}
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="7"
                      width="11"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path d="M19 9.5L14 12L19 14.5V9.5Z" fill="currentColor" />
                  </svg>
                </span>
                <div className="file-text">
                  <span className="file-title">Tap to upload or record</span>
                  <span className="file-help">
                    Video files only • up to 50MB
                  </span>
                </div>
              </label>
              {videoFile && (
                <div className="file-selected">Selected: {videoFile.name}</div>
              )}
            </div>

            {videoURL && (
              <div className="preview-wrap">
                <video className="video-preview" src={videoURL} controls />
                <div className="file-actions">
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => {
                      const el = document.getElementById("video");
                      if (el) el.click();
                    }}
                  >
                    Change video
                  </button>
                  <button
                    type="button"
                    className="link-btn link-btn-danger"
                    onClick={() => {
                      if (videoURL) URL.revokeObjectURL(videoURL);
                      setVideoURL("");
                      setVideoFile(null);
                      const el = document.getElementById("video");
                      if (el) el.value = "";
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            <label htmlFor="name" className="label">
              Name
            </label>
            <input
              id="name"
              className="input"
              type="text"
              placeholder="e.g., Spicy Paneer Wrap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="description" className="label">
              Description
            </label>
            <textarea
              id="description"
              className="input textarea"
              rows={4}
              placeholder="Briefly describe ingredients, taste, and size"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <div className="actions">
              <button className="button" type="submit" disabled={submitting}>
                {submitting ? "Submitting…" : "Create Food"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
