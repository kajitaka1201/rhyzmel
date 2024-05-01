import { TrackPreviousIcon, PlayIcon, TrackNextIcon, PauseIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import MusicPosition from "../ui/music-position";

export default function Player({
  files,
  playingIndex,
  setPlayingIndex,
  play,
  stop,
  playing,
}: {
  files: File[];
  playingIndex: number;
  setPlayingIndex: React.Dispatch<React.SetStateAction<number>>;
  play: () => void;
  stop: () => void;
  playing: boolean;
}) {
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    setProgress(0);
  }, [playingIndex]);
  return (
    <div className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center gap-4">
      {/*  eslint-disable-next-line @next/next/no-img-element */}
      <img alt="now playing" width={320} height={320} className="bg-white" />
      <h2 className="text-xl">{files[playingIndex]?.name}</h2>
      <div className="w-full">
        <nav className="flex justify-center">
          <Button variant="ghost" onClick={() => setPlayingIndex(i => Math.max(i - 1, 0))}>
            <TrackPreviousIcon />
          </Button>
          <Button variant="ghost" onClick={() => (playing ? stop() : play())}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setPlayingIndex(i => Math.min(i + 1, files.length - 1))}>
            <TrackNextIcon />
          </Button>
        </nav>
        <MusicPosition
          duration={100}
          currentTime={progress}
          onChange={newTime => {
            // 再生位置を変更する処理
            console.log(newTime);
            setProgress(newTime);
          }}
        />
      </div>
    </div>
  );
}
