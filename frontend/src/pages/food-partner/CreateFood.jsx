import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./create-food.css";

const CreateFood = () => {
  const [foodData, setFoodData] = useState({
    name: "",
    videoFile: null,
    description: "",
  });
  const navigate = useNavigate();

  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prev) => ({ ...prev, [name]: value }));
  };

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video")) {
      setFoodData((prev) => ({ ...prev, videoFile: file }));
    } else {
      alert("Please drop a valid video file");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video")) {
      setFoodData((prev) => ({ ...prev, videoFile: file }));
    } else {
      alert("Please select a valid video file");
    }
  };

  // Remove current video
  const handleRemoveVideo = () => {
    setFoodData((prev) => ({ ...prev, videoFile: null }));
  };

  // Change video (trigger file input)
  const handleChangeVideo = () => {
    fileInputRef.current.click();
  };

  const onSubmit =  async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", foodData.name);
    formData.append("description", foodData.description);
    formData.append("video", foodData.videoFile);
      const response=await axios.post("http://localhost:3000/api/food", formData, {
      withCredentials: true,
    });
      console.log(response.data);
      navigate('/Home1');
  };
      
  return (
    <div className="create-food-page">
      <div className="form-card">
        <h1>Create Food Item</h1>
        <form onSubmit={onSubmit} className="food-form">
          {/* Food Name */}
          <div className="form-group">
            <label htmlFor="name">Food Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ex: Spaghetti Bolognese"
              value={foodData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Food Video Heading */}
          <div className="form-group">
            <label>Food Video</label>
          </div>

          {/* Drag & Drop / File Upload */}
          <div
            className="form-group"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            style={{
              border: dragOver ? "2px dashed #ff5c8a" : "2px dashed #ffb6c9",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            {foodData.videoFile ? (
              <p>Selected Video: {foodData.videoFile.name}</p>
            ) : (
              <p>Drag & Drop Video Here or Click to Upload</p>
            )}
            <input
              type="file"
              accept="video/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Video Section: Preview + Link + Buttons */}
          {foodData.videoFile && (
            <div className="form-group" style={{ marginTop: "10px" }}>
              {/* Video Preview */}
              <video
                width="100%"
                controls
                src={URL.createObjectURL(foodData.videoFile)}
                style={{ borderRadius: "12px", maxHeight: "200px" }}
              />

              {/* Video File Link */}
              <p style={{ marginTop: "8px", wordBreak: "break-all", fontSize: "14px", color: "#ffb6c9" }}>
                Link: {URL.createObjectURL(foodData.videoFile)}
              </p>

              {/* Buttons */}
              <div style={{ marginTop: "8px", display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  className="submit-btn"
                  style={{ background: "#ffb6c9" }}
                  onClick={handleChangeVideo}
                >
                  Change
                </button>
                <button
                  type="button"
                  className="submit-btn"
                  style={{ background: "#ff5c8a" }}
                  onClick={handleRemoveVideo}
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Write a short description of the food"
              value={foodData.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;



