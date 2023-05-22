import AudioPlayer from "react-modern-audio-player";
import React, { useState, useEffect } from 'react';


export default function ReactAudioPlayer({ tracks }) {
  const [progressType, setProgressType] = useState("waveform");
  const [playerPlacement, setPlayerPlacement] = useState("static");

  return (
    <div
    /*className="App"
    style={{
      width: "100%",
      height: "calc(100vh - 16px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "40px",
      flexDirection: "column"
    }}*/
    >
      <div>
        <button
          onClick={() =>
            setProgressType((prev) => (prev === "bar" ? "waveform" : "bar"))
          }
        >
          change progress type
        </button>
        <button
          onClick={() => {
            switch (playerPlacement) {
              case "static":
                setPlayerPlacement("top-left");
                break;
              case "top-left":
                setPlayerPlacement("bottom-left");
                break;
              case "bottom-left":
                setPlayerPlacement("static");
                break;
              default:
                break;
            }
          }}
        >
          change player placement
        </button>
      </div>
      <AudioPlayer
        playList={tracks}
        activeUI={{
          all: true,
          progress: progressType
        }}
        placement={{
          player: playerPlacement
        }}
      />
    </div>
  );
}
