import { MusicalNoteIcon, PlayIcon, QueueListIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
	return (
		<main>
			{/* 헤더 섹션 */}
			<section className="bg-gradient-to-r from-primary to-secondary py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-white mb-4">Band Story 소개</h1>
					<p className="text-gray-200">음악의 새로운 이야기를 시작합니다</p>
				</div>
			</section>

			{/* 소개 섹션 */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<div className="prose prose-lg">
							<h2 className="text-3xl font-bold mb-6">프로젝트 소개</h2>
							<p className="mb-6">Band Story는 다양한 장르의 밴드와 아티스트들을 소개하고, 그들의 음악을 쉽게 찾아들을 수 있도록 만든 플랫폼입니다. 음악을 사랑하는 모든 이들을 위해 만들어졌습니다.</p>
							<p className="mb-6">직접 노래를 선별하고 업데이트를 진행하는 프로젝트입니다.</p>
							<p>개발 진행 중 프로젝트로 업데이트가 다소 느릴 수 있습니다.</p>

							<h3 className="text-2xl font-bold mb-4 mt-8">주요 기능</h3>
							<ul className="space-y-4 mb-8">
								<li className="flex items-start">
									<span className="bg-accent/10 text-accent rounded-full p-2 mr-4">
										<MusicalNoteIcon className="h-6 w-6" />
									</span>
									<div>
										<h4 className="font-bold">아티스트 탐색</h4>
										<p className="text-gray-600">다양한 밴드와 아티스트들의 정보를 확인할 수 있습니다.</p>
									</div>
								</li>
								<li className="flex items-start">
									<span className="bg-accent/10 text-accent rounded-full p-2 mr-4">
										<PlayIcon className="h-6 w-6" />
									</span>
									<div>
										<h4 className="font-bold">음악 재생</h4>
										<p className="text-gray-600">아티스트의 대표곡을 바로 들어볼 수 있습니다.</p>
									</div>
								</li>
								<li className="flex items-start">
									<span className="bg-accent/10 text-accent rounded-full p-2 mr-4">
										<QueueListIcon className="h-6 w-6" />
									</span>
									<div>
										<h4 className="font-bold">플레이리스트</h4>
										<p className="text-gray-600">마음에 드는 곡들을 플레이리스트에 추가하여 관리할 수 있습니다.</p>
									</div>
								</li>
							</ul>

							<h3 className="text-2xl font-bold mb-4">기술 스택</h3>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
								{["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "YouTube API"].map((tech) => (
									<div key={tech} className="bg-gray-50 p-4 rounded-lg text-center">
										{tech}
									</div>
								))}
							</div>

							<h3 className="text-2xl font-bold mb-4">소스코드</h3>
							<p className="mb-4">GitHub에서 전체 소스 코드를 확인할 수 있습니다.</p>
							<div className="flex justify-center">
								<Link href="https://github.com/ruehan/band-story" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
									{/* <GithubIcon className="h-5 w-5" /> */}
									GitHub 저장소 방문하기
								</Link>
							</div>

							<h3 className="text-2xl font-bold mb-4 mt-8">연락처</h3>
							<p>프로젝트에 대한 문의나 제안사항이 있으시다면 아래 이메일로 연락해주세요.</p>
							<p className="text-accent">ruehan98@gmail.com</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export const metadata = {
	title: "소개",
	description: "Band Story 프로젝트 소개 및 주요 기능 안내",
};
