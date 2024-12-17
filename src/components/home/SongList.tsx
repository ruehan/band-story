"use client";

import { useYouTube } from "@/contexts/YouTubeContext";
import PlayButton from "../PlayButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

type Song = {
	id: string;
	title: string;
	duration: string;
	videoId: string | null;
};

type Props = {
	songs: Song[];
	artistName: string;
};

export default function SongList({ songs, artistName }: Props) {
	const { addToPlaylist } = useYouTube();

	return (
		<ul className="space-y-2">
			{songs.map((song) => (
				<li key={song.id} className="flex items-center justify-between text-sm hover:bg-gray-50 p-2 rounded">
					<PlayButton videoId={song.videoId} title={song.title} artist={artistName} />
					<div className="flex items-center gap-2">
						<span className="text-gray-500">{song.duration}</span>
						<button onClick={() => addToPlaylist({ videoId: song.videoId!, title: song.title, artist: artistName })} className="text-gray-500 hover:text-accent" title="플레이리스트에 추가">
							<PlusCircleIcon className="h-5 w-5" />
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}
