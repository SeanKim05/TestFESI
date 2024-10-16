import type { Metadata } from "next";
import localFont from "next/font/local";
import "./global.css";
import { ReactQueryClientProvider } from "./components/ReactQueryClientProvider";
import { Toast } from "./components/Toast";

export const metadata: Metadata = {
  title: "같이달램",
  description: "바쁜 일상 속 잠깐의 휴식, 이제는 같이 달램과 함께 해보세요",
  metadataBase: new URL("https://coreal.site"),
  icons: {
    icon: "/favicon/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "같이달램",
    description: "바쁜 일상 속 잠깐의 휴식, 이제는 같이 달램과 함께 해보세요",
    // images: [
    //   {
    //     url: "/이미지태그",
    //     width: 1200,
    //     height: 630,
    //     alt: "웹사이트 OG 이미지",
    //   },
    // ],
  },
};

// pretendard 폰트 설정
const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pretendard.variable} font-pretendard`}>
      <body className="w-full bg-gray-100 pt-[54px]">
        <ReactQueryClientProvider>
          <main>
            <Toast />
            {children}
          </main>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
