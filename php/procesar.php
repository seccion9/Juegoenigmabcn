<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/* CARGAR PHPMailer */
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';
require __DIR__ . '/PHPMailer/src/Exception.php';

/* SOLO PERMITIR POST */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Método no permitido');
}

/* FUNCIÓN DE LIMPIEZA */
function limpiar(string $valor): string {
    return htmlspecialchars(trim($valor), ENT_QUOTES, 'UTF-8');
}

/* RECOGER Y VALIDAR DATOS */
$nombre        = limpiar($_POST['nombre'] ?? '');
$evento        = limpiar($_POST['evento'] ?? '');
$correo        = filter_var($_POST['correo'] ?? '', FILTER_VALIDATE_EMAIL);
$participantes = filter_var($_POST['participantes'] ?? 0, FILTER_VALIDATE_INT);
$telefono      = limpiar($_POST['telefono'] ?? '');

/* COMPROBACIONES */
if (!$nombre || !$evento || !$correo || !$participantes || !$telefono) {
    exit('Error: todos los campos son obligatorios.');
}

/* CONFIGURACIÓN SMTP IONOS */
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.ionos.es';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'envios@seccion9.com'; // CORREO EMISOR TÉCNICO
    $mail->Password   = 'QWE987.zxc';          // CONTRASEÑA SMTP
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';
    $mail->setFrom('envios@seccion9.com', 'Formulario Web');
    $mail->addAddress('info@juegoenigma.es'); // CORREO DESTINATARIO
    $mail->addReplyTo($correo, $nombre);

    /* CONTENIDO DEL CORREO */
    $mail->isHTML(true);
    $mail->Subject = 'Nueva solicitud desde el formulario';
    $mail->Body = "
        <h2>Nueva solicitud recibida</h2>
        <p><strong>Nombre:</strong> {$nombre}</p>
        <p><strong>Evento:</strong> {$evento}</p>
        <p><strong>Email:</strong> {$correo}</p>
        <p><strong>Teléfono:</strong> {$telefono}</p>
        <p><strong>Nº de participantes:</strong> {$participantes}</p>
    ";
    $mail->AltBody = "Nombre: {$nombre}\nEvento: {$evento}\nEmail: {$correo}\nTeléfono: {$telefono}\nParticipantes: {$participantes}";

    $mail->send();

    /* Redirección tras éxito */
    header('Location: /pages/info-asesino-de-keylock-city.html?enviado=1');
    exit;

} catch (Exception $e) {
    echo '❌ Error al enviar el mensaje. Inténtalo más tarde.<br>';
    echo 'Detalles: ' . $e->getMessage(); // Esto te ayudará a depurar si falla el correo
}