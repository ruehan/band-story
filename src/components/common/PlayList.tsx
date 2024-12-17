"use client";

import { useYouTube } from "@/contexts/YouTubeContext";
import { XMarkIcon, QueueListIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";

export default function Playlist() {
	const [isOpen, setIsOpen] = useState(true);
	const { playlist, currentSong, setCurrentSong, removeFromPlaylist, clearPlaylist } = useYouTube();

	const currentSongRef = useRef<HTMLDivElement>(null);

	const currentIndex = currentSong ? playlist.findIndex((song) => song.videoId === currentSong.videoId) : -1;

	const visibleSongs = playlist.slice(Math.max(0, currentIndex - 1), Math.min(playlist.length, currentIndex + 2));

	useEffect(() => {
		if (currentSongRef.current) {
			currentSongRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [currentSong]);

	if (!isOpen) {
		return (
			<button onClick={() => setIsOpen(true)} className="fixed bottom-52 right-4 bg-white p-2 rounded-full shadow-lg">
				<QueueListIcon className="h-6 w-6" />
			</button>
		);
	}

	return (
		<div className="fixed bottom-52 right-4 w-80 bg-white shadow-lg rounded-lg overflow-hidden">
			<div className="p-3 bg-gray-800 text-white flex justify-between items-center">
				<div>
					<h3 className="font-medium">재생목록</h3>
					<p className="text-xs text-gray-400">{playlist.length}곡</p>
				</div>
				<div className="flex gap-2">
					<button onClick={clearPlaylist} className="text-sm hover:text-gray-300">
						전체 삭제
					</button>
					<button onClick={() => setIsOpen(false)} className="hover:text-gray-300">
						<XMarkIcon className="h-5 w-5" />
					</button>
				</div>
			</div>
			<div className="max-h-[144px] overflow-y-auto">
				{playlist.map((song, index) => {
					const isCurrent = currentSong?.videoId === song.videoId;
					const isVisible = Math.abs(index - currentIndex) <= 1;

					return (
						<div
							key={song.videoId}
							ref={isCurrent ? currentSongRef : null}
							className={`p-3 flex justify-between items-center transition-all ${isCurrent ? "bg-gray-100" : "hover:bg-gray-50"} ${isVisible ? "opacity-100" : "opacity-50"}`}
						>
							<button onClick={() => setCurrentSong(song)} className="flex-1 text-left">
								<div className="font-medium truncate">{song.title}</div>
								<div className="text-sm text-gray-500 truncate">{song.artist}</div>
							</button>
							<button onClick={() => removeFromPlaylist(song.videoId)} className="text-gray-400 hover:text-gray-600">
								<XMarkIcon className="h-5 w-5" />
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
