// scripts/sidebarTags.js
document.addEventListener('DOMContentLoaded', function() {
    const sidebarButtons = document.querySelectorAll('.sidebar button');
    const currentUrl = new URL(window.location.href);
    const currentTag = currentUrl.searchParams.get('tag');

    // Подсветка активной кнопки при загрузке страницы
    function setActiveButton() {
        // Сначала убираем активный класс у всех кнопок
        sidebarButtons.forEach(btn => btn.classList.remove('active'));
        
        // Если есть тег в URL - находим соответствующую кнопку и делаем её активной
        if (currentTag) {
            const activeButton = document.getElementById(currentTag);
            if (activeButton) {
                activeButton.classList.add('active');
            }
        }
    }

    // Инициализация при загрузке
    setActiveButton();

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
            
            // Обновляем активную кнопку
            setActiveButton();
            
            // Здесь добавить загрузку данных по выбранному тегу
            loadArticlesByTag(newUrl.searchParams.get('tag'));
        });
    });

    // Функция для загрузки статей (нужно реализовать)
    function loadArticlesByTag(tag) {
        console.log('Загрузка статей для тега:', tag);
    }
});