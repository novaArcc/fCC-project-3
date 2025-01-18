import React, { useState } from "react";
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
  const audioNameMap = {
    [new Audio(Heater_1).src]: "Heater 1",
    [new Audio(Heater_2).src]: "Heater 2",
    [new Audio(Heater_3).src]: "Heater 3",
    [new Audio(Heater_4).src]: "Heater 4",
    [new Audio(Clap).src]: "Clap",
    [new Audio(Open_HH).src]: "Open HH",
    [new Audio(Kick_n_Hat).src]: "Kick n' Hat",
    [new Audio(Kick).src]: "Kick",
    [new Audio(Closed_HH).src]: "Closed HH",
  };

  const [displayText, setDisplayText] = useState("");
  const[isPowerOn, setIsPowerOn] =useState(true);
  const [volume, setVolume] =useState(0.5)

const togglePower= () => {
  setIsPowerOn(!isPowerOn);
  setDisplayText("")
}

const playAudio = (e) => {
  if(!isPowerOn) return;

   const button = e.target;

   const audio = button.querySelector("audio");
   if(audio) {
    audio.currentTime=0;
    audio.volume = volume;
    audio.play();
    
    const audioName = audioNameMap[audio.src];
    if(audioName) {
      setDisplayText(audioName)
    }
   }
}

const handleVolumeChange = (e) => {
  const newVolume = e.target.value / 100;
  setVolume(newVolume)

  if (isPowerOn) {
    setDisplayText(`Volume: ${Math.round(newVolume * 100)}%`); 
  }
}


  return (
<div className="drum-wrapper">
  <div
    id="drum-machine"
    className="drum-container container d-flex flex-column flex-md-row justify-content-center align-items-centre"
  >
    {/* Buttons container */}
    <div className="col-12 col-md-6 buttons-col order-1 order-md-1 d-flex flex-column justify-content-center align-items-center">
      <div className="buttons-container container d-flex flex-column justify-content-center align-items-center">
        <div className="row mb-2">
          <div className="col">
            <button onClick={playAudio} className="drum-pad">Q
              <audio src={Heater_1} className="clip" id="Q"></audio>
            </button>
          </div>
          <div className="col">
            <button onClick={playAudio} className="drum-pad">W
              <audio src={Heater_2} className="clip" id="W"></audio>
            </button>
          </div>
          <div className="col">
            <button onClick={playAudio} className="drum-pad">E
              <audio src={Heater_3} className="clip" id="E"></audio>
            </button>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col">
            <button onClick={playAudio} className="drum-pad">A
              <audio src={Heater_4} className="clip" id="A"></audio>
            </button>
          </div>
          <div className="col">
            <button onClick={playAudio} className="drum-pad">S
              <audio src={Clap} className="clip" id="S"></audio>
            </button>
          </div>
          <div className="col">
            <button onClick={playAudio} className="drum-pad">D
              <audio src={Open_HH} className="clip" id="D"></audio>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button onClick={playAudio} className="drum-pad">Z
              <audio src={Kick_n_Hat} className="clip" id="Z"></audio>
            </button>
          </div>
          <div className="col">
            <button onClick={playAudio} className="drum-pad">X
              <audio src={Kick} className="clip" id="X"></audio>
            </button>
          </div>
          <div className="col">
            <button onClick={playAudio} className="drum-pad">C
              <audio src={Closed_HH} className="clip" id="C"></audio>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Right container */}
    <div className="col-12 mt-md-0 mt-4 col-md-6 right-col order-2 order-md-2 d-flex flex-column justify-content-center align-items-center">
      <div className="right-container container d-flex flex-column justify-content-center align-items-center">
        <div className="power-text">Power</div>

    {/* Power toggle switch from uiverse.io*/}
        <input type="checkbox" name="checkbox" className="power-switch" id="checkbox" checked={isPowerOn} onChange={togglePower} />
        <label for="checkbox" className="label mb-3 mt-2"> </label>

        {/* Display - Name of sound */}
        <div id="display">{displayText}</div>

        {/*Volume slider from uiverse.io*/}
<label className="slider mb-2 mt-2">
      <input type="range" className="level" min="0" max="100" value={volume*100} onChange={handleVolumeChange} />
      <svg class="volume" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style={{ enableBackground: "new 0 0 512 512" }} xmlSpace="preserve">
          <g>
              <path d="M18.36 19.36a1 1 0 0 1-.705-1.71C19.167 16.148 20 14.142 20 12s-.833-4.148-2.345-5.65a1 1 0 1 1 1.41-1.419C20.958 6.812 22 9.322 22 12s-1.042 5.188-2.935 7.069a.997.997 0 0 1-.705.291z" fill="currentColor" data-original="#000000"></path>
              <path d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z" fill="currentColor" data-original="#000000"></path>
          </g>      
      </svg>
  </label>

      </div>
    </div>
  </div>
</div>


  )
}

export default DrumMachine
