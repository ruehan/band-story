"use client";

import { useYouTube } from "@/contexts/YouTubeContext";
import { PlayIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

type Song = {
	id: string;
	title: string;
	duration: string;
	videoId: string | null;
	description: string;
	recommended: boolean;
};

type Props = {
	songs: Song[];
	artistName: string;
};

export default function SongList({ songs, artistName }: Props) {
	const { addToPlaylist, setCurrentSong } = useYouTube();

	return (
		<ul className="grid grid-cols-1 gap-4">
			{songs
				.sort((a, b) => Number(b.recommended) - Number(a.recommended))
				.map((song) => (
					<li key={song.id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
						<div className="flex items-center justify-between mb-2">
							<div>
								<h3 className="text-lg font-semibold">{song.title}</h3>
								<p className="text-sm text-gray-500">{song.duration}</p>
							</div>
							<div className="flex items-center gap-2">
								<button onClick={() => setCurrentSong({ videoId: song.videoId!, title: song.title, artist: artistName })} className="text-gray-500 hover:text-accent" title="재생">
									<PlayIcon className="h-5 w-5" />
								</button>
								<button onClick={() => addToPlaylist({ videoId: song.videoId!, title: song.title, artist: artistName })} className="text-gray-500 hover:text-accent" title="플레이리스트에 추가">
									<PlusCircleIcon className="h-5 w-5" />
								</button>
							</div>
						</div>
						<p className="text-sm text-gray-600 mb-2">{song.description}</p>
						{song.recommended && <span className="text-xs text-accent font-bold">추천</span>}
					</li>
				))}
		</ul>
	);
}
