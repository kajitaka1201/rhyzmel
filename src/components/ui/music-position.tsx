import React from "react";
import Slider from "./slider";

interface MusicPositionProps {
  duration: number;
  currentTime: number;
  onChange: (newTime: number) => void;
}

function MusicPosition({ duration, currentTime, onChange }: MusicPositionProps) {
  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = event.target.valueAsNumber;
    onChange(newProgress);
  };

  return (
    <div className="flex w-full items-center gap-2">
      <span className="flex-none">{formatTime(currentTime)} </span>
      <Slider
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleProgressChange}
        className="flex-1"
      />
      <span className="flex-none">{formatTime(duration)}</span>
    </div>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default MusicPosition;
