"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function GenreList({ initialGenres, currentSort }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleSort = (value: string) => {
		const params = new URLSearchParams(searchParams);
		params.set("sort", value);
		router.push(`/genres?${params.toString()}`);
	};

	return (
		<>
			{/* 정렬 옵션 */}
			<div className="mb-8 flex justify-between items-center">
				<div className="flex gap-4">
					<select className="px-4 py-2 border rounded-lg" value={currentSort} onChange={(e) => handleSort(e.target.value)}>
						<option value="name">이름순</option>
						<option value="artists">아티스트 수</option>
					</select>
				</div>
				<div className="text-gray-500">총 {initialGenres.length}개의 장르</div>
			</div>

			{/* 장르 그리드 */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{initialGenres.map((genre) => (
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

			{/* 장르가 없는 경우 */}
			{initialGenres.length === 0 && (
				<div className="text-center py-12">
					<p className="text-gray-500">아직 등록된 장르가 없습니다.</p>
				</div>
			)}
		</>
	);
}
