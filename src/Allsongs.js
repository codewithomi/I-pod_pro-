import React, { useState, useEffect } from "react";

const Allsongs = (props) => {
  // Destructure the props
  const { songsList, updateProgress, progressRef } = props;
  const { songs, thumbnails, songIndex, name } = songsList;
  const audio = songs[songIndex];
 
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // Add event listener for time update
    audio.addEventListener("timeupdate", updateProgress);
    
    // Clean up the event listener on component unmount
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [audio, updateProgress]);

  useEffect(() => {
    // Update current time at a regular interval
    const interval = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 1000);
    
    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [audio]);

  const formatTime = (time) => {
    // Format time in minutes and seconds
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const artist = "Sonu P";
  const album = "Greatest Hits";
  const genre = "Pop";

  return (
    <div className="music-player" style={styles.player}>
      <div className="song-info" style={styles.songInfo}>
        <div className="image" style={styles.img}>
          <img
            src={thumbnails[songIndex]}
            alt="song-thumbnail"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <p style={styles.title}>
          {name[songIndex]}
          <br />
          <span style={styles.musicDetails}>
            {artist},{album}  {genre}
          </span>
        </p>
      </div>

      <div className="progress-container" style={styles.progressContainer}>
        <div className="progress" ref={progressRef} style={styles.progressBar}></div>
      </div>
      <div className="timer" style={styles.timer}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(audio.duration)}</span>
      </div>
    </div>
  );
};

const styles = {
  player: {
    height: "100%",
    width: "100%",
    textTransform: "capitalize",
    borderTopLeftRadius: "10%",
    borderTopRightRadius: "10%",
    zIndex: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Secular One",
    textAlign: "center",
    marginTop: "10px",
    width: "90%",
    color: "black",
    fontWeight: "bold",
    letterSpacing: "0.15rem",
  },
  img: {
    borderRadius: "20px",
    marginLeft: "20px",
    height: "80%",
    width: "100%",
  },
  progressContainer: {
    height: "7px",
    backgroundColor: "lightgray",
    width: "90%",
    borderRadius: "50px",
    marginTop: "20px",
    position: "relative",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#1877f2",
    borderRadius: "50px",
    position: "absolute",
    top: 0,
    left: 0,
  },
  songInfo: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: "10px",
  },
  musicDetails: {
    fontSize: "0.8rem",
    marginTop: "5px",
    fontWeight: "300"
  },
};

export default Allsongs;
