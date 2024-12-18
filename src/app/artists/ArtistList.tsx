"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ArtistList({ initialArtists, currentSort }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleSort = (value: string) => {
		// URL 파라미터를 통해 정렬 기준 변경
		const params = new URLSearchParams(searchParams);
		params.set("sort", value);
		router.push(`/artists?${params.toString()}`);
	};

	return (
		<>
			{/* 정렬 옵션 */}
			<div className="mb-8 flex justify-between items-center">
				<div className="flex gap-4">
					<select className="px-4 py-2 border rounded-lg" value={currentSort} onChange={(e) => handleSort(e.target.value)}>
						<option value="name">이름순</option>
						<option value="debut">데뷔순</option>
					</select>
				</div>
				<div className="text-gray-500">총 {initialArtists.length}개의 아티스트</div>
			</div>

			{/* 아티스트 그리드 */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{initialArtists.map((artist) => (
					<Link key={artist.id} href={`/artist/${artist.id}`} className="group">
						<article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
							<div className="relative h-48">
								<Image
									src={`https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/${artist.imageUrl}/public`}
									alt={artist.name}
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>

							<div className="p-4">
								<h2 className="font-bold text-lg mb-1">{artist.name}</h2>
								<div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
									<span>{artist.genre.name}</span>
									<span>•</span>
									<span>{artist.country}</span>
									<span>•</span>
									<span>{artist.debutYear}년 데뷔</span>
								</div>
								<p className="text-sm text-gray-600 line-clamp-2">{artist.description}</p>
								{artist.songs[0] && <div className="mt-3 text-sm text-accent">대표곡: {artist.songs[0].title}</div>}
							</div>
						</article>
					</Link>
				))}
			</div>

			{/* 아티스트가 없는 경우 */}
			{initialArtists.length === 0 && (
				<div className="text-center py-12">
					<p className="text-gray-500">아직 등록된 아티스트가 없습니다.</p>
				</div>
			)}
		</>
	);
}
