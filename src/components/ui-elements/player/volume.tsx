import { Button } from "@/components/ui/button";
import Slider from "@/components/ui/slider";
import { SpeakerOffIcon, SpeakerLoudIcon } from "@radix-ui/react-icons";

export default function Volume({
  volume,
  setVolume,
  muted,
  setMuted,
}: {
  volume: number;
  setVolume: (volume: number) => void;
  muted: boolean;
  setMuted: (muted: boolean) => void;
}) {
  return (
    <nav className="flex items-center gap-2">
      <Button onClick={() => setMuted(!muted)} variant="ghost" className="">
        {muted ? <SpeakerOffIcon /> : <SpeakerLoudIcon />}
      </Button>
      <Slider
        disabled={muted}
        type="range"
        value={volume * 100}
        max={100}
        className=""
        onChange={(e: any) => {
          setVolume(Number(e.target.value) / 100);
        }}
      />
    </nav>
  );
}
