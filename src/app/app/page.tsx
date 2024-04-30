"use client";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/lib/upload";
import React, { useEffect, useState } from "react";
import PlayList from "@/components/ui-elements/playlist";
import Player from "@/components/ui-elements/player";

export default function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number>(0);
  useEffect(() => {
    const windowWithLaunchQueue = window as WindowWithLaunchQueue;
    windowWithLaunchQueue?.launchQueue?.setConsumer(
      async ({ files }: { files: FileSystemFileHandle[] }) => {
        console.log(files);
        setFiles(await Promise.all(files.map(f => f.getFile())));
      }
    );
  }, []);
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
