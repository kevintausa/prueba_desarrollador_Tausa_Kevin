<?php

use LDAP\Result;

    include('database.php');
    if(isset($_POST['name'])){ 
        $id = $_POST['id'];
        $name = $_POST['name'];
        $lastName = $_POST['lastName'];
        $date = $_POST['date'];
        $gender = $_POST['gender'];
    
        $query = "INSERT into user(id,name,lastName,date,gender) VALUES ('$id', '$name','$lastName','$date','$gender')" ;
        
       $result=  mysqli_query($connection,$query);
        if(!$result){
          die('Query Failed');
        }
        echo 'usuario agregado satisfactoriamente';
        

        
    }
