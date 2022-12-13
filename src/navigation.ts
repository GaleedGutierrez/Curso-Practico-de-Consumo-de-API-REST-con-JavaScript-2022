import { setCategory, setImgTrending } from './index.js';
import { BUTTONS_HOME, BUTTON_SEARCH, BUTTON_TREADING, CATEGORIES_CONTAINER, GENERIC_LIST, HEADER_CATEGORY, HEADER_MAIN, HEADER_TITLE, MOVIE_DETAILS, SIMILAR_MOVIES, TRENDING_PREVIEW } from './nodes.mjs';

const navegador = () => {
	console.log({ location });

	const HASHES = {
		'#trends'    : trendsPage,
		'#search='   : searchPage,
		'#movie='    : moviePage,
		'#category=' : categoryPage,
	};

	for (const KEY of Object.keys(HASHES)) {
		if (location.hash.startsWith(KEY)) {
			HASHES[KEY as keyof typeof HASHES]();

			return;
		}
	}

	homePage();
};

const homePage = () => {
	console.log('HOME');
	HEADER_CATEGORY.classList.add('hidden');
	MOVIE_DETAILS.classList.add('hidden');
	SIMILAR_MOVIES.classList.add('hidden');
	GENERIC_LIST.classList.add('hidden');

	HEADER_MAIN.classList.remove('hidden');
	TRENDING_PREVIEW.classList.remove('hidden');
	CATEGORIES_CONTAINER.classList.remove('hidden');
	HEADER_TITLE.classList.remove('hidden');
};

const categoryPage = () => {
	console.log('CATEGORY 37');
	HEADER_MAIN.classList.add('hidden');
	MOVIE_DETAILS.classList.add('hidden');
	SIMILAR_MOVIES.classList.add('hidden');
	TRENDING_PREVIEW.classList.add('hidden');
	CATEGORIES_CONTAINER.classList.add('hidden');

	HEADER_CATEGORY.classList.remove('hidden');
	GENERIC_LIST.classList.remove('hidden');
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

const searchPage = () => {
	TRENDING_PREVIEW.classList.add('hidden');
	CATEGORIES_CONTAINER.classList.add('hidden');
	HEADER_CATEGORY.classList.add('hidden');
	SIMILAR_MOVIES.classList.add('hidden');
	MOVIE_DETAILS.classList.add('hidden');
	HEADER_TITLE.classList.add('hidden');

	HEADER_MAIN.classList.remove('hidden');
	GENERIC_LIST.classList.remove('hidden');
};

const trendsPage = () => {
	console.log('TRENDS');
	HEADER_MAIN.classList.add('hidden');
	TRENDING_PREVIEW.classList.add('hidden');
	CATEGORIES_CONTAINER.classList.add('hidden');
	SIMILAR_MOVIES.classList.add('hidden');
	MOVIE_DETAILS.classList.add('hidden');
	HEADER_TITLE.classList.add('hidden');

	HEADER_CATEGORY.classList.remove('hidden');
	GENERIC_LIST.classList.remove('hidden');
};

window.addEventListener('load', navegador, false);
window.addEventListener('hashchange', navegador, false);

BUTTON_TREADING.addEventListener('click', () => {
	location.hash = '#trends';
});

BUTTON_SEARCH.addEventListener('click', () => {
	location.hash = '#search=';
});

for (const BUTTON of BUTTONS_HOME) {
	BUTTON.addEventListener('click', () => {
		location.hash = '#home';
	});
}
