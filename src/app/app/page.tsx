"use client";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/lib/upload";
import { useState } from "react";
import PlayList from "@/components/ui-elements/playlist";

export default function App() {
  const [files, setFiles] = useState<File[]>([]);
  function upload() {
    uploadFile().then(res => {
      console.log(res);
      setFiles(f => [...f, ...res.files]);
    });
  }
  return (
    <main className="flex flex-1">
      {files.length ? (
        <PlayList files={files} />
      ) : (
        <Button onClick={upload}>ファイル読み込み</Button>
      )}
    </main>
  );
}
