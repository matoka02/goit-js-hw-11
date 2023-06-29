import { SimpleLightbox } from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";

import { fetchImages } from "./js/fetchImages";


const input = document.querySelector('.search-form-input');
const buttonSearch = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

let gallerySimpleLightbox = new SimpleLightbox('.gallery a');



buttonLoadMore.style.display = 'none';

let pageNumber = 1;

buttonSearch.addEventListener('click', onSearch(evt));


function onSearch(evt) {
    evt.preventDefault();

    gallery.innerHTML = '';
    pageNumber = 1;
    buttonLoadMore.style.display = 'none';

    const trimmeValue = input.value.trim();
    if (trimmeValue !== '') {
        fetchImages(trimmeValue, pageNumber).then(foundData => {
            if (foundData.hits.length === 0) {
                alert(`We're sorry, but you've reached the end of search results.`)
            } else {
                renderImageList(foundData.hits);
                alert(`Hooray! We found ${foundData.totalHits} images.`);
                buttonLoadMore.style.display = 'block';
                gallerySimpleLightbox.refresh();
            };
        });
    };
};

buttonLoadMore.addEventListener('click', onLoad(evt));

function onLoad(evt) {
    pageNumber += 1;

    buttonLoadMore.style.display = 'none';

    const trimmeValue = input.value.trim();

    if (trimmeValue !== '') {
        fetchImages(trimmeValue, pageNumber).then(foundData => {
            if (foundData.hits.length === 0) {
                alert(`We're sorry, but you've reached the end of search results.`)
            } else {
                renderImageList(foundData.hits);
                alert(`Hooray! We found ${foundData.totalHits} images.`);
                buttonLoadMore.style.display = 'block';
                gallerySimpleLightbox.refresh();
            };
        });
    };
};


function renderImageList(images) {
    console.log(images);
    const markup = images
    .map(image => {
        console.log('img', image);
        return `<div class="photo-card">
        <a href="${image.largeImageURL}">
            <img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/>
        </a>
        <div class="info">
            <p class="info-item">
            <b>Likes</b> 
            <span class="info-item-api"> ${image.likes} </span>
            </p>
            <p class="info-item">
                <b>Views</b> <span class="info-item-api">${image.views}</span>  
            </p>
            <p class="info-item">
                <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
            </p>
            <p class="info-item">
                <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
            </p>
        </div>
    </div>`;
    })
    .join('');
    gallery.innerHTML += markup;
}


