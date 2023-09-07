import "./globals.scss";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"] });

export const metadata = {
  title: "NFT 2.0",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lora.className}>{children}</body>
    </html>
  );
}
