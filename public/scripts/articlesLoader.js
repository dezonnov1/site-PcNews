document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.getElementById('cards-container');
    const apiUrl = '/api/articles.php'; // Путь к API на вашем сервере

    // Функция форматирования даты
    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('ru-RU', options).replace(',', '');
    }

    // Создание HTML карточки
    function createArticleCard(article) {
        return `
            <button class="card" data-id="${article.id}">
                <div class="card-image">
                    <img src="/uploads/${article.image}" alt="${article.title}">
                </div>
                <div class="card-content">
                    <h2 class="card-title">${article.title}</h2>
                    <p class="card-text">${article.short_text}</p>
                    <div class="card-footer">
                        <span class="card-tags">${article.tag_name}</span>
                        <span class="card-date">${formatDate(article.published_at)}</span>
                    </div>
                </div>
            </button>
        `;
    }

    // Загрузка статей с сервера
    async function loadArticles(tag = null) {
        try {
            const url = tag ? `${apiUrl}?tag=${encodeURIComponent(tag)}` : apiUrl;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error('Ошибка сервера');
            
            const articles = await response.json();
            
            cardsContainer.innerHTML = articles.length > 0 
                ? articles.map(createArticleCard).join('')
                : '<p class="no-articles">Нет статей по выбранному тегу</p>';
                
        } catch (error) {
            console.error('Ошибка:', error);
            cardsContainer.innerHTML = '<p class="error-message">Ошибка загрузки статей</p>';
        }
    }

    // Инициализация
    const urlParams = new URLSearchParams(window.location.search);
    loadArticles(urlParams.get('tag'));

    // Для интеграции с фильтрацией
    window.filterArticlesByTag = loadArticles;
});