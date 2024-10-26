import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function displayError(
  message = `Sorry, there are no images matching your search query. Please try again!`
) {
  iziToast.error({
    message,
    position: 'topRight',
  });
}

export { displayError };
