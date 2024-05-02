import { TrackPreviousIcon, PlayIcon, TrackNextIcon, PauseIcon } from "@radix-ui/react-icons";
import { Button } from "../../ui/button";
import MusicPosition from "../../ui/music-position";

import Volume from "./volume";
import { useAudio } from "@/hooks/audio";
import Speed from "./speed";

export default function Player({
  files,
  playingIndex,
  setPlayingIndex,
}: {
  files: File[];
  playingIndex: number;
  setPlayingIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    progress,
    duration,
    play,
    pause,
    playing,
    seek,
    volume,
    setVolume,
    muted,
    setMuted,
    rate,
    setRate,
  } = useAudio({ files, playingIndex, setPlayingIndex });
  return (
    <div className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center gap-4">
      {/*  eslint-disable-next-line @next/next/no-img-element */}
      <img alt="now playing" width={320} height={320} className="bg-white" />
      <h2 className="text-xl">{files[playingIndex]?.name}</h2>
      <div className="w-full">
        <div className="relative flex justify-between">
          <Volume volume={volume} setVolume={setVolume} muted={muted} setMuted={setMuted} />
          <nav className="absolute left-0 right-0 mx-auto flex justify-center">
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
          <Speed rate={rate} setRate={setRate} />
        </div>
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
