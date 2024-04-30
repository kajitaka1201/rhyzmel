import withPWA from "next-pwa";
/** @type {import('next').NextConfig} */
export default withPWA({
  dest: "public",
})({
  output:"export"
});
