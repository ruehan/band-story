"use client";

import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { useYouTube } from "@/contexts/YouTubeContext";

interface PlayButtonProps {
	videoId: string | null;
	title: string;
	artist: string;
}

export default function PlayButton({ videoId, title, artist }: PlayButtonProps) {
	const { setCurrentSong } = useYouTube();

	if (!videoId) return null;

	return (
		<button onClick={() => setCurrentSong({ videoId, title, artist })} className="flex items-center gap-2 hover:text-accent transition-colors" title={`Play ${title}`}>
			<PlayCircleIcon className="w-8 h-8" />
			<span>{title}</span>
		</button>
	);
}
