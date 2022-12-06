export interface TheMovieDBInterface {
	page: number;
	results: ResultInterface[];
	total_pages: number;
	total_results: number;
}

export interface ResultInterface {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: MediaTypeInterface;
	genre_ids: number[];
	popularity: number;
	release_date: Date;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export enum MediaTypeInterface {
	Movie = 'movie',
}
