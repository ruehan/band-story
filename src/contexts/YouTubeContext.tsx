"use client";

import { createContext, useContext, useState } from "react";
import YouTubePlayer from "@/components/common/YouTubePlayer";

interface CurrentSong {
	videoId: string;
	title: string;
	artist: string;
}

interface YouTubeContextType {
	currentSong: CurrentSong | null;
	setCurrentSong: (song: CurrentSong | null) => void;
}

const YouTubeContext = createContext<YouTubeContextType | undefined>(undefined);

export function YouTubeProvider({ children }: { children: React.ReactNode }) {
	const [currentSong, setCurrentSong] = useState<CurrentSong | null>(null);

	return (
		<YouTubeContext.Provider value={{ currentSong, setCurrentSong }}>
			{children}
			{currentSong && <YouTubePlayer videoId={currentSong.videoId} title={currentSong.title} artist={currentSong.artist} onClose={() => setCurrentSong(null)} />}
		</YouTubeContext.Provider>
	);
}

export function useYouTube() {
	const context = useContext(YouTubeContext);
	if (context === undefined) {
		throw new Error("useYouTube must be used within a YouTubeProvider");
	}
	return context;
}
