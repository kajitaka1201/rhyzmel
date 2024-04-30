"use client";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/lib/upload";
import React, { useState } from "react";
import PlayList from "@/components/ui-elements/playlist";
import Player from "@/components/ui-elements/player";

export default function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number>(0);
  function upload() {
    uploadFile().then(res => {
      console.log(res);
      setFiles(f => [...f, ...res.files]);
    });
  }
  return (
    <main className="flex flex-1">
      {files.length ? (
        <>
          <PlayList files={files} playingIndex={playingIndex} setPlayingIndex={setPlayingIndex} />
          <Player files={files} playingIndex={playingIndex} setPlayingIndex={setPlayingIndex} />
        </>
      ) : (
        <Button onClick={upload}>ファイル読み込み</Button>
      )}
    </main>
  );
}
