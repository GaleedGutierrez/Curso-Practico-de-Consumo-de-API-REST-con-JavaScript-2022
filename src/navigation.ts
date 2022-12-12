const navegador = () => {
	console.log({ location });

	const HASHES = {
		'#trends'    : () => trendsPage(),
		'#search='   : () => searchPage(),
		'#movie='    : () => moviePage(),
		'#category=' : () => categoryPage(),
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
};

const categoryPage = () => {
	console.log('CATEGORY 37');
};

const moviePage = () => {
	console.log('MOVIE');
};

const searchPage = () => {
	console.log('SEARCH');
};

const trendsPage = () => {
	console.log('TRENDS');
};

window.addEventListener('load', navegador, false);
window.addEventListener('hashchange', navegador, false);
