import Image from "next/image";
import Link from "next/link";
import PlayButton from "../PlayButton";

type Artist = {
	id: string;
	name: string;
	description: string;
	imageUrl: string;
	country: string;
	debutYear: string;
	genre: {
		name: string;
	};
	songs: Array<{
		id: string;
		title: string;
		duration: string;
		videoId: string | null;
	}>;
};

type Props = {
	artists: Artist[];
};

export default function ArtistSpotlight({ artists }: Props) {
	return (
		<section className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-3xl font-bold">아티스트 스포트라이트</h2>
					<Link href="/artists" className="text-accent hover:text-accent/80 font-medium">
						더 많은 아티스트 보기
					</Link>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{artists.map((artist) => (
						<article key={artist.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
							<div className="relative h-48">
								<Image src={`https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/${artist.imageUrl}/public`} alt={artist.name} fill className="object-cover" />
							</div>

							<div className="p-6">
								<div className="mb-4">
									<h3 className="font-bold text-xl mb-2">{artist.name}</h3>
									<p className="text-gray-600 text-sm mb-2">{artist.description}</p>
									<div className="flex space-x-4 text-sm text-gray-500">
										<span>{artist.country}</span>
										<span>데뷔: {artist.debutYear}</span>
										<span>{artist.genre.name}</span>
									</div>
								</div>

								<div className="border-t pt-4">
									<h4 className="font-medium mb-2">대표곡</h4>
									<ul className="space-y-2">
										{artist.songs.map((song) => (
											<li key={song.id} className="flex items-center justify-between text-sm hover:bg-gray-50 p-2 rounded">
												<div className="flex items-center">
													<PlayButton videoId={song.videoId} title={song.title} artist={artist.name} />
												</div>
												<span className="text-gray-500">{song.duration}</span>
											</li>
										))}
									</ul>
								</div>

								<Link href={`/artist/${artist.id}`} className="block text-center mt-4 text-accent hover:text-accent/80 font-medium">
									아티스트 상세보기
								</Link>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
