<?php

  include('database.php');
  
  if(isset($_POST['id'])) {
      $name = $_POST['name']; 
      $lastName = $_POST['lastName'];
      $date = $_POST['date'];
      
      $gender = $_POST['gender'];
      $id = $_POST['id'];

      $query = "UPDATE user SET name = '$name', lastName = '$lastName', date = '$date', gender='$gender' WHERE id = '$id'";
      $result = mysqli_query($connection, $query);

      if (!$result) {
        die('Query Failed.');
      }
      echo "Task Update Successfully";  
  }

?>