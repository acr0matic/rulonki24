<?php

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Имя и телефон пользователя с формы
$name = $_POST['user_name'];
$phone = $_POST['user_phone'];

// Формирование содержимого письма
$title = "Поступила заявка на обратный звонок";
$body =
"
<p>С сайта rulonki24.ru поступила заявка на обратный звонок. Перезвоните как можно быстрее.</p>
    <h4>Контактная информация: </h4>
    <b>Имя: </b> $name <br>
    <b>Телефон: </b><a href='tel: $phone'> $phone
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'rulonki24'; // Логин на почте
    $mail->Password   = ''; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('rulonki24@yandex.ru', 'RULONKI24.RU'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('main.acr0matic@gmail.com');

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";}
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
