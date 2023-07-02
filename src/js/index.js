import { fetchImages } from '../js/fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-form-input');
const buttonSearch = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

// нужно для SimpleLightbox
// const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//     top: cardHeight * 2,

//     behavior: 'smooth',
// });

buttonLoadMore.style.display = 'none';

let pageNumber = 1;

buttonSearch.addEventListener('click', (evt) => {
    evt.preventDefault();
    cleanGallery();

    const inputValue = input.value.trim();
    console.log(typeof inputValue);         // string

    if (inputValue !== '') {
        fetchImages(inputValue, pageNumber).then(foundData => {
            if (foundData.hits.length === 0) {
                Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
            } else {
                // console.log(typeof foundData);       // object
                createMarkup(foundData.hits);
                Notiflix.Notify.success(`Hooray! We found ${foundData.totalHits} images.`);
                buttonLoadMore.style.display = 'block';
                gallerySimpleLightbox.refresh();
            }
        });
    }
});


buttonLoadMore.addEventListener('click', (evt) => {
    pageNumber+=1;
    buttonLoadMore.style.display = 'none';

    const inputValue = input.value.trim();

    fetchImages(inputValue, pageNumber).then(foundData => {
        if (foundData.hits.length === 0) {
            Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        } else {
            createMarkup(foundData.hits);
            Notiflix.Notify.success(`Hooray! We found ${foundData.totalHits} images.`);
            buttonLoadMore.style.display = 'block';
        }
    });
});

function createMarkup(images) {
    console.log(images);
    const markup = images.map(image => {
            console.log(image);
            return `<div class="photo-card">
                <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>
                <div class="info">
                    <p class="info-item"><b>Likes</b> <span class="info-item-api">${image.likes}</span></p>
                    <p class="info-item"><b>Views</b> <span class="info-item-api">${image.views}</span></p>
                    <p class="info-item"><b>Comments</b> <span class="info-item-api">${image.comments}</span></p>
                    <p class="info-item"><b>Downloads</b> <span class="info-item-api">${image.downloads}</span></p>
                </div>
            </div>`;
        })
        .join('');
    gallery.innerHTML += markup;
};

function cleanGallery() {
    gallery.innerHTML = '';
    pageNumber = 1;
    buttonLoadMore.style.display = 'none';
};