// scripts/sidebarTags.js
document.addEventListener('DOMContentLoaded', function() {
    const sidebarButtons = document.querySelectorAll('.sidebar button');
    const currentUrl = new URL(window.location.href);
    const currentTag = currentUrl.searchParams.get('tag');
    const articleCards = document.querySelectorAll('.article-card'); // Предполагаем, что карточки имеют класс article-card

    // Подсветка активной кнопки и фильтрация карточек при загрузке страницы
    function setActiveButtonAndFilter() {
        // Сначала убираем активный класс у всех кнопок
        sidebarButtons.forEach(btn => btn.classList.remove('active'));
        
        // Показываем все карточки, если нет активного тега
        if (!currentTag) {
            articleCards.forEach(card => card.style.display = '');
            return;
        }
        
        // Если есть тег в URL - находим соответствующую кнопку и делаем её активной
        const activeButton = document.getElementById(currentTag);
        if (activeButton) {
            activeButton.classList.add('active');
            filterArticlesByTag(currentTag);
        }
    }

    // Функция фильтрации карточек по тегу
    function filterArticlesByTag(tag) {
        articleCards.forEach(card => {
            // Предполагаем, что теги карточки хранятся в data-атрибуте, например data-tags
            const cardTags = card.dataset.tags ? card.dataset.tags.split(' ') : [];
            
            if (tag === 'all' || cardTags.includes(tag)) {
                card.style.display = ''; // Показываем карточку
            } else {
                card.style.display = 'none'; // Скрываем карточку
            }
        });
    }

    // Инициализация при загрузке
    setActiveButtonAndFilter();

    // Обработка кликов по кнопкам
    sidebarButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tagId = this.id;
            const newUrl = new URL(window.location.href);
            
            // Удаляем все параметры tag (на случай, если их несколько)
            newUrl.searchParams.delete('tag');
            
            // Если нажата неактивная кнопка - добавляем её тег
            if (!this.classList.contains('active')) {
                newUrl.searchParams.set('tag', tagId);
            }
            
            // Обновляем URL без перезагрузки страницы
            history.pushState({}, '', newUrl.toString());
            
            // Обновляем активную кнопку и фильтруем карточки
            setActiveButtonAndFilter();
        });
    });
});