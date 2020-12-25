<?php
header('Content-Type: text/html; charset=utf-8');
$_POST['host'] = $_SERVER['HTTP_HOST'];

$stoplist = array("shoptxt@list.ru");

foreach ($stoplist as $value) {
	if ($_POST['fio']==$value ) {
		$name = $value." из бан листа";
		return;
	}
	if ($_POST['phone']==$value) {
		$phone = $value." из бан листа";
		return;
	}
}


if((isset($_POST['fio'])&&$_POST['fio']!="")&&(isset($_POST['phone'])&&$_POST['phone']!="")){ //Проверка отправилось ли наше поля name и не пустые ли они
				
				/*формируем переменные, которые содержат данные, полученные с html-формы*/
				$phone = $_POST['phone'];
				$name = $_POST['fio'];
				$mailSubj = $_POST['mail-subj'];
				
				
				

				$to = "a64danil@mail.ru,ann.po.work@gmail.com"; // адрес, куда слать письмо
				//$to = "a64danil@mail.ru"; // адрес, куда слать письмо 
				// формируем Тему письма

				$subject = "Заявка с сайта  от $name";

				// формируем заголовок внутри хтмл письма

				switch ($mailSubj) {
								case 'free-size':
									$mailSubj = 'бесплатный замер';
									break;
								case 'call-back':
									$mailSubj = 'обратный звонок';
									break;     
								case 'order':
									$mailSubj = 'заказ штор';
									break;     
								default:
									$mailSubj = '(ошибка, услуга не указана)';
									break;  					
							};     

				// Формируем тело письма

				//$msg = 'Имя: '.$name . 'Телефон:'.$phone. "\r\n";

				$fgc = file_get_contents('send.html');

				$fgc = str_replace('{theme}', $mailSubj , $fgc);
				$fgc = str_replace('{title}', $name , $fgc);
				$fgc = str_replace('{body}', $phone, $fgc);
				//echo $fgc;
				$msg = $fgc;


				/* Составляем заголовки – служебную часть письма, где указываем тип кодировки и тип самого письма (plain text, т.е. простой текст) */
				$headers = 'MIME-Version: 1.0' . "\r\n";
				$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
				$headers .= "From: a@qoobeo.com \r\n";

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
header('Refresh: '.$textDelay .'; URL=http://'.$_POST['host'].'/');
?>