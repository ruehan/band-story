// app/genre/[slug]/page.tsx
import { prisma } from "../../../lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function getGenreData(slug: string) {
	const genre = await prisma.genre.findUnique({
		where: { slug },
		include: {
			artists: {
				include: {
					songs: {
						take: 1, // 대표곡 하나만 가져오기
					},
				},
			},
			_count: {
				select: { artists: true },
			},
		},
	});

	if (!genre) notFound();
	return genre;
}

export default async function GenrePage({ params }: { params: { slug: string } }) {
	const genre = await getGenreData(params.slug);

	return (
		<main>
			{/* 헤더 섹션 */}
			<section className="bg-gradient-to-r from-primary to-secondary py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-white mb-4">{genre.name}</h1>
					<p className="text-gray-200">{genre._count.artists}개의 아티스트가 있습니다</p>
				</div>
			</section>

			{/* 아티스트 목록 섹션 */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					{/* 정렬 옵션 */}
					<div className="mb-8 flex justify-between items-center">
						<select className="px-4 py-2 border rounded-lg">
							<option value="name">이름순</option>
							<option value="debut">데뷔순</option>
							<option value="popular">인기순</option>
						</select>
					</div>

					{/* 아티스트 그리드 */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{genre.artists.map((artist) => (
							<Link key={artist.id} href={`/artist/${artist.id}`} className="group">
								<article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
									<div className="relative h-48">
										<Image src={artist.imageUrl} alt={artist.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
									</div>

									<div className="p-6">
										<h2 className="font-bold text-xl mb-2">{artist.name}</h2>
										<p className="text-gray-600 text-sm mb-3 line-clamp-2">{artist.description}</p>
										<div className="flex items-center gap-3 text-sm text-gray-500">
											<span>{artist.country}</span>
											<span>•</span>
											<span>데뷔: {artist.debutYear}</span>
										</div>
										{artist.songs[0] && (
											<div className="mt-4 pt-4 border-t">
												<div className="text-sm font-medium mb-1">대표곡</div>
												<div className="flex items-center justify-between text-sm">
													<span>{artist.songs[0].title}</span>
													<span className="text-gray-500">{artist.songs[0].duration}</span>
												</div>
											</div>
										)}
									</div>
								</article>
							</Link>
						))}
					</div>

					{/* 장르에 아티스트가 없는 경우 */}
					{genre.artists.length === 0 && (
						<div className="text-center py-12">
							<p className="text-gray-500">아직 등록된 아티스트가 없습니다.</p>
						</div>
					)}
				</div>
			</section>
		</main>
	);
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: { params: { slug: string } }) {
	const genre = await getGenreData(params.slug);

	return {
		title: `${genre.name} 아티스트 - Band Story`,
		description: `${genre.name} 장르의 아티스트들을 만나보세요.`,
	};
}
