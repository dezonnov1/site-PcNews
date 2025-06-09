document.addEventListener('DOMContentLoaded', function() {
    const paginationContainer = document.querySelector('.pagination');
    const cardsContainer = document.getElementById('cards-container');
    const itemsPerPage = 6; // Количество статей на странице
    let currentPage = 1;
    let totalArticles = 0;
    let currentTag = null;

    // Инициализация пагинации
    function initPagination() {
        const urlParams = new URLSearchParams(window.location.search);
        currentPage = parseInt(urlParams.get('page')) || 1;
        currentTag = urlParams.get('tag');
        
        loadArticlesCount();
    }

    // Загрузка общего количества статей
    async function loadArticlesCount() {
        try {
            let url = '/api/articles_count.php';
            if (currentTag) {
                url += `?tag=${encodeURIComponent(currentTag)}`;
            }
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('Ошибка сервера');
            
            const data = await response.json();
            totalArticles = data.total;
            
            renderPagination();
            loadArticles();
        } catch (error) {
            console.error('Ошибка:', error);
            cardsContainer.innerHTML = '<p class="error-message">Ошибка загрузки данных</p>';
        }
    }

    // Загрузка статей для текущей страницы
    async function loadArticles() {
        try {
            let url = `/api/articles.php?page=${currentPage}&limit=${itemsPerPage}`;
            if (currentTag) {
                url += `&tag=${encodeURIComponent(currentTag)}`;
            }
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('Ошибка сервера');
            
            const articles = await response.json();
            
            renderArticles(articles);
            updatePaginationButtons();
        } catch (error) {
            console.error('Ошибка:', error);
            cardsContainer.innerHTML = '<p class="error-message">Ошибка загрузки статей</p>';
        }
    }

    // Отрисовка статей
    function renderArticles(articles) {
        if (articles.length === 0) {
            cardsContainer.innerHTML = '<p class="no-articles">Нет статей для отображения</p>';
            return;
        }
        
        cardsContainer.innerHTML = articles.map(article => `
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
        `).join('');
    }

    // Отрисовка пагинации
    function renderPagination() {
        const totalPages = Math.ceil(totalArticles / itemsPerPage);
        
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }
        
        paginationContainer.style.display = 'flex';
        paginationContainer.innerHTML = '';
        
        // Кнопка "Назад"
        const prevButton = createPaginationButton('«', 'prev', currentPage === 1);
        paginationContainer.appendChild(prevButton);
        
        // Нумерация страниц
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        if (startPage > 1) {
            paginationContainer.appendChild(createPaginationButton('1', 1));
            if (startPage > 2) {
                paginationContainer.appendChild(createPaginationButton('...', 'ellipsis', true));
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationContainer.appendChild(createPaginationButton(i, i, i === currentPage));
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationContainer.appendChild(createPaginationButton('...', 'ellipsis', true));
            }
            paginationContainer.appendChild(createPaginationButton(totalPages, totalPages));
        }
        
        // Кнопка "Вперед"
        const nextButton = createPaginationButton('»', 'next', currentPage === totalPages);
        paginationContainer.appendChild(nextButton);
    }

    // Создание кнопки пагинации
    function createPaginationButton(text, value, isDisabled = false) {
        const button = document.createElement('button');
        button.textContent = text;
        button.dataset.page = value;
        
        if (isDisabled) {
            button.disabled = true;
            button.classList.add('disabled');
        }
        
        if (value === currentPage && !['prev', 'next', 'ellipsis'].includes(value)) {
            button.classList.add('active');
        }
        
        button.addEventListener('click', function() {
            if (this.disabled) return;
            
            if (value === 'prev') {
                goToPage(currentPage - 1);
            } else if (value === 'next') {
                goToPage(currentPage + 1);
            } else if (!isNaN(value)) {
                goToPage(parseInt(value));
            }
        });
        
        return button;
    }

    // Переход на страницу
    function goToPage(page) {
        currentPage = page;
        updateUrl();
        loadArticles();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Обновление URL
    function updateUrl() {
        const url = new URL(window.location);
        url.searchParams.set('page', currentPage);
        
        if (currentTag) {
            url.searchParams.set('tag', currentTag);
        } else {
            url.searchParams.delete('tag');
        }
        
        history.pushState({}, '', url.toString());
    }

    // Обновление состояния кнопок
    function updatePaginationButtons() {
        const buttons = paginationContainer.querySelectorAll('button');
        buttons.forEach(button => {
            const pageValue = button.dataset.page;
            
            button.classList.remove('active');
            button.disabled = false;
            button.classList.remove('disabled');
            
            if (!isNaN(pageValue) && parseInt(pageValue) === currentPage) {
                button.classList.add('active');
            }
            
            if ((pageValue === 'prev' && currentPage === 1) || 
                (pageValue === 'next' && currentPage === Math.ceil(totalArticles / itemsPerPage))) {
                button.disabled = true;
                button.classList.add('disabled');
            }
        });
    }

    // Форматирование даты
    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('ru-RU', options).replace(',', '');
    }

    // Обработка изменения URL (навигация вперед/назад)
    window.addEventListener('popstate', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const newPage = parseInt(urlParams.get('page')) || 1;
        const newTag = urlParams.get('tag');
        
        if (newPage !== currentPage || newTag !== currentTag) {
            currentPage = newPage;
            currentTag = newTag;
            loadArticlesCount();
        }
    });

    // Инициализация
    initPagination();
    
    // Для интеграции с фильтрацией по тегам
    window.filterArticlesByTag = function(tag) {
        currentTag = tag;
        currentPage = 1;
        loadArticlesCount();
    };
});