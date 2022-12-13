/* eslint-disable padding-line-between-statements */
const $ = (id: string) => document.querySelector(id);
const $$ = (id: string) => document.querySelectorAll(id);

// Header
export const HEADER_MAIN = $('#header__main-id') as HTMLElement;
export const HEADER_TITLE = $('#header__title-id') as HTMLHeadingElement;
export const HEADER_CATEGORY = $('#header__category-id') as HTMLElement;
export const SEARCH_FORM = $('#header__search-form') as HTMLFormElement;
export const TITLE_CATEGORY = $('#category-movie__title') as HTMLHeadingElement;
export const BUTTON_SEARCH = $('#header__button-search-id') as HTMLButtonElement;
export const BUTTONS_HOME = Array.from($$('.header__arrow-left')) as HTMLButtonElement[];

// Trending preview
export const TRENDING_PREVIEW = $('#main__trending-preview-id') as HTMLElement;
export const CAROUSEL_CONTAINER = $('#main__carousel-container-id') as HTMLDivElement;
export const BUTTON_TREADING = $('#trending-preview-header__button-id') as HTMLButtonElement;

// Categories section
export const CATEGORIES_CONTAINER = $('#main__categories-id') as HTMLElement;

// Movie details section
export const MOVIE_DETAILS = $('#main__movie-details-id') as HTMLElement;

// Similar movies
export const SIMILAR_MOVIES = $('#main__similar-movies-id') as HTMLElement;

// Generic carousel movies
export const GENERIC_LIST = $('#main__generic-list-id') as HTMLElement;

