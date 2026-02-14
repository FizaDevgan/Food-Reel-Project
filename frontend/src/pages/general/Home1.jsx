import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegCommentDots, FaHome } from "react-icons/fa";
import "./home1.css";

const Home1 = () => {
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [likes, setLikes] = useState({});

  /* 🎥 Auto play / pause on scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));
    return () => observer.disconnect();
  }, [videos]);

  /* 📡 Fetch reels */
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((res) => {
        const items = res.data.foodItems || [];
        setVideos(items);

        const likeMap = {};
        items.forEach((v) => (likeMap[v._id] = false));
        setLikes(likeMap);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  /* ❤️ LIKE FUNCTION */
  const likeVideo = async (item) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      );

      const isLiked = res.data.like;

      setLikes((prev) => ({
        ...prev,
        [item._id]: isLiked,
      }));

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                likes: isLiked ? (v.likes || 0) + 1 : (v.likes || 1) - 1, // ← NaN fix
              }
            : v
        )
      );
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  /* 💬 COMMENT */
  const handleComment = (id) => {
    console.log("Open comments for:", id);
  };

  return (
    <div className="home-wrapper">
      <div className="reels-container">
        {videos.map((item, idx) => (
          <div className="reel" key={item._id}>
            <video
              ref={(el) => (videoRefs.current[idx] = el)}
              src={item.video}
              className="reel-video"
              muted
              loop
              playsInline
            />

            {/* ❤️ ACTIONS */}
            <div className="reel-actions">
              <button
                className={`action ${likes[item._id] ? "liked" : ""}`}
                onClick={() => likeVideo(item)}
              >
                <FaHeart />
                <span>{item.likes || 0}</span> {/* ← NaN fix */}
              </button>

              <button
                className="action"
                onClick={() => handleComment(item._id)}
              >
                <FaRegCommentDots />
                <span>{item.comments || 0}</span>
              </button>
            </div>

            {/* 🔻 BOTTOM INFO */}
            <div className="reel-bottom">
              <p className="reel-desc">{item.description}</p>

              <button
                className="visit-store"
                onClick={() =>
                  navigate(`/food-partner/${item.foodPartner}`)
                }
              >
                Visit Store
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔽 OPAQUE BLUR NAVBAR */}
      <div className="bottom-navbar">
        <div className="nav-item active">
          <FaHome />
          <span>Home</span>
        </div>
      </div>
    </div>
  );
};

export default Home1;




