"use client";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/lib/upload";

export default function App() {
  function upload() {
    uploadFile().then(res => {
      console.log(res);
    });
  }
  return (
    <main className="flex-1">
      <Button onClick={upload}>ファイル読み込み</Button>
    </main>
  );
}
