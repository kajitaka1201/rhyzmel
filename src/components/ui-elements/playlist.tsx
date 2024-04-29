import { PlayIcon } from "@radix-ui/react-icons";

export default function PlayList({ files }: { files: File[] }) {
  return (
    <div className="w-96 flex-none space-y-2 border-r p-4">
      <h2 className="text-lg">Now Playing</h2>
      {files.map((file, i) => (
        <div
          key={i}
          className="group flex w-full items-center gap-2 rounded-full p-4 hover:bg-primary">
          <div className="aspect-square w-8">
            <p className="flex h-full w-full items-center justify-center text-center group-hover:hidden">
              {i + 1}
            </p>
            <button className="hidden h-full w-full items-center justify-center rounded-full group-hover:grid ">
              <PlayIcon />
            </button>
          </div>
          <p className="flex-1 truncate">{file.name}</p>
        </div>
      ))}
    </div>
  );
}
