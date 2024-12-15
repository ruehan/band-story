// app/artist/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { prisma } from "../../../lib/prisma";

async function getArtist(id: string) {
	const artist = await prisma.artist.findUnique({
		where: { id },
		include: {
			genre: true,
			songs: true,
		},
	});

	if (!artist) notFound();
	return artist;
}

export default async function ArtistPage({ params }: { params: { id: string } }) {
	const artist = await getArtist(params.id);

	return (
		<main>
			{/* 헤더 섹션 */}
			<section className="relative h-[400px]">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70">
					<Image src={artist.imageUrl} alt={artist.name} fill className="object-cover -z-10" />
				</div>
				<div className="container mx-auto px-4 h-full flex items-end pb-12">
					<div className="text-white">
						<h1 className="text-5xl font-bold mb-4">{artist.name}</h1>
						<div className="flex gap-4 text-gray-200">
							<span>{artist.country}</span>
							<span>•</span>
							<span>{artist.genre.name}</span>
							<span>•</span>
							<span>데뷔: {artist.debutYear}</span>
						</div>
					</div>
				</div>
			</section>

			{/* 상세 정보 섹션 */}
			<section className="py-12 bg-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* 왼쪽: 아티스트 정보 */}
						<div className="lg:col-span-2">
							<h2 className="text-2xl font-bold mb-4">소개</h2>
							<p className="text-gray-600 mb-8">{artist.description}</p>

							<h2 className="text-2xl font-bold mb-4">음악</h2>
							<div className="bg-gray-50 rounded-lg p-4">
								{artist.songs.map((song) => (
									<div key={song.id} className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors">
										<div className="flex items-center gap-3">
											<PlayCircleIcon className="w-8 h-8 text-accent cursor-pointer" />
											<div>
												<div className="font-medium">{song.title}</div>
												<div className="text-sm text-gray-500">{song.duration}</div>
											</div>
										</div>
										{song.videoId && <button className="text-sm text-accent hover:text-accent/80">YouTube에서 보기</button>}
									</div>
								))}
							</div>
						</div>

						{/* 오른쪽: 사이드바 정보 */}
						<div>
							<div className="bg-gray-50 rounded-lg p-6">
								<h3 className="text-lg font-bold mb-4">아티스트 정보</h3>
								<dl className="space-y-2">
									<div>
										<dt className="text-gray-500">장르</dt>
										<dd className="font-medium">{artist.genre.name}</dd>
									</div>
									<div>
										<dt className="text-gray-500">국가</dt>
										<dd className="font-medium">{artist.country}</dd>
									</div>
									<div>
										<dt className="text-gray-500">데뷔</dt>
										<dd className="font-medium">{artist.debutYear}</dd>
									</div>
								</dl>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
