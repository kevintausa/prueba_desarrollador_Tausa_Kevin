<?php
    include('database.php');
    if(isset($_POST['contact_name'])){ 
        $contact_name = $_POST['contact_name'];
        $contact_number = $_POST['contact_number'];
        $contact_type = $_POST['contact_type'];
        $contact_relationship = $_POST['contact_relationship'];
        $user_id = $_POST['user_id'];
    
       
        $query = "INSERT into contacts(contact_name, contact_number,contact_type, contact_relationship,user_id) VALUES ('$contact_name', '$contact_number','$contact_type','$contact_relationship','$user_id')" ;
        
       $result=  mysqli_query($connection,$query);
    
       if(!$result){
        die('Query Failed');
      }
      echo 'usuario agregado satisfactoriamente';

    }

?>