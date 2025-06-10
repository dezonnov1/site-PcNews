<?php
include 'scripts/script.php';

// Если в URL указан тег, фильтруем
$tag = isset($_GET['tag']) ? trim($_GET['tag']) : '';

// Получаем статьи
$articles = getArticles($pdo, $tag);
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap" rel="stylesheet">
    <title>PC NEWS новости в мире hardware</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <div class="grid-container">
        <header class="header">
            <div class="logo-container">
                <img src="./icons/logo.svg" alt="PC NEWS Logo" class="logo">
            </div>
            <!-- для переключения между новостями и формой для рассылки -->
            <nav class="nav-buttons">
                <button id="main">Главная</button>
                <button id="malling">Рассылка</button>
            </nav>
        </header>
        <!-- side bar для выбора тега -->
        <aside class="sidebar">
            <button id="cpu">Процессоры</button>
            <button id="gpu">Видеокарты</button>
            <button id="ram">Оперативная память</button>
            <button id="mb">Материнские платы</button>
            <button id="drive">Накопители</button>
            <button id="psu">Блоки питания</button>
            <button id="case">Корпусы</button>
            <button id="cooler">Охлаждение</button>
        </aside>
    
        <main class="main">
            <div id="cards-container">
                <?php if ($articles): ?>
                    <?php foreach ($articles as $article): ?>
                        <button class="card" onclick="location.href='article.php?id=<?= $article['id'] ?>'">
                            <div class="card-image">
                                <?php if ($article['image']): ?>
                                    <img src="<?= htmlspecialchars($article['image']) ?>" alt="Изображение">
                                <?php endif; ?>
                            </div>
                            <div class="card-content">
                                <h2 class="card-title"><?= htmlspecialchars($article['title']) ?></h2>
                                <p class="card-text"><?= nl2br(htmlspecialchars($article['text'])) ?></p>
                                <div class="card-footer">
                                    <span class="card-tags"><?= htmlspecialchars($article['tag']) ?></span>
                                    <span class="card-date"><?= htmlspecialchars($article['date']) ?></span>
                                </div>
                            </div>
                        </button>
                    <?php endforeach; ?>    
                <?php else: ?>
                    <p>Статей не найдено.</p>
                <?php endif; ?>
            </div>
        </main>
    
        <footer class="footer">
            <div class="author-info">
                Сделал студент ИТСС-О-23\1<br>Кузнецов Даниил
            </div>
        </footer>
    </div>
    <script src="./scripts/navigation.js"></script>
    <script src="./scripts/tags.js"></script>
</body>
</html>
