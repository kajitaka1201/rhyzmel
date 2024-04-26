import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: "#fff9e6",
    background_color: "#fff9e6",
    display: "standalone",
    scope: "/rhyzmel/",
    start_url: "/app",
    name: "RhyzMel",
    short_name: "RhyzMel",
    description: "PC\u5411\u3051\u97f3\u58f0\u518d\u751f\u30b5\u30a4\u30c8\u3067\u3059",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    file_handlers: [
      {
        action: "/app",
        accept: {
          // @ts-ignore typeがおかしかったので握りつぶす
          "audio/*": [".wav", ".mp3", ".ogg"],
        },
      },
    ],
  };
}
