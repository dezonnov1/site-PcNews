<?php
include 'scripts/script.php';

// Получаем ID статьи из URL
$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

if ($id) {
    $stmt = $pdo->prepare("SELECT * FROM articles WHERE id = ?");
    $stmt->execute([$id]);
    $article = $stmt->fetch(PDO::FETCH_ASSOC);
} else {
    $article = null;
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap" rel="stylesheet">
    <title>PC NEWS новости в мире hardware</title>
    <link rel="stylesheet" href="article.css">
</head>
<body>
    <div class="grid-container">
        <header class="header">
            <div class="logo-container">
                <img src="./icons/logo.svg" alt="PC NEWS Logo" class="logo">
            </div>
            <nav class="nav-buttons">
                <button id="main">Главная</button>
                <button id="malling">Рассылка</button>
            </nav>
        </header>
       
        <main class="main">
            <div class="article-container">
                <?php if ($article): ?>
                    <div class="article-photo">
                        <?php if ($article['image']): ?>
                            <img src="<?= htmlspecialchars($article['image']) ?>" alt="Изображение">
                        <?php endif; ?>
                    </div>
                    <article class="article">
                        <h1 class="article-title"><?= htmlspecialchars($article['title']) ?></h1>
                        <div class="article-meta">
                            <span class="tags"><?= htmlspecialchars($article['tag']) ?></span>
                            <span class="date"><?= htmlspecialchars($article['date']) ?></span>
                        </div>
                        <div class="article-content">
                            <p><?= nl2br(htmlspecialchars($article['text'])) ?></p>
                        </div>
                    </article>
                <?php else: ?>
                    <p>Статья не найдена.</p>
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
</body>
</html>
