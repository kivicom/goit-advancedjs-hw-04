import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImagesMarkup } from './js/render-functions';
import { searchImages } from './js/pixabay-api';
import { displayError } from './js/toast';

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.getElementById('searchPhoto'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.getElementById('loadMore'),
  endMessage: document.getElementById('endMessage'),
};

let query = '';
let page = 1;
let lightbox;

refs.searchForm.addEventListener('submit', handleSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleSearchFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  query = form.elements.q.value.trim();

  if (!query) {
    displayError('Please enter a search query');
    return;
  }

  page = 1;
  refs.loader.classList.remove('loader-off');
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('loader-off');
  refs.endMessage.classList.add('loader-off');

  try {
    const images = await searchImages(query, page);

    if (images.totalHits === 0) {
      displayError('No images found for this query');
      refs.loader.classList.add('loader-off');
      return;
    }

    renderImages(images);

    // Показываем кнопку "Load More" только если есть еще изображения
    if (images.hits.length < images.totalHits) {
      refs.loadMoreBtn.classList.remove('loader-off');
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    displayError('Failed to load images');
  } finally {
    refs.loader.classList.add('loader-off');
    form.reset();
  }
}

function smoothScroll() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function loadMoreImages() {
  page += 1;
  refs.loader.classList.remove('loader-off');

  try {
    const images = await searchImages(query, page);
    renderImages(images);

    // Scrolling after adding new images
    smoothScroll();

    // hide the "Load More" button when the end of images is reached
    if (refs.gallery.childElementCount >= images.totalHits) {
      refs.loadMoreBtn.classList.add('loader-off');
      refs.endMessage.classList.remove('loader-off');
    }
  } catch (error) {
    console.error('Error loading more images:', error);
    displayError('Failed to load more images');
  } finally {
    refs.loader.classList.add('loader-off');
  }
}

// Функция для отрисовки изображений и обновления lightbox
function renderImages(images) {
  const imagesMarkup = getImagesMarkup(images);
  refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup);

  // Создаём или обновляем lightbox
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}
