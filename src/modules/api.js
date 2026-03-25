export const limit = 4;

export async function fetchImages(page) {
    const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);

    if (!response.ok) {
        throw new Error(`HTTP помилка! Статус: ${response.status}`);
    }

    return await response.json();
}
