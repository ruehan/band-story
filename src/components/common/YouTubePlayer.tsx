"use client";

import YouTube, { YouTubePlayer as YT } from "react-youtube";
import { XMarkIcon, ForwardIcon, BackwardIcon, PlayIcon, PauseIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { useYouTube } from "@/contexts/YouTubeContext";
import { useState, useRef, useEffect } from "react";

interface YouTubePlayerProps {
	videoId: string;
	title: string;
	artist: string;
	onClose: () => void;
	onEnded: () => void;
}

export default function YouTubePlayer({ videoId, title, artist, onClose, onEnded }: YouTubePlayerProps) {
	const { playNext, playPrevious, playlist, currentSong, setCurrentSong, removeFromPlaylist } = useYouTube();
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(50);
	const dragRef = useRef<HTMLDivElement>(null);
	const initialPosition = useRef({ x: 0, y: 0 });
	const dragStart = useRef({ x: 0, y: 0 });
	const playerRef = useRef<YT | null>(null);
	const currentSongRef = useRef<HTMLDivElement>(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const progressInterval = useRef<NodeJS.Timeout | null>(null);

	const currentIndex = currentSong ? playlist.findIndex((song) => song.videoId === currentSong.videoId) : -1;

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!dragRef.current || e.target instanceof HTMLInputElement) return;

		setIsDragging(true);
		initialPosition.current = position;
		dragStart.current = { x: e.clientX, y: e.clientY };
	};

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;

			const dx = e.clientX - dragStart.current.x;
			const dy = e.clientY - dragStart.current.y;

			setPosition({
				x: initialPosition.current.x + dx,
				y: initialPosition.current.y + dy,
			});
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging]);

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	const handleReady = (event: { target: YT }) => {
		playerRef.current = event.target;
		event.target.setVolume(volume);
		setDuration(event.target.getDuration());
	};

	useEffect(() => {
		if (isPlaying) {
			progressInterval.current = setInterval(() => {
				if (playerRef.current) {
					setCurrentTime(playerRef.current.getCurrentTime());
				}
			}, 1000);
		} else {
			if (progressInterval.current) {
				clearInterval(progressInterval.current);
			}
		}

		return () => {
			if (progressInterval.current) {
				clearInterval(progressInterval.current);
			}
		};
	}, [isPlaying]);

	const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = Number(e.target.value);
		setCurrentTime(newTime);
		if (playerRef.current) {
			playerRef.current.seekTo(newTime, true);
		}
	};

	const togglePlay = () => {
		if (!playerRef.current) return;

		if (isPlaying) {
			playerRef.current.pauseVideo();
		} else {
			playerRef.current.playVideo();
		}
		setIsPlaying(!isPlaying);
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = Number(e.target.value);
		setVolume(newVolume);
		if (playerRef.current) {
			playerRef.current.setVolume(newVolume);
		}
	};

	useEffect(() => {
		if (currentSongRef.current) {
			currentSongRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [currentSong]);

	return (
		<div
			ref={dragRef}
			className="fixed w-80 shadow-lg rounded-lg overflow-hidden bg-gray-900 z-50"
			style={{
				transform: `translate(${position.x}px, ${position.y}px)`,
				bottom: "1rem",
				right: "1rem",
			}}
		>
			<div className="flex justify-between items-center bg-gray-800 p-3" onMouseDown={handleMouseDown} style={{ cursor: isDragging ? "grabbing" : "grab" }}>
				<div className="text-white flex-1 min-w-0 mr-2">
					<h3 className="text-sm font-medium truncate">{title}</h3>
					<p className="text-xs text-gray-400 truncate">{artist}</p>
				</div>
				<div className="flex items-center gap-2">
					<button onClick={playPrevious} className="text-white hover:text-gray-300 p-1" title="이전 곡">
						<BackwardIcon className="h-5 w-5" />
					</button>
					<button onClick={togglePlay} className="text-white hover:text-gray-300 p-1" title={isPlaying ? "일시정지" : "재생"}>
						{isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
					</button>
					<button onClick={playNext} className="text-white hover:text-gray-300 p-1" title="다음 곡">
						<ForwardIcon className="h-5 w-5" />
					</button>
					<button onClick={onClose} className="text-white hover:text-gray-300 p-1" title="닫기">
						<XMarkIcon className="h-5 w-5" />
					</button>
				</div>
			</div>

			<div className="p-3 border-t border-gray-700">
				<div className="mb-2">
					<input type="range" min="0" max={duration} value={currentTime} onChange={handleProgressChange} className="w-full h-1 rounded-lg appearance-none bg-gray-700 cursor-pointer" />
					<div className="flex justify-between text-xs text-gray-400 mt-1">
						<span>{formatTime(currentTime)}</span>
						<span>{formatTime(duration)}</span>
					</div>
				</div>

				<div className="flex items-center gap-2 text-white">
					<SpeakerWaveIcon className="h-5 w-5" />
					<input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} className="w-full h-2 rounded-lg appearance-none bg-gray-700 cursor-pointer" />
				</div>
			</div>

			<div className="max-h-[200px] overflow-y-auto scrollbar-hide">
				<div className="h-[80px]" />

				{playlist.map((song, index) => {
					const isCurrent = currentSong?.videoId === song.videoId;
					const isVisible = Math.abs(index - currentIndex) <= 1;

					return (
						<div
							key={song.videoId}
							ref={isCurrent ? currentSongRef : null}
							className={`p-3 flex justify-between items-center transition-all border-t border-gray-700
								${isCurrent ? "bg-gray-800" : "hover:bg-gray-800"}
								${isVisible ? "opacity-100" : "opacity-50"}`}
						>
							<button onClick={() => setCurrentSong(song)} className="flex-1 text-left">
								<div className="font-medium truncate text-white">{song.title}</div>
								<div className="text-sm text-gray-400 truncate">{song.artist}</div>
							</button>
							<button onClick={() => removeFromPlaylist(song.videoId)} className="text-gray-400 hover:text-gray-200">
								<XMarkIcon className="h-5 w-5" />
							</button>
						</div>
					);
				})}

				<div className="h-[80px]" />
			</div>

			<div className="hidden">
				<YouTube
					videoId={videoId}
					opts={{
						width: "320",
						height: "180",
						playerVars: {
							autoplay: 1,
						},
					}}
					onReady={handleReady}
					onEnd={onEnded}
					onPlay={() => {
						setIsPlaying(true);
						if (playerRef.current) {
							setCurrentTime(playerRef.current.getCurrentTime());
							setDuration(playerRef.current.getDuration());
						}
					}}
					onPause={() => setIsPlaying(false)}
					onStateChange={(event) => {
						if (event.data !== -1) {
							setCurrentTime(event.target.getCurrentTime());
							setDuration(event.target.getDuration());
						}
					}}
				/>
			</div>
		</div>
	);
}
