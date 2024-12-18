import Link from "next/link";
import { SpeakerWaveIcon, InformationCircleIcon, MusicalNoteIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function Navigation() {
	return (
		<nav className="bg-white shadow-sm">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* 로고 & 메인 메뉴 */}
					<div className="flex items-center space-x-8">
						<Link href="/" className="text-xl font-bold text-primary flex items-center">
							<SpeakerWaveIcon className="h-6 w-6 mr-2" />
							Band Story
						</Link>

						<div className="hidden md:flex space-x-4">
							<Link href="/artists" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50">
								<UserGroupIcon className="h-5 w-5 mr-1" />
								아티스트
							</Link>
							<Link href="/genres" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50">
								<MusicalNoteIcon className="h-5 w-5 mr-1" />
								장르
							</Link>
							<Link href="/about" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50">
								<InformationCircleIcon className="h-5 w-5 mr-1" />
								소개
							</Link>
						</div>
					</div>

					{/* 모바일 메뉴 */}
					<div className="md:hidden flex space-x-4">
						<Link href="/artists" className="p-2 text-gray-700 hover:text-primary">
							<UserGroupIcon className="h-6 w-6" />
						</Link>
						<Link href="/genres" className="p-2 text-gray-700 hover:text-primary">
							<MusicalNoteIcon className="h-6 w-6" />
						</Link>
						<Link href="/about" className="p-2 text-gray-700 hover:text-primary">
							<InformationCircleIcon className="h-6 w-6" />
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
