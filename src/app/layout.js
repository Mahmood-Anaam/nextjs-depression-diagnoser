// \src\app\layout.js

import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { ToastContainer } from "react-toastify";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Providers } from "./providers";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);

  return (
    <html suppressHydrationWarning lang="en">
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header payload={payload} />
          <ToastContainer
            position='top-center' 
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
          />

          {children}

          <Footer/>
          <ScrollToTop/>
        </Providers>
      </body>
    </html>
  );
}
