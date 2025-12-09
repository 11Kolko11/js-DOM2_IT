// Отримуємо посилання на елементи DOM за їхніми ID
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');
const clearBtn = document.getElementById('clear-gallery');
const removeLastBtn = document.getElementById('remove-last');
const reverseBtn = document.getElementById('reverse-gallery');

// Номер поточної сторінки для API
let currentPage = 1; 
// Кількість зображень, що завантажуються за один запит
const limit = 4;    

// Асинхронна функція для отримання зображень з API
async function fetchImages() {
    try {
        // Тимчасово блокуємо кнопку та змінюємо текст, щоб показати стан завантаження
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'Завантаження...';

        // Запит до API Lorem Picsum з параметрами сторінки та ліміту
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${limit}`);

        // Якщо сервер повернув помилковий статус – кидаємо виключення
        if (!response.ok) {
            throw new Error(`HTTP помилка! Статус: ${response.status}`);
        }

        // Перетворюємо відповідь у формат JSON
        const data = await response.json();
        
        // Відображаємо зображення на сторінці
        renderImages(data);
        
        // Переходимо до наступної сторінки, щоб при наступному виклику отримати інші картинки
        currentPage++;

    } catch (error) {
        // Логування помилки в консоль та показ повідомлення користувачу
        console.error("Сталася помилка:", error);
        alert("Не вдалося завантажити зображення. Перевірте консоль.");
    } finally {
        // У будь-якому випадку (успіх/помилка) розблоковуємо кнопку та повертаємо текст
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'Завантажити ще';
    }
}

// Функція для створення та додавання зображень у галерею
function renderImages(images) {
    images.forEach(imgData => {
        // Створюємо елемент <img>
        const img = document.createElement('img');

        // Шлях до зображення з використанням id з API та фіксованими розмірами
        img.src = `https://picsum.photos/id/${imgData.id}/300/200`; 
        img.alt = `Photo by ${imgData.author}`;
        img.classList.add('gallery-item');

        // Додаємо зображення в контейнер галереї
        gallery.appendChild(img);
    });
}

// Обробник кліку по кнопці "Завантажити ще"
loadMoreBtn.addEventListener('click', fetchImages);

// Обробник кліку по кнопці "Очистити галерею"
clearBtn.addEventListener('click', () => {
    // Видаляємо весь HTML-контент галереї
    gallery.innerHTML = ''; 
    // Скидаємо номер сторінки, щоб після очистки почати з першої
    currentPage = 1;  
});

// Обробник кліку по кнопці "Видалити останню"
removeLastBtn.addEventListener('click', () => {
    // Беремо останній дочірній елемент в галереї
    const lastImg = gallery.lastElementChild;
    if (lastImg) {
        // Якщо елемент є – видаляємо його
        lastImg.remove();
    } else {
        // Якщо галерея порожня – показуємо повідомлення
        alert("Галерея вже порожня!");
    }
});

// Обробник кліку по кнопці "Перевернути"
reverseBtn.addEventListener('click', () => {

    // Перетворюємо HTML-колекцію дітей галереї в масив
    const imagesArray = Array.from(gallery.children);
    
    // Якщо немає зображень – просто виходимо з функції
    if (imagesArray.length === 0) return;

    // Очищаємо галерею перед повторним додаванням
    gallery.innerHTML = '';

    // Перевертаємо порядок елементів і додаємо їх знову
    imagesArray.reverse().forEach(img => {
        gallery.appendChild(img);
    });
});

// При повному завантаженні DOM автоматично підвантажуємо першу порцію зображень
document.addEventListener('DOMContentLoaded', fetchImages);
