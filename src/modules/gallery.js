export function renderImages(gallery, images) {
    images.forEach(imgData => {
        const img = document.createElement('img');
        img.src = `https://picsum.photos/id/${imgData.id}/300/200`;
        img.alt = `Photo by ${imgData.author}`;
        img.classList.add('gallery-item');
        gallery.appendChild(img);
    });
}

export function clearGallery(gallery) {
    gallery.innerHTML = '';
}

export function removeLastImage(gallery) {
    const lastImg = gallery.lastElementChild;

    if (lastImg) {
        lastImg.remove();
    } else {
        alert("Галерея вже порожня!");
    }
}

export function reverseGallery(gallery) {
    const imagesArray = Array.from(gallery.children);

    if (imagesArray.length === 0) return;

    gallery.innerHTML = '';

    imagesArray.reverse().forEach(img => {
        gallery.appendChild(img);
    });
}
