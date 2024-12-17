import React from "react";
import Link from "next/link";

export default function HeroBanner() {
	return (
		<section className="bg-gradient-to-r from-primary to-secondary py-16">
			<div className="container mx-auto px-4">
				<h1 className="text-4xl font-bold text-white mb-4">당신의 음악 취향을 넓혀보세요</h1>
				<p className="text-gray-200 mb-6">전 세계의 다양한 밴드들을 만나보세요. 새로운 음악의 세계가 당신을 기다립니다.</p>
				<Link href="/artists" className="inline-block bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">
					밴드 둘러보기
				</Link>
			</div>
		</section>
	);
}
