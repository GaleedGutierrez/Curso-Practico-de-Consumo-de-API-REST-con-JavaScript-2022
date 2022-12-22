import API_KEY from './authentication.mjs';
import { CAROUSEL_CONTAINER, CATEGORIES_CONTAINER, GENERIC_LIST_CONTAINER } from './nodes.mjs';
import { CategoriesInterface, MovieInterface, MoviesByCategoryInterface, TheMovieDBInterface } from './interfaces.mjs';
import { AxiosResponse } from 'axios';
// FIXME: Comentar la importación de Axios cada vez que se guarden cambios.
// import axios from 'axios';

export const getTrendingMoviesPreview = async (): Promise<MovieInterface[]> => {
	const RESPONSE: AxiosResponse = await api('trending/movie/day');
	const DATA: TheMovieDBInterface = RESPONSE.data;
	const MOVIES = DATA.results;

	return MOVIES;
};

export const setImgTrending = async (): Promise<void> => {
	const MOVIES = await getTrendingMoviesPreview();

	insertMovies(MOVIES, CAROUSEL_CONTAINER, true);
};

const getCategoriesPreview = async () => {
	const RESPONSE: AxiosResponse = await api(`genre/movie/list`);
	const DATA: CategoriesInterface = RESPONSE.data;
	const CATEGORIES = DATA.genres;

	return CATEGORIES;
};

export const setCategory = async () => {
	const CATEGORIES = await getCategoriesPreview();

	for (const CATEGORY of CATEGORIES) {
		const { id: ID, name: NAME } = CATEGORY;
		const CATEGORY_HTML = `<a id="category-id-${ID}" class="categories__category categories__category--action" href="#category=${ID}-${NAME}">${NAME}</a>`;

		CATEGORIES_CONTAINER.innerHTML += CATEGORY_HTML;
	}
};

export const getMoviesByCategory = async (id: string) => {
	const RESPONSE: AxiosResponse = await api('discover/movie', {
		params : {
			with_genres : id
		},
	});
	const DATA: MoviesByCategoryInterface = RESPONSE.data;
	const MOVIES: MovieInterface[] = DATA.results;

	return MOVIES;
};

export const setGenericMoviesList = (movies: MovieInterface[], carousel: boolean) => {
	GENERIC_LIST_CONTAINER.innerHTML = '';
	insertMovies(movies, GENERIC_LIST_CONTAINER, carousel);
};

const insertMovies = (movies: MovieInterface[], container: HTMLElement, carousel: boolean) => {

	for (const MOVIE of movies) {
		const MOVIE_IMG = `https://image.tmdb.org/t/p/w300${MOVIE.poster_path}`;
		const ALT_IMG = MOVIE.title;

		container.innerHTML += `<article class="${carousel
			? 'carousel__item'
			: ''}">
			<figure>
				<img class="generic-list__img" src="${MOVIE_IMG}" alt="${ALT_IMG}"/>
			</figure>
		</article>`;
	}
};

export const getMovieBySearch = async (query: string) => {
	const RESPONSE: AxiosResponse = await api('search/movie', {
		params : {
			query
		},
	});
	const DATA: MoviesByCategoryInterface = RESPONSE.data;
	const MOVIES: MovieInterface[] = DATA.results;

	return MOVIES;
};

// export const

const api = axios.create({
	baseURL : 'https://api.themoviedb.org/3/',
	headers : {
		'Content-Type' : 'application/json;charset=utf-8'
	},
	params : {
		api_key : API_KEY
	}
});

setImgTrending();
setCategory();
