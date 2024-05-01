import { TrackPreviousIcon, PlayIcon, TrackNextIcon, PauseIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import MusicPosition from "../ui/music-position";
import { useGlobalAudioPlayer } from "react-use-audio-player";

export default function Player({
  files,
  playingIndex,
  setPlayingIndex,
}: {
  files: File[];
  playingIndex: number;
  setPlayingIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<any>(null);
  useEffect(() => {
    setProgress(0);
  }, [playingIndex]);
  const { load, play, pause, playing, seek, getPosition } = useGlobalAudioPlayer();
  useEffect(() => {
    (async () => {
      const duration = await new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => {
          const audio = new Audio(reader.result as string);
          audio.onloadedmetadata = () => {
            resolve(audio.duration);
          };
        };
        reader.readAsDataURL(files[playingIndex]);
      });
      setDuration(duration);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, playingIndex]);
  useEffect(() => {
    (async () => {
      const reader = new FileReader();
      const dataURL: string = await new Promise(resolve => {
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(files[playingIndex]);
      });
      load(dataURL, {
        html5: true,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, playingIndex]);
  useEffect(() => {
    function updateProgress() {
      setProgress(getPosition());
    }
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);
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
          <Button variant="ghost" onClick={playing ? pause : play}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setPlayingIndex(i => Math.min(i + 1, files.length - 1))}>
            <TrackNextIcon />
          </Button>
        </nav>
        <MusicPosition
          duration={Math.round(duration)}
          currentTime={Math.round(progress)}
          onChange={newTime => {
            // 再生位置を変更する処理
            console.log(newTime);
            seek(newTime);
          }}
        />
      </div>
    </div>
  );
}
