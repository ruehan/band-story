import React from "react";

export default function HeroBanner() {
	return (
		<section className="relative h-[600px] bg-gradient-to-r from-primary to-secondary">
			<div className="absolute inset-0 bg-black/50" />
			<div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start">
				<h1 className="text-5xl font-bold text-white mb-4">당신의 음악 취향을 넓혀보세요</h1>
				<p className="text-xl text-gray-200 mb-8 max-w-2xl">전 세계의 다양한 밴드들을 만나보세요. 새로운 음악의 세계가 당신을 기다립니다.</p>
				<button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors">밴드 둘러보기</button>
			</div>
		</section>
	);
}
