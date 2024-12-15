export interface Band {
	id: string;
	name: string;
	country: string;
	description: string;
	imageUrl: string;
	members: Member[];
	representativeSongs: Song[];
	albums: Album[];
}

export interface Member {
	name: string;
	role: string;
	imageUrl?: string;
}

export interface Song {
	title: string;
	youtubeId: string;
	releaseYear: number;
}

export interface Album {
	title: string;
	releaseYear: number;
	imageUrl: string;
}
