const mainButton = document.getElementById('main');
const mallingButton = document.getElementById('malling');
    
// Добавляем обработчики событий для кнопок
if (mainButton) {
    mainButton.addEventListener('click', function() {
        window.location.href = 'index.php';
    });
}

if (mallingButton) {
    mallingButton.addEventListener('click', function() {
        window.location.href = 'mailing.php';
    });
}