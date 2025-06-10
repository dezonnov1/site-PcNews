<?php
$success = false;
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Настройки письма
        $to = $email;
        $subject = "Подписка на рассылку";
        $message = "Спасибо за подписку на рассылку нашего сайта!";
        $headers = "From: no-reply@yoursite.com\r\n" .
                   "Content-Type: text/plain; charset=utf-8";

        // Отправка письма
        if (mail($to, $subject, $message, $headers)) {
            $success = true;
        } else {
            $error = "Не удалось отправить письмо.";
        }
    } else {
        $error = "Некорректный email.";
    }
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
    <link rel="stylesheet" href="malling.css">
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
            <div class="form-container">
                <form id="subscribe-form" class="subscribe-form">
                  <input type="email" name="email" placeholder="Введите вашу почту" required />
                  <button type="submit">Получать рассылку</button>
                  <label class="consent-label">
                    <input type="checkbox" name="consent" required />
                    Подтверждаю, что хочу получать рассылку
                  </label>
                </form>
                <div id="result-message">
                    <?php if ($success): ?>
                        <p style="color: green;">Письмо успешно отправлено!</p>
                    <?php elseif ($error): ?>
                        <p style="color: red;"><?= htmlspecialchars($error) ?></p>
                    <?php endif; ?>
                </div>
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
