import HeroBanner from "@/components/home/HeroBanner";
import CategorySection from "@/components/home/CategorySection";
import ArtistSpotlight from "@/components/home/ArtistSpotlight";
import { prisma } from "@/lib/prisma";

async function getHomePageData() {
	const genres = await prisma.genre.findMany({
		include: {
			_count: {
				select: { artists: true },
			},
		},
	});

	const artists = await prisma.artist.findMany({
		include: {
			genre: true,
			songs: true,
		},
		take: 3, // 최대 3개만 가져오기
	});

	return { genres, artists };
}

export default async function Home() {
	const { genres, artists } = await getHomePageData();

	return (
		<main>
			<HeroBanner />
			<CategorySection genres={genres} />
			<ArtistSpotlight artists={artists} />
		</main>
	);
}
