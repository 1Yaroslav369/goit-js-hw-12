import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      image => `
          <li class="gallery-item">
          <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
          <div class="info">
          <p>👍 ${image.likes}</p>
          <p>👁️ ${image.views}</p>
          <p>💬 ${image.comments}</p>
          <p>⬇️ ${image.downloads}</p>
          </div>
          </li>
          `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);

  const imagesInGallery = galleryContainer.querySelectorAll('img');
  const promises = Array.from(imagesInGallery).map(img => {
    return new Promise(resolve => {
      if (img.complete) resolve();
      else {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }
    });
  });

  Promise.all(promises).then(() => {
    lightbox.refresh();
    hideLoader();
  });
}
export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
