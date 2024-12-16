import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import { prisma } from "../../../lib/prisma";
import PlayButton from "@/components/PlayButton";

async function getArtist(id: string) {
	const artist = await prisma.artist.findUnique({
		where: { id },
		include: {
			genre: true,
			songs: {
				select: {
					id: true,
					title: true,
					duration: true,
					videoId: true,
					description: true,
				},
			},
			members: true,
		},
	});

	if (!artist) notFound();
	return artist;
}

type Params = Promise<{ id: string }>;

export default async function ArtistPage({ params }: { params: Params }) {
	const { id } = await params;
	const artist = await getArtist(id);
	return (
		<main>
			{/* 헤더 섹션 */}
			<section className="relative h-[400px]">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70">
					<Image src={`https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/${artist.imageUrl}/public`} alt={artist.name} fill className="object-cover -z-10" />
				</div>
				<div className="container mx-auto px-4 h-full flex items-end pb-12">
					<div className="text-white">
						<h1 className="text-5xl font-bold mb-4 text-gray-600">{artist.name}</h1>
						<div className="flex gap-4 text-gray-600">
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

							<h2 className="text-2xl font-bold mb-4">멤버</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
								{artist.members.map((member) => (
									<div key={member.id} className="bg-gray-50 rounded-lg p-4 text-center">
										<div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
											<Image src={`https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/${member.imageUrl}/public`} alt={member.name} fill className="object-cover" />
										</div>
										<h3 className="font-bold mb-1">{member.name}</h3>
										<p className="text-sm text-gray-500">{member.role}</p>
									</div>
								))}
							</div>

							<h2 className="text-2xl font-bold mb-4">음악</h2>
							<div className="bg-gray-50 rounded-lg p-4 space-y-4">
								{artist.songs.map((song) => (
									<div key={song.id} className="bg-white rounded-lg p-4 hover:shadow-md transition-all">
										<div className="flex items-center justify-between mb-2">
											<div className="flex items-center gap-3">
												<PlayButton videoId={song.videoId} title={song.title} artist={artist.name} />
											</div>
											<span className="text-gray-500">{song.duration}</span>
										</div>
										{song.description && (
											<div className="mt-2 pl-10">
												<p className="text-sm text-gray-600">{song.description}</p>
											</div>
										)}
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
