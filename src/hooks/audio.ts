import { useState, useEffect } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";

export function useAudio({
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
  const {
    load,
    play,
    pause,
    playing,
    seek,
    getPosition,
    volume,
    setVolume,
    muted,
    mute: setMuted,
    rate,
    setRate,
  } = useGlobalAudioPlayer();
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
        autoplay: true,
        onend: () => {
          setPlayingIndex(i => Math.min(i + 1, files.length - 1));
        },
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, playingIndex]);
  useEffect(() => {
    function updateProgress() {
      setProgress(getPosition());
    }
    const interval = setInterval(updateProgress, 100);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);
  return {
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
  };
}
