import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/common/Navigation";
import { YouTubeProvider } from "@/contexts/YouTubeContext";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		template: "%s | Band Story",
		default: "Band Story",
	},
	description: "다양한 밴드들의 음악과 정보를 한눈에 모아보세요",
	keywords: ["밴드", "록", "인디", "메탈", "음악"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<YouTubeProvider>
					<Navigation />
					{children}
				</YouTubeProvider>
			</body>
		</html>
	);
}
