import { useState, useEffect, useRef } from "react";

const useAudio = () => {
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [source, setSource] = useState<AudioBufferSourceNode | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const audioRef = useRef(null);

  // Initialize Audio Context
  useEffect(() => {
    setAudioCtx(new AudioContext());
  }, []);

  // Load and decode audio file
  const loadAudioFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      if (!e.target?.result || typeof e.target?.result !== "object") return;
      audioCtx?.decodeAudioData(e.target?.result, buffer => {
        setAudioBuffer(buffer);
      });
    };
    reader.readAsArrayBuffer(file);
    setCurrentFile(file);
  };

  // Play audio
  const playAudio = () => {
    if (!audioBuffer || !audioCtx) return;
    if (source) {
      source.stop();
    }
    const newSource = audioCtx.createBufferSource();
    newSource.buffer = audioBuffer;
    newSource.connect(audioCtx.destination);
    newSource.start();
    setSource(newSource);
    setPlaying(true);
  };

  // Stop audio
  const stopAudio = () => {
    if (source) {
      source.stop();
      setPlaying(false);
    }
  };

  // Switch audio file
  const switchAudioFile = (file: File) => {
    stopAudio();
    loadAudioFile(file);
  };

  return {
    audioRef,
    loadAudioFile,
    playAudio,
    stopAudio,
    switchAudioFile,
    currentFile,
    playing,
  };
};

export default useAudio;
