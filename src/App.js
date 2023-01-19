import React, { useState, useEffect, useCallback } from "react";
import { images, lastImgIndex } from "./images";
import "./App.css";

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const handlePrevClick = useCallback(
    () => setCurrentIndex(currentIndex === 0 ? lastImgIndex : currentIndex - 1),
    [currentIndex]
  );
  const handleNextClick = useCallback(
    () => setCurrentIndex(currentIndex === lastImgIndex ? 0 : currentIndex + 1),
    [currentIndex]
  );

  useEffect(() => {
    if (paused) return;
    const intervalId = setInterval(() => handleNextClick(), 1750);
    return () => clearInterval(intervalId);
  }, [handleNextClick, paused]);

  return (
    <div className="carousel">
      <div className="image-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${index + 1}`}
            style={{
              transform: `translateX(${-currentIndex * 500}px)`,
              transition: "transform 0.5s ease-out",
            }}
          />
        ))}
      </div>
      <div className="buttons-container">
        <button className="btn" onClick={handlePrevClick}>
          Prev
        </button>
        <button
          className={`btn ${paused && "blink_me"}`}
          onClick={() => setPaused(!paused)}
        >
          {paused ? "Resume" : "Pause"}
        </button>
        <button className="btn" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
