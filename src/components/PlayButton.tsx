"use client";

import { PlayCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useYouTube } from "@/contexts/YouTubeContext";

interface PlayButtonProps {
	videoId: string | null;
	title: string;
	artist: string;
}

export default function PlayButton({ videoId, title, artist }: PlayButtonProps) {
	const { setCurrentSong, addToPlaylist } = useYouTube();

	if (!videoId) return null;

	const song = { videoId, title, artist };

	return (
		<div className="flex items-center gap-2">
			<button onClick={() => setCurrentSong(song)} className="hover:text-accent transition-colors" title={`Play ${title}`}>
				<PlayCircleIcon className="w-8 h-8" />
			</button>
			<span>{title}</span>
			<button onClick={() => addToPlaylist(song)} className="hover:text-accent transition-colors ml-2" title="Add to playlist">
				<PlusCircleIcon className="w-6 h-6" />
			</button>
		</div>
	);
}
