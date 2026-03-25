import { clearGallery, removeLastImage, reverseGallery } from './gallery.js';

export function initializeEventListeners({
    loadMoreBtn,
    clearBtn,
    removeLastBtn,
    reverseBtn,
    onLoadMore,
    gallery,
    resetPage
}) {
    loadMoreBtn.addEventListener('click', onLoadMore);

    clearBtn.addEventListener('click', () => {
        clearGallery(gallery);
        resetPage();
    });

    removeLastBtn.addEventListener('click', () => {
        removeLastImage(gallery);
    });

    reverseBtn.addEventListener('click', () => {
        reverseGallery(gallery);
    });
}
