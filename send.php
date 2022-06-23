<?php

$formname = $_POST['formname']; // Это обычно делается невидимым инпутом, в котором будет название формы, в каком блоке она находится

$name = $_POST['user_name'];
$tel = $_POST['user_tel'];

$message_body =
	"Форма: $formname<br /><br />" .
	"Имя: $name<br /><br />" .
	"Телефон: $tel<br /><br />";

$post_data = $_POST;
// Тут перебираем все данные, которые мы передали из формы и просто выводим их. Все, кроме трех первых
foreach ($post_data as $key => $post) {
	if ($post != $_POST['formname'] && $post != $_POST['user_name'] && $post != $_POST['user_tel']) {
		$message_body .= $key . ": $post<br /><br />";
	}
}

$email_to = 'имейл, куда должны приходить письма ';
$email_from = 'имейл, с которого будут отправляться письма. Любой. Какой хочешь. Хоть lalala@lalala.ru. Обычно делают
leads@домен на котром лежит сайт';
$email_subject = "Новая заявка с сайта: Имя сайта";

// Это просто обязательные штуки
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
$headers .= "From: <" . $email_from . ">\r\n"; // от кого письмо

// отправляем письмо
mail($email_to, $email_subject, $message_body, $headers);
 // Чтобы вывести json в консоль, что отравлено и ты мог видеть все ли переменные туда передалecho json_encode(array('status' => 'success', 'body' => $message_body));