<?php
header('Content-Type: text/html; charset=utf-8');
$_POST = json_decode(file_get_contents('php://input'),true);

$stoplist = array("shoptxt@list.ru");

foreach ($stoplist as $value) {
	if ($_POST['email']==$value ) {
		$email = $value." из бан листа";
		return;
	}
	if ($_POST['message']==$value) {
		$message = $value." из бан листа";
		return;
	}
}


if((isset($_POST['email'])&&$_POST['email']!="")&&(isset($_POST['message'])&&$_POST['message']!="")){ //Проверка отправилось ли наше поля name и не пустые ли они
				
				/*формируем переменные, которые содержат данные, полученные с html-формы*/
				$message = $_POST['message'];
				$email = $_POST['email'];
				

//				$to = "a64danil@mail.ru,ann.po.work@gmail.com"; // адрес, куда слать письмо
				$to = "a64danil@mail.ru"; // адрес, куда слать письмо
				// формируем Тему письма

				$subject = "Сообщение с сайта Тест Рисса  (от $email)";

				// Формируем тело письма

				//$msg = 'Имя: '.$email . 'Телефон:'.$message. "\r\n";

				$fgc = file_get_contents('send.html');

				$fgc = str_replace('{email}', $email , $fgc);
				$fgc = str_replace('{message}', $message, $fgc);
				//echo $fgc;
				$msg = $fgc;


				/* Составляем заголовки – служебную часть письма, где указываем тип кодировки и тип самого письма (plain text, т.е. простой текст) */
				$headers = 'MIME-Version: 1.0' . "\r\n";
				$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
				$headers .= "From: robot@qoobeo.com \r\n";

				mail($to,$subject, $msg, $headers);

				// Отправляем письмо
				
				$textDelay = '5';
				$answ = 'Письмо отправлено. Через '.$textDelay.' секунд мы вернем вас назад!';
				
				
				
}

else
{
$textDelay = '10';
$answ = 'ВНИМАНИЕ! В ФОРМЕ ЕСТЬ ОШИБКИ!<br &#47;>Пожалуйста, заполните все поля  <br &#47;>Через '.$textDelay.' секунд мы вернем вас назад!';

}



echo json_encode($answ, JSON_UNESCAPED_UNICODE); 
header('Refresh: '.$textDelay .'; URL=http://'.$_SERVER['HTTP_HOST'].'/');
?>