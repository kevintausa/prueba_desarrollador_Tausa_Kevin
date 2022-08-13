<?php
$servername = "localhost";
$username = "root";
$password = "";
//Crear Conexion con MYSQL
$conn = new mysqli($servername, $username, $password);
//Comprobar la Conexión
if ($conn->connect_error) {
    die("Fallo de Conexión: " . $conn->connect_error);
} 
//Crear base de datos
$sql = "CREATE DATABASE agenda";
if ($conn->query($sql) === TRUE) {
    echo "Base de Datos Creada.";
} else {
    echo "Error al Crear la Base de Datos:". $conn->error;
}
//Cerrar Conexión
$conn->close();



$connection = mysqli_connect(
    'localhost',
    'root',
    '',
    'agenda'
);

$querycontacts=
"CREATE TABLE `contacts`  (
    `contact_id` int(11) NOT NULL,
    `contact_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
    `contact_number` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
    `contact_type` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
    `contact_relationship` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
    `user_id` varchar(12) COLLATE utf8_unicode_ci NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
$resultcontacts=  mysqli_query($connection,$querycontacts);

$queryuser=
"CREATE TABLE `user` (
  `id` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `gender` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
$resultuser=  mysqli_query($connection,$queryuser);

$queryATC=
"ALTER TABLE `contacts`
ADD PRIMARY KEY (`contact_id`),
ADD KEY `user_id` (`user_id`);";
$resultATC=  mysqli_query($connection,$queryATC);

$queryATU=
"ALTER TABLE `user`
ADD PRIMARY KEY (`id`);";
$resultATU=  mysqli_query($connection,$queryATU);

$queryAutoIncrement=
"ALTER TABLE `contacts`
MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT;";
$resultAutoIncrement=  mysqli_query($connection,$queryAutoIncrement);

$queryFK=
"ALTER TABLE `contacts`
ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;";
$resultATU=  mysqli_query($connection,$queryFK);

?>