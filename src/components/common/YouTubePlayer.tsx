"use client";

import YouTube from "react-youtube";
import { XMarkIcon, ForwardIcon, BackwardIcon } from "@heroicons/react/24/solid";
import { useYouTube } from "@/contexts/YouTubeContext";

interface YouTubePlayerProps {
	videoId: string;
	title: string;
	artist: string;
	onClose: () => void;
	onEnded: () => void;
}

export default function YouTubePlayer({ videoId, title, artist, onClose, onEnded }: YouTubePlayerProps) {
	const { playNext, playPrevious } = useYouTube();

	return (
		<div className="fixed bottom-4 right-4 w-80 shadow-lg rounded-lg overflow-hidden bg-black z-50">
			<div className="flex justify-between items-center bg-gray-800 p-3">
				<div className="text-white flex-1 min-w-0 mr-2">
					<h3 className="text-sm font-medium truncate">{title}</h3>
					<p className="text-xs text-gray-400 truncate">{artist}</p>
				</div>
				<div className="flex items-center gap-2">
					<button onClick={playPrevious} className="text-white hover:text-gray-300 p-1" title="이전 곡">
						<BackwardIcon className="h-5 w-5" />
					</button>
					<button onClick={playNext} className="text-white hover:text-gray-300 p-1" title="다음 곡">
						<ForwardIcon className="h-5 w-5" />
					</button>
					<button onClick={onClose} className="text-white hover:text-gray-300 p-1" title="닫기">
						<XMarkIcon className="h-5 w-5" />
					</button>
				</div>
			</div>
			<YouTube
				videoId={videoId}
				opts={{
					width: "320",
					height: "180",
					playerVars: {
						autoplay: 1,
					},
				}}
				onEnd={onEnded}
			/>
		</div>
	);
}
