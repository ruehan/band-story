import { prisma } from "../../lib/prisma";
import Link from "next/link";
import React from "react";

async function getGenres() {
	const genres = await prisma.genre.findMany({
		include: {
			_count: {
				select: { artists: true },
			},
			artists: {
				take: 3,
			},
		},
		orderBy: {
			name: "asc",
		},
	});

	return genres;
}

export default async function GenresPage() {
	const genres = await getGenres();

	return (
		<main>
			{/* 헤더 섹션 */}
			<section className="bg-gradient-to-r from-primary to-secondary py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-white mb-4">장르</h1>
					<p className="text-gray-200">다양한 장르의 음악을 탐색해보세요</p>
				</div>
			</section>

			{/* 장르 목록 섹션 */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					{/* 필터 및 정렬 옵션 */}
					<div className="mb-8 flex justify-between items-center">
						<select className="px-4 py-2 border rounded-lg">
							<option value="name">이름순</option>
							<option value="artists">아티스트 수</option>
						</select>
						<div className="text-gray-500">총 {genres.length}개의 장르</div>
					</div>

					{/* 장르 그리드 */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{genres.map((genre) => (
							<Link key={genre.id} href={`/genre/${genre.slug}`} className="group">
								<article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all p-6">
									<div className="mb-4">
										<h2 className="font-bold text-2xl mb-2">{genre.name}</h2>
										<p className="text-gray-600 mb-4">{"다양한 아티스트들의 음악을 만나보세요."}</p>
										<div className="text-accent font-medium">{genre._count.artists}개의 아티스트</div>
									</div>

									{genre.artists.length > 0 && (
										<div className="mt-4 pt-4 border-t">
											<h3 className="text-sm font-medium text-gray-500 mb-2">대표 아티스트</h3>
											<div className="flex flex-wrap gap-2">
												{genre.artists.map((artist) => (
													<span key={artist.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
														{artist.name}
													</span>
												))}
											</div>
										</div>
									)}
								</article>
							</Link>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}

export const metadata = {
	title: "장르 - Band Story",
	description: "다양한 장르의 음악을 탐색해보세요.",
};
