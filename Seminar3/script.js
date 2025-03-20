document.addEventListener('DOMContentLoaded', function() {
    const productNameInput = document.getElementById('product-name');
    const reviewTextInput = document.getElementById('review-text');
    const addReviewBtn = document.getElementById('add-review-btn');
    const productsList = document.getElementById('products-list');
    const reviewsContainer = document.getElementById('reviews-container');

    // Загрузка отзывов из LocalStorage
    let reviews = JSON.parse(localStorage.getItem('reviews')) || {};

    // Функция для сохранения отзывов в LocalStorage
    function saveReviews() {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    // Функция для добавления отзыва
    function addReview() {
        const productName = productNameInput.value.trim();
        const reviewText = reviewTextInput.value.trim();

        if (productName && reviewText) {
            if (!reviews[productName]) {
                reviews[productName] = [];
            }
            reviews[productName].push(reviewText);
            saveReviews();
            productNameInput.value = '';
            reviewTextInput.value = '';
            updateProductsList();
        }
    }

    // Функция для обновления списка продуктов
    function updateProductsList() {
        productsList.innerHTML = '';
        for (const product in reviews) {
            const li = document.createElement('li');
            li.textContent = product;
            li.addEventListener('click', () => showReviews(product));
            productsList.appendChild(li);
        }
    }

    // Функция для отображения отзывов по продукту
    function showReviews(product) {
        reviewsContainer.innerHTML = '';
        reviews[product].forEach((review, index) => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.textContent = review;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Удалить';
            deleteBtn.addEventListener('click', () => deleteReview(product, index));
            reviewItem.appendChild(deleteBtn);
            reviewsContainer.appendChild(reviewItem);
        });
    }

    // Функция для удаления отзыва
    function deleteReview(product, index) {
        reviews[product].splice(index, 1);
        if (reviews[product].length === 0) {
            delete reviews[product];
        }
        saveReviews();
        updateProductsList();
        reviewsContainer.innerHTML = '';
    }

    // Обработчик события для кнопки "Добавить отзыв"
    addReviewBtn.addEventListener('click', addReview);

    // Инициализация списка продуктов при загрузке страницы
    updateProductsList();
});