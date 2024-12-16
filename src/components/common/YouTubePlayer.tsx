"use client";

import YouTube from "react-youtube";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface YouTubePlayerProps {
	videoId: string;
	title: string;
	artist: string;
	onClose: () => void;
}

export default function YouTubePlayer({ videoId, title, artist, onClose }: YouTubePlayerProps) {
	return (
		<div className="fixed bottom-4 right-4 w-80 shadow-lg rounded-lg overflow-hidden bg-black z-50">
			<div className="flex justify-between items-center bg-gray-800 p-3">
				<div className="text-white">
					<h3 className="text-sm font-medium truncate">{title}</h3>
					<p className="text-xs text-gray-400 truncate">{artist}</p>
				</div>
				<button onClick={onClose} className="text-white hover:text-gray-300">
					<XMarkIcon className="h-5 w-5" />
				</button>
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
			/>
		</div>
	);
}
