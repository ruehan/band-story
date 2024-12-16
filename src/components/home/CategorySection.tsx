import Link from "next/link";

type Genre = {
	id: string;
	name: string;
	slug: string;
	_count: {
		artists: number;
	};
};

type Props = {
	genres: Genre[];
};

export default function CategorySection({ genres }: Props) {
	return (
		<section className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold mb-8">카테고리</h2>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{genres.map((genre) => (
						<Link key={genre.id} href={`/genre/${genre.slug}`} className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
							<div className="font-medium text-lg mb-1">{genre.name}</div>
							<div className="text-sm text-gray-500">{genre._count.artists}개의 밴드</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
