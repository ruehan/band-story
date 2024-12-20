import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import { prisma } from "../../../lib/prisma";
import PlayButton from "@/components/PlayButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import ArtistSongList from "@/components/home/ArtistSongList";
import type { Metadata } from "next";

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
					recommended: true,
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
					<Image src={`https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/${artist.imageUrl}/public`} alt={artist.name} fill className="object-contain -z-10" />
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
							<ArtistSongList songs={artist.songs} artistName={artist.name} />
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

export async function generateMetadata({ params }): Promise<Metadata> {
	const artist = await getArtist(params.id);

	return {
		title: artist.name,
		description: artist.description || `${artist.name}의 프로필과 음악을 확인해보세요.`,
		keywords: [artist.name, artist.genre.name, "밴드", "음악"],
		openGraph: {
			title: artist.name,
			description: artist.description,
			images: [`https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/${artist.imageUrl}/public`],
		},
	};
}
