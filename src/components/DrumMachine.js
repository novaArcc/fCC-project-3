import React, { useState, useRef } from "react";
import Heater_1 from "./audios/Heater-1.mp3";
import Heater_2 from "./audios/Heater-2.mp3";
import Heater_3 from "./audios/Heater-3.mp3";
import Heater_4 from "./audios/Heater-4_1.mp3";
import Clap from "./audios/Cev_H2.mp3";
import Open_HH from "./audios/Dsc_Oh.mp3";
import Kick_n_Hat from "./audios/Kick_n_Hat.mp3";
import Kick from "./audios/RP4_KICK_1.mp3";
import Closed_HH from "./audios/Heater-6.mp3";
import "./DrumMachine.css";

const DrumMachine = () => {
  // Map audio file imports to display names for convenience
  const audioNameMap = {
    "Q": "Heater 1",
    "W": "Heater 2",
    "E": "Heater 3",
    "A": "Heater 4",
    "S": "Clap",
    "D": "Open HH",
    "Z": "Kick n' Hat",
    "X": "Kick",
    "C": "Closed HH",
  };

  // Store state for display text, power, and volume
  const [displayText, setDisplayText] = useState("");
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [volume, setVolume] = useState(0.5);

  // Store reference to the currently playing audio
  const currentAudio = useRef(null);

  // Toggle power on/off
  const togglePower = () => {
    setIsPowerOn(!isPowerOn);
    setDisplayText("");
  };

  // Handle play audio from button click
  const playAudio = (e) => {
    if (!isPowerOn) return;

    const button = e.target;
    const audioId = button.id; // Get the button's id (Q, W, E, etc.)

    // Find the <audio> element based on its id
    const audioElement = button.querySelector(`#${audioId} .clip`);

    if (audioElement) {
      // Pause current audio if it's playing
      if (currentAudio.current && !currentAudio.current.paused) {
        currentAudio.current.pause();
        currentAudio.current.currentTime = 0;
      }

      // Set new audio to play
      currentAudio.current = audioElement;
      currentAudio.current.currentTime = 0; // Reset to start
      currentAudio.current.volume = volume; // Set volume
      currentAudio.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });

      setDisplayText(audioNameMap[audioId]); // Display corresponding audio name
    }
  };

  // Handle volume change using slider
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);

    if (isPowerOn) {
      setDisplayText(`Volume: ${Math.round(newVolume * 100)}%`);
    }
  };

  // Handle key press event for triggering drum pads
  const handleKeyPress = (e) => {
    if (!isPowerOn) return;

    const key = e.key.toUpperCase();
    if (audioNameMap[key]) {
      const button = document.getElementById(key);
      playAudio({ target: button });
    }
  };

  // Add event listener for keydown events
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPowerOn]);

  return (
    <div className="drum-wrapper" id="drum-machine">
      <div id="drum-machine2" className="drum-container container d-flex flex-column flex-md-row justify-content-center align-items-center">
        {/* Buttons container */}
        <div className="col-12 col-md-6 buttons-col order-1 order-md-1 d-flex flex-column justify-content-center align-items-center">
          <div className="buttons-container container d-flex flex-column justify-content-center align-items-center">
            <div className="row mb-2">
              <div className="col">
                <button onClick={playAudio} className="drum-pad" id="Q">
                  Q
                  <audio className="clip" id="Q" src={Heater_1}></audio>
                </button>
              </div>
              <div className="col">
                <button onClick={playAudio} className="drum-pad" id="W">
                  W
                  <audio className="clip" id="W" src={Heater_2}></audio>
                </button>
              </div>
              <div className="col">
                <button onClick={playAudio} className="drum-pad" id="E">
                  E
                  <audio className="clip" id="E" src={Heater_3}></audio>
                </button>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col">
                <button onClick={playAudio} className="drum-pad" id="A">
                  A
                  <audio className="clip" id="A" src={Heater_4}></audio>
                </button>
              </div>
              <div className="col">
                <button onClick={playAudio} className="drum-pad" id="S">
                  S
                  <audio className="clip" id="S" src={Clap}></audio>
                </button>
              </div>
              <div className="col">
                <button onClick={playAudio} className="drum-pad" id="D">
                  D
                  <audio className="clip" id="D" src={Open_HH}></audio>
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <button onClick={playAudio} className="drum-pad" id="Z">
                  Z
                  <audio className="clip" id="Z" src={Kick_n_Hat}></audio>
                </button>
              </div>
              <div className="col">
                <button onClick={playAudio} className="drum-pad" id="X">
                  X
                  <audio className="clip" id="X" src={Kick}></audio>
                </button>
              </div>
              <div className="col">
                <button onClick={playAudio} className="drum-pad" id="C">
                  C
                  <audio className="clip" id="C" src={Closed_HH}></audio>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right container */}
        <div className="col-12 mt-md-0 mt-4 col-md-6 right-col order-2 order-md-2 d-flex flex-column justify-content-center align-items-center">
          <div className="right-container container d-flex flex-column justify-content-center align-items-center">
            <div className="power-text">Power</div>
            <input type="checkbox" name="checkbox" className="power-switch" id="checkbox" checked={isPowerOn} onChange={togglePower} />
            <label htmlFor="checkbox" className="label mb-3 mt-2"> </label>
            <div id="display">{displayText}</div>
            <label className="slider mb-2 mt-2">
              <input type="range" className="level" min="0" max="100" value={volume * 100} onChange={handleVolumeChange} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;





