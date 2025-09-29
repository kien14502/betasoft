import React from "react";
import styles from "./video-background.module.css";

const VideoBackground = () => {
  return (
    <div className={styles.videoContainer}>
      <video autoPlay loop muted className={styles.videoBackground}>
        <source src="/universal.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.overlay}></div> {/* Optional overlay */}
    </div>
  );
};

export default VideoBackground;
