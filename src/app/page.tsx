// import HeroBanner from "@/components/HeroBanner";
// import CategorySection from "@/components/CategorySection";
// import FeaturedArtists from "@/components/FeaturedArtists";
// import LatestUpdates from "@/components/LatestUpdates";
import HeroBanner from "@/components/home/HeroBanner";
import CategorySection from "@/components/home/CategorySection";
import ArtistSpotlight from "@/components/home/ArtistSpotlight";
export default function Home() {
	return (
		<main>
			<HeroBanner />
			<CategorySection />
			<ArtistSpotlight />
		</main>
	);
}
