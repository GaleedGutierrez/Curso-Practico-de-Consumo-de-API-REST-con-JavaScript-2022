import API_KEY from './authentication.mjs';
import { CAROUSEL_CONTAINER, CATEGORIES_CONTAINER } from './nodes.mjs';
import { CategoriesInterface, ResultInterface, TheMovieDBInterface } from './interfaces.mjs';
// FIXME: Comentar la importación de Axios cada vez que se guarden cambios.
// import axios from 'axios';

const getTrendingMoviesPreview = async (): Promise<ResultInterface[]> => {
	const RESPONSE = await api(`trending/movie/day`);
	const DATA: TheMovieDBInterface = RESPONSE.data;
	const MOVIES = DATA.results;

	return MOVIES;
};

const setImgTrending = async (): Promise<void> => {
	const MOVIES = await getTrendingMoviesPreview();

	for (const MOVIE of MOVIES) {
		const MOVIE_IMG = `https://image.tmdb.org/t/p/w300${MOVIE.poster_path}`;
		const ALT_IMG = MOVIE.title;
		const MOVE_HTML =
`<article class="carousel__item">
	<figure>
		<img class="carousel__item-img" src="${MOVIE_IMG}" alt="${ALT_IMG}" />
	</figure>
</article>`;

		CAROUSEL_CONTAINER.innerHTML += (MOVE_HTML);
	}
};

const getCategoriesPreview = async () => {
	const RESPONSE = await api(`genre/movie/list`);
	const DATA: CategoriesInterface = RESPONSE.data;
	const CATEGORIES = DATA.genres;

	return CATEGORIES;
};

const setCategory = async () => {
	const CATEGORIES = await getCategoriesPreview();

	for (const CATEGORY of CATEGORIES) {
		const CATEGORY_HTML = `<p id="category-id-${CATEGORY.id}" class="categories__category categories__category--action">${CATEGORY.name}</p>`;

		CATEGORIES_CONTAINER.innerHTML += CATEGORY_HTML;
	}
};

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
getCategoriesPreview();
setCategory();
