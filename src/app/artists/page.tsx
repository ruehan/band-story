import { prisma } from "../../lib/prisma";
import Image from "next/image";
import Link from "next/link";
import ArtistList from "./ArtistList";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "아티스트",
	description: "다양한 밴드와 뮤지션들을 만나보세요. 각 밴드의 프로필과 음악을 확인할 수 있습니다.",
	keywords: ["밴드", "뮤지션", "아티스트", "인디밴드", "록밴드"],
};

// searchParams를 통해 정렬 기준을 받아옴
async function getArtists(sortBy: string = "name") {
	const artists = await prisma.artist.findMany({
		include: {
			genre: true,
			songs: {
				take: 1,
			},
		},
		...(sortBy === "debut" ? { orderBy: { debutYear: "asc" } } : {}),
	});

	if (sortBy === "name") {
		artists.sort((a, b) => {
			const nameA = a.name.split("(")[0].trim();
			const nameB = b.name.split("(")[0].trim();
			return new Intl.Collator("ko", { sensitivity: "base" }).compare(nameA, nameB);
		});
	}

	return artists;
}

export default async function ArtistsPage({ searchParams }: { searchParams: { sort: string } }) {
	const sortBy = searchParams.sort || "name";
	const artists = await getArtists(sortBy);

	return (
		<main>
			<section className="bg-gradient-to-r from-primary to-secondary py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-white mb-4">아티스트</h1>
					<p className="text-gray-200">다양한 아티스트들의 음악을 탐색해보세요</p>
				</div>
			</section>

			<section className="py-16">
				<div className="container mx-auto px-4">
					<ArtistList initialArtists={artists} currentSort={sortBy} />
				</div>
			</section>
		</main>
	);
}
