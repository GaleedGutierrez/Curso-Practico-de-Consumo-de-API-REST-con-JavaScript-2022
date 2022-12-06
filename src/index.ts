import API_KEY from './authentication.mjs';
import { CAROUSEL_CONTAINER } from './elementsHtml.mjs';
import { ResultInterface, TheMovieDBInterface } from './interfaces.mjs';

const getTrendingMoviesPreview = async (): Promise<ResultInterface[]> => {
	const RESPONSE = await fetch(`${API}/trending/movie/day?${API_KEY_URL}`);
	const DATA: TheMovieDBInterface = await RESPONSE.json();
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

const API_KEY_URL = `api_key=${API_KEY}`;
const API = 'https://api.themoviedb.org/3/';

setImgTrending();
