// app/artists/page.tsx
import { prisma } from "../../lib/prisma";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getArtists() {
	const artists = await prisma.artist.findMany({
		include: {
			genre: true,
			songs: {
				take: 1, // 대표곡 하나만 가져오기
			},
		},
		orderBy: {
			name: "asc", // 이름순 정렬
		},
	});

	return artists;
}

export default async function ArtistsPage() {
	const artists = await getArtists();

	return (
		<main>
			{/* 헤더 섹션 */}
			<section className="bg-gradient-to-r from-primary to-secondary py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-white mb-4">아티스트</h1>
					<p className="text-gray-200">다양한 장르의 아티스트들을 만나보세요</p>
				</div>
			</section>

			{/* 아티스트 목록 섹션 */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					{/* 필터 및 정렬 옵션 */}
					<div className="mb-8 flex justify-between items-center">
						<div className="flex gap-4">
							<select className="px-4 py-2 border rounded-lg">
								<option value="">모든 장르</option>
								<option value="rock">록/메탈</option>
								<option value="indie">인디</option>
								<option value="alternative">얼터너티브</option>
								<option value="post-rock">포스트록</option>
							</select>
							<select className="px-4 py-2 border rounded-lg">
								<option value="name">이름순</option>
								<option value="debut">데뷔순</option>
							</select>
						</div>
						<div className="text-gray-500">총 {artists.length}개의 아티스트</div>
					</div>

					{/* 아티스트 그리드 */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{artists.map((artist) => (
							<Link key={artist.id} href={`/artist/${artist.id}`} className="group">
								<article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
									<div className="relative h-48">
										<Image src={artist.imageUrl} alt={artist.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
									</div>

									<div className="p-4">
										<h2 className="font-bold text-lg mb-1">{artist.name}</h2>
										<div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
											<span>{artist.genre.name}</span>
											<span>•</span>
											<span>{artist.country}</span>
										</div>
										<p className="text-sm text-gray-600 line-clamp-2">{artist.description}</p>
										{artist.songs[0] && <div className="mt-3 text-sm text-accent">대표곡: {artist.songs[0].title}</div>}
									</div>
								</article>
							</Link>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
