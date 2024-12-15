// components/home/ArtistSpotlight.tsx
import Image from "next/image";
import Link from "next/link";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

const spotlightArtists = [
	{
		id: 1,
		name: "넬(NELL)",
		description: "감성적인 멜로디와 서정적인 가사로 사랑받는 밴드",
		imageUrl: "/images/artists/nell.jpg",
		country: "대한민국",
		debutYear: "2001",
		representative: "기억을 걷는 시간, 타임리프",
		tracks: [
			{ title: "기억을 걷는 시간", duration: "4:32", videoId: "xxxxx" },
			{ title: "타임리프", duration: "3:55", videoId: "xxxxx" },
			{ title: "Good Night", duration: "4:12", videoId: "xxxxx" },
		],
	},
	{
		id: 2,
		name: "Radiohead",
		description: "실험적이고 혁신적인 사운드로 현대 록음악의 새로운 지평을 연 밴드",
		imageUrl: "/images/artists/radiohead.jpg",
		country: "영국",
		debutYear: "1985",
		representative: "Creep, Karma Police",
		tracks: [
			{ title: "Creep", duration: "3:56", videoId: "xxxxx" },
			{ title: "Karma Police", duration: "4:21", videoId: "xxxxx" },
			{ title: "No Surprises", duration: "3:48", videoId: "xxxxx" },
		],
	},
	{
		id: 3,
		name: "이날치",
		description: "한국 전통음악을 현대적으로 재해석하는 혁신적인 밴드",
		imageUrl: "/images/artists/leenalchi.jpg",
		country: "대한민국",
		debutYear: "2019",
		representative: "범 내려온다, 수궁가",
		tracks: [
			{ title: "범 내려온다", duration: "3:43", videoId: "xxxxx" },
			{ title: "수궁가", duration: "4:02", videoId: "xxxxx" },
			{ title: "달", duration: "3:38", videoId: "xxxxx" },
		],
	},
];

export default function ArtistSpotlight() {
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
					{spotlightArtists.map((artist) => (
						<article key={artist.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
							<div className="relative h-48">
								<Image src={artist.imageUrl} alt={artist.name} fill className="object-cover" />
							</div>

							<div className="p-6">
								<div className="mb-4">
									<h3 className="font-bold text-xl mb-2">{artist.name}</h3>
									<p className="text-gray-600 text-sm mb-2">{artist.description}</p>
									<div className="flex space-x-4 text-sm text-gray-500">
										<span>{artist.country}</span>
										<span>데뷔: {artist.debutYear}</span>
									</div>
								</div>

								<div className="border-t pt-4">
									<h4 className="font-medium mb-2">대표곡</h4>
									<ul className="space-y-2">
										{artist.tracks.map((track, index) => (
											<li key={index} className="flex items-center justify-between text-sm hover:bg-gray-50 p-2 rounded">
												<div className="flex items-center">
													<PlayCircleIcon className="w-5 h-5 text-accent mr-2 cursor-pointer" />
													<span>{track.title}</span>
												</div>
												<span className="text-gray-500">{track.duration}</span>
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
