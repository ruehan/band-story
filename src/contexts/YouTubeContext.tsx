"use client";

import { createContext, useContext, useState, useEffect } from "react";
import YouTubePlayer from "@/components/common/YouTubePlayer";
import Playlist from "@/components/common/PlayList";

interface Song {
	videoId: string;
	title: string;
	artist: string;
}

interface YouTubeContextType {
	currentSong: Song | null;
	playlist: Song[];
	setCurrentSong: (song: Song | null) => void;
	addToPlaylist: (song: Song) => void;
	removeFromPlaylist: (videoId: string) => void;
	clearPlaylist: () => void;
	playNext: () => void;
	playPrevious: () => void;
	savePlaylist: (name: string) => void;
	loadPlaylist: (name: string) => void;
}

const PLAYLIST_STORAGE_KEY = "bandstory-playlist";
const CURRENT_SONG_STORAGE_KEY = "bandstory-current-song";

const YouTubeContext = createContext<YouTubeContextType | undefined>(undefined);

export function YouTubeProvider({ children }: { children: React.ReactNode }) {
	const [currentSong, setCurrentSong] = useState<Song | null>(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem(CURRENT_SONG_STORAGE_KEY);
			return saved ? JSON.parse(saved) : null;
		}
		return null;
	});

	const [playlist, setPlaylist] = useState<Song[]>(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem(PLAYLIST_STORAGE_KEY);
			return saved ? JSON.parse(saved) : [];
		}
		return [];
	});

	// 상태가 변경될 때마다 localStorage에 저장
	useEffect(() => {
		if (currentSong) {
			localStorage.setItem(CURRENT_SONG_STORAGE_KEY, JSON.stringify(currentSong));
		} else {
			localStorage.removeItem(CURRENT_SONG_STORAGE_KEY);
		}
	}, [currentSong]);

	useEffect(() => {
		localStorage.setItem(PLAYLIST_STORAGE_KEY, JSON.stringify(playlist));
	}, [playlist]);

	const addToPlaylist = (song: Song) => {
		if (!playlist.some((item) => item.videoId === song.videoId)) {
			setPlaylist((prev) => [...prev, song]);
		}
	};

	const removeFromPlaylist = (videoId: string) => {
		setPlaylist((prev) => prev.filter((song) => song.videoId !== videoId));
	};

	const clearPlaylist = () => {
		setPlaylist([]);
		localStorage.removeItem(PLAYLIST_STORAGE_KEY);
	};

	const playNext = () => {
		if (!currentSong || playlist.length === 0) return;
		const currentIndex = playlist.findIndex((song) => song.videoId === currentSong.videoId);
		const nextSong = playlist[currentIndex + 1] || playlist[0];
		setCurrentSong(nextSong);
	};

	const playPrevious = () => {
		if (!currentSong || playlist.length === 0) return;
		const currentIndex = playlist.findIndex((song) => song.videoId === currentSong.videoId);
		const prevSong = playlist[currentIndex - 1] || playlist[playlist.length - 1];
		setCurrentSong(prevSong);
	};

	// 재생 목록 관리를 위한 유틸리티 함수 추가
	const savePlaylist = (name: string) => {
		const savedPlaylists = JSON.parse(localStorage.getItem("bandstory-saved-playlists") || "{}");
		savedPlaylists[name] = playlist;
		localStorage.setItem("bandstory-saved-playlists", JSON.stringify(savedPlaylists));
	};

	const loadPlaylist = (name: string) => {
		const savedPlaylists = JSON.parse(localStorage.getItem("bandstory-saved-playlists") || "{}");
		if (savedPlaylists[name]) {
			setPlaylist(savedPlaylists[name]);
		}
	};

	return (
		<YouTubeContext.Provider
			value={{
				currentSong,
				playlist,
				setCurrentSong,
				addToPlaylist,
				removeFromPlaylist,
				clearPlaylist,
				playNext,
				playPrevious,
				savePlaylist,
				loadPlaylist,
			}}
		>
			{children}
			{currentSong && (
				<>
					<YouTubePlayer videoId={currentSong.videoId} title={currentSong.title} artist={currentSong.artist} onClose={() => setCurrentSong(null)} onEnded={playNext} />
					<Playlist />
				</>
			)}
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
