import { getMovieBySearch, getMoviesByCategory, getTrendingMoviesPreview, setGenericMoviesList } from './index.js';
import { BUTTONS_GO_BACK, BUTTON_SEARCH, BUTTON_TREADING, CATEGORIES_CONTAINER, GENERIC_LIST, HEADER_CATEGORY, HEADER_MAIN, HEADER_TITLE, MOVIE_DETAILS, SEARCH_INPUT, SIMILAR_MOVIES, TITLE_CATEGORY, TRENDING_PREVIEW } from './nodes.mjs';

const navigator = () => {
	window.scroll(0, 0);

	const HASHES = {
		'#trends'    : trendsPage,
		'#search='   : searchPage,
		'#movie='    : moviePage,
		'#category=' : categoryPage,
	};
	const HASHES_KEYS = Object.keys(HASHES);

	for (const KEY of HASHES_KEYS) {
		if (location.hash.startsWith(KEY)) {
			HASHES[KEY as keyof typeof HASHES]();

			return;
		}
	}

	homePage();
};

const homePage = () => {
	HEADER_CATEGORY.classList.add('hidden');
	MOVIE_DETAILS.classList.add('hidden');
	SIMILAR_MOVIES.classList.add('hidden');
	GENERIC_LIST.classList.add('hidden');

	HEADER_MAIN.classList.remove('hidden');
	TRENDING_PREVIEW.classList.remove('hidden');
	CATEGORIES_CONTAINER.classList.remove('hidden');
	HEADER_TITLE.classList.remove('hidden');
};

const categoryPage = async () => {
	console.log('CATEGORY 37');
	HEADER_MAIN.classList.add('hidden');
	MOVIE_DETAILS.classList.add('hidden');
	SIMILAR_MOVIES.classList.add('hidden');
	TRENDING_PREVIEW.classList.add('hidden');
	CATEGORIES_CONTAINER.classList.add('hidden');

	HEADER_CATEGORY.classList.remove('hidden');
	GENERIC_LIST.classList.remove('hidden');

	const [ HASH_NAME, CATEGORY_INFO ] = location.hash.split('=');
	const [ ID, NAME ] = CATEGORY_INFO.split('-');
	const MOVIES = await getMoviesByCategory(ID);
	const IS_THERE_SPACE = NAME.includes('%20');

	TITLE_CATEGORY.setAttribute('id', `category-movie__title-id-${ID}`);
	HEADER_CATEGORY.setAttribute('id', `header__category-id-${ID}`);
	TITLE_CATEGORY.innerHTML = (IS_THERE_SPACE)
		? NAME.replace('%20', '&nbsp')
		: NAME;
	setGenericMoviesList(MOVIES, false);
};

const moviePage = () => {
	console.log('MOVIE');
	HEADER_MAIN.classList.add('hidden');
	TRENDING_PREVIEW.classList.add('hidden');
	CATEGORIES_CONTAINER.classList.add('hidden');
	HEADER_CATEGORY.classList.add('hidden');
	GENERIC_LIST.classList.add('hidden');

	SIMILAR_MOVIES.classList.remove('hidden');
	MOVIE_DETAILS.classList.remove('hidden');
	HEADER_TITLE.classList.remove('hidden');
};

const searchPage = async () => {
	TRENDING_PREVIEW.classList.add('hidden');
	CATEGORIES_CONTAINER.classList.add('hidden');
	HEADER_CATEGORY.classList.add('hidden');
	SIMILAR_MOVIES.classList.add('hidden');
	MOVIE_DETAILS.classList.add('hidden');
	HEADER_TITLE.classList.add('hidden');

	HEADER_MAIN.classList.remove('hidden');
	GENERIC_LIST.classList.remove('hidden');

	const [ HASH_NAME, QUERY ] = location.hash.split('=');
	const MOVIES = await getMovieBySearch(QUERY);

	setGenericMoviesList(MOVIES, false);
};

const trendsPage = async () => {
	console.log('TRENDS');
	HEADER_MAIN.classList.add('hidden');
	TRENDING_PREVIEW.classList.add('hidden');
	CATEGORIES_CONTAINER.classList.add('hidden');
	SIMILAR_MOVIES.classList.add('hidden');
	MOVIE_DETAILS.classList.add('hidden');
	HEADER_TITLE.classList.add('hidden');

	HEADER_CATEGORY.classList.remove('hidden');
	GENERIC_LIST.classList.remove('hidden');

	TITLE_CATEGORY.innerText = 'Tendencias';
	HEADER_CATEGORY.setAttribute('id', `header__category-id-28`);
	TITLE_CATEGORY.setAttribute('id', `category-movie__title-id-28`);

	const MOVIES = await getTrendingMoviesPreview();

	setGenericMoviesList(MOVIES, false);
};

const goBackButton = () => {
	const IS_HASH_HOME = location.hash !== '#home';
	const IS_LAST_NOT_HOME = ARRAY_HASHES.at(-1) !== '#home';

	if (IS_HASH_HOME) ARRAY_HASHES.pop();

	location.hash = (IS_LAST_NOT_HOME)
		? `${ARRAY_HASHES.at(-1)}`
		: '#home';
};

const addHash = () => {
	const IS_REPEAT = ARRAY_HASHES.some((hash) => location.hash === hash);

	if (!IS_REPEAT)
		ARRAY_HASHES.push(location.hash);
};

const goSearchSection = (event: Event) => {
	event.preventDefault();

	const SEARCH = SEARCH_INPUT.value;

	location.hash = `#search=${SEARCH}`;
};

BUTTON_TREADING.addEventListener('click', () => {
	location.hash = '#trends';
});

BUTTON_SEARCH.addEventListener('click', goSearchSection);

for (const BUTTON of BUTTONS_GO_BACK) {
	BUTTON.addEventListener('click', goBackButton);
}

const ARRAY_HASHES = [ '#home', location.hash ];

window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', addHash, false);
window.addEventListener('hashchange', navigator, false);
