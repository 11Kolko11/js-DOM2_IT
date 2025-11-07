const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');
const clearBtn = document.getElementById('clear-gallery');
const removeLastBtn = document.getElementById('remove-last');
const reverseBtn = document.getElementById('reverse-gallery');

let currentPage = 1;
const limit = 4;

async function fetchImages() {
    try {
        const originalBtnText = loadMoreBtn.innerText;
        loadMoreBtn.innerText = '[ ЗАВАНТАЖЕННЯ... ]';
        loadMoreBtn.disabled = true;

        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${limit}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        renderImages(data);
        currentPage++;

    } catch (error) {
        console.error("Помилка:", error);
        alert("[ ПОМИЛКА: З'ЄДНАННЯ ВТРАЧЕНО ]");
    } finally {
        loadMoreBtn.innerText = originalBtnText;
        loadMoreBtn.disabled = false;
    }
}

function renderImages(imagesData) {
    imagesData.forEach(imgData => {
        const img = document.createElement('img');
        img.src = `https://picsum.photos/id/${imgData.id}/300/200`;
        img.alt = `ЗОБРАЖЕННЯ_${imgData.author.toUpperCase()}`;
        img.classList.add('gallery-item');
        gallery.appendChild(img);
    });
}

loadMoreBtn.addEventListener('click', fetchImages);

clearBtn.addEventListener('click', () => {
    gallery.innerHTML = '';
});

removeLastBtn.addEventListener('click', () => {
    if (gallery.lastElementChild) {
        gallery.lastElementChild.remove();
    } else {
        alert("[ УВАГА: АРХІВ ПОРОЖНІЙ ]");
    }
});

reverseBtn.addEventListener('click', () => {
    const imagesArray = Array.from(gallery.children);
    if (imagesArray.length === 0) return;
    imagesArray.reverse().forEach(img => gallery.appendChild(img));
});

document.addEventListener('DOMContentLoaded', fetchImages);