// components/home/CategorySection.tsx
import Link from "next/link";
import React from "react";

const categories = {
	genres: [
		{ name: "록/메탈", slug: "rock-metal", count: 120 },
		{ name: "인디", slug: "indie", count: 85 },
		{ name: "얼터너티브", slug: "alternative", count: 67 },
		{ name: "포스트록", slug: "post-rock", count: 45 },
	],
	regions: [
		{ name: "한국", slug: "korean", count: 150 },
		{ name: "영국", slug: "british", count: 200 },
		{ name: "미국", slug: "american", count: 180 },
		{ name: "일본", slug: "japanese", count: 90 },
	],
};

export default function CategorySection() {
	return (
		<section className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold mb-8">카테고리</h2>

				{/* 장르별 카테고리 */}
				<div className="mb-12">
					<h3 className="text-xl font-semibold mb-4">장르별</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{categories.genres.map((genre) => (
							<Link key={genre.slug} href={`/genre/${genre.slug}`} className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
								<div className="font-medium text-lg mb-1">{genre.name}</div>
								<div className="text-sm text-gray-500">{genre.count}개의 밴드</div>
							</Link>
						))}
					</div>
				</div>

				{/* 국가별 카테고리 */}
				<div>
					<h3 className="text-xl font-semibold mb-4">국가별</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{categories.regions.map((region) => (
							<Link key={region.slug} href={`/region/${region.slug}`} className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
								<div className="font-medium text-lg mb-1">{region.name}</div>
								<div className="text-sm text-gray-500">{region.count}개의 밴드</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
