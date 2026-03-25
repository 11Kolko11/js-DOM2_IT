import { fetchImages } from './modules/api.js';
import { renderImages } from './modules/gallery.js';
import { initializeEventListeners } from './modules/events.js';

const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');
const clearBtn = document.getElementById('clear-gallery');
const removeLastBtn = document.getElementById('remove-last');
const reverseBtn = document.getElementById('reverse-gallery');

let currentPage = 1;

async function loadImages() {
    try {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'Завантаження...';

        const data = await fetchImages(currentPage);
        renderImages(gallery, data);
        currentPage++;
    } catch (error) {
        console.error("Сталася помилка:", error);
        alert("Не вдалося завантажити зображення. Перевірте консоль.");
    } finally {
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'Завантажити ще';
    }
}

function resetPage() {
    currentPage = 1;
}

initializeEventListeners({
    loadMoreBtn,
    clearBtn,
    removeLastBtn,
    reverseBtn,
    onLoadMore: loadImages,
    gallery,
    resetPage
});

document.addEventListener('DOMContentLoaded', loadImages);
