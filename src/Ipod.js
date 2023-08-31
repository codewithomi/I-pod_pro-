import React from "react";
import Display from "./Display";
import Controller from "./Controller";

const Ipod = (props) => {
  const {
    menu,
    screen,
    rotate,
    tap,
    isMenuVisible,
    addClass,
    removeClass,
    mouse,
    controllerRef,
    songsList,
    play,
    nextSong,
    prevSong,
    updateProgress,
    progressRef,
    theme,
  } = props;

  const themeBottomContainer = () => {
    return theme.themeIndex === 0
      ? {
          background: "linear-gradient(90deg, #e3e4e5,#cacaca)",
          transition: "all 2s linear",
        }
      : { backgroundColor: "black", transition: "all 2s linear" };
  };

  const themeTopContainer = () => {
    return theme.themeIndex === 0
      ? { background: "linear-gradient(90deg, #e3e4e5,#cacaca)" }
      : { backgroundColor: "black" };
  };

  const themeDisplayContainer = () => {
    return theme.themeIndex === 0
      ? { background: "linear-gradient(90deg, #e3e4e5,#cacaca)" }
      : { backgroundColor: "black" };
  };

  const themeIpod = () => {
    return theme.themeIndex === 0
      ? {
          boxShadow: "1px 4px 15px 10px rgba(151, 151, 151, 0.72)",
          background: "linear-gradient(90deg, #e3e4e5,#cacaca)",
        }
      : {
          boxShadow: "0px 1px 15px 13px rgba(151, 151, 151, 0.72)",
          backgroundColor: "black",
        };
  };

  const handleMouseUp = (e) => {
    e.stopPropagation();
    removeClass("inner-circle", "down");
  };

  return (
    <div className="ipod" style={themeIpod()}>
      <div className="top-container" style={themeTopContainer()} onMouseUp={handleMouseUp}>
        <div className="display-container" style={themeDisplayContainer()}>
          <Display
            menu={menu}
            screen={screen}
            songsList={songsList}
            theme={theme}
            updateProgress={updateProgress}
            progressRef={progressRef}
          />
        </div>
      </div>
      <div className="bottom-container" style={themeBottomContainer()}>
        <Controller
          menu={menu}
          rotate={rotate}
          tap={tap}
          isMenuVisible={isMenuVisible}
          addClass={addClass}
          removeClass={removeClass}
          mouse={mouse}
          screen={screen}
          controllerRef={controllerRef}
          songsList={songsList}
          theme={theme}
          play={play}
          nextSong={nextSong}
          prevSong={prevSong}
        />
      </div>
    </div>
  );
};

export default Ipod;
