<?php
// script.php

$host = 'MySQL-8.0';
$dbname = 'MySiteDB';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Ошибка подключения: " . $e->getMessage());
}

function getArticles($pdo, $tag = '') {
    if ($tag) {
        $stmt = $pdo->prepare("SELECT * FROM articles WHERE tag = ? ORDER BY date DESC");
        $stmt->execute([$tag]);
    } else {
        $stmt = $pdo->query("SELECT * FROM articles ORDER BY date DESC");
    }
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>
