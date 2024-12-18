import { prisma } from "../../lib/prisma";
import Link from "next/link";
import GenreList from "./GenreList";

async function getGenres(sortBy: string = "name") {
	const genres = await prisma.genre.findMany({
		include: {
			_count: {
				select: { artists: true },
			},
			artists: {
				take: 3,
			},
		},
	});

	// 정렬 로직
	if (sortBy === "name") {
		genres.sort((a, b) => {
			const nameA = a.name.split("(")[0].trim();
			const nameB = b.name.split("(")[0].trim();
			return new Intl.Collator("ko", { sensitivity: "base" }).compare(nameA, nameB);
		});
	} else if (sortBy === "artists") {
		genres.sort((a, b) => b._count.artists - a._count.artists);
	}

	return genres;
}

export default async function GenresPage({ searchParams }: { searchParams: { sort: string } }) {
	const sortBy = searchParams.sort || "name";
	const genres = await getGenres(sortBy);

	return (
		<main>
			<section className="bg-gradient-to-r from-primary to-secondary py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-white mb-4">장르</h1>
					<p className="text-gray-200">다양한 장르의 음악을 탐색해보세요</p>
				</div>
			</section>

			<section className="py-16">
				<div className="container mx-auto px-4">
					<GenreList initialGenres={genres} currentSort={sortBy} />
				</div>
			</section>
		</main>
	);
}

// export const metadata = {
// 	title: "장르 - Band Story",
// 	description: "다양한 장르의 음악을 탐색해보세요.",
// };
