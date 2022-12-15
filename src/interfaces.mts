export interface TheMovieDBInterface {
	page: number;
	results: MovieInterface[];
	total_pages: number;
	total_results: number;
}

export interface MovieInterface {
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
	MOVIE = 'movie',
}

export interface CategoriesInterface {
	genres: GenresInterface[];
}

export interface GenresInterface {
	id: number;
	name: string;
}

export interface MoviesByCategoryInterface {
	page: number;
	results: MovieInterface[];
	total_results: number;
	total_pages: number;
}

export enum OriginalLanguage {
	EN = 'en',
}
