import { Toaster } from "react-hot-toast";
import LeftAndRightLayout from "../app/_components/LeftAndRightLayout";
import "./globals.css";
// import { Geist } from "next/font/google";
import { AuthProviedr } from "./_context/AuthContext";
// const geist = Geist({
//   subsets: ["latin"],
// });

export const metadata = {
  title: "media",
  description: "شبکه اجتماعی کوچک شبیه توییتر",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body className="bg-black text-white">
        <AuthProviedr>
          <LeftAndRightLayout>{children}</LeftAndRightLayout>
          <Toaster position="top-center" reverseOrder={false} />
        </AuthProviedr>
      </body>
    </html>
  );
}
