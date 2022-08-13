<?php
    include('database.php');
    $query = "SELECT * from user";
    $result= mysqli_query($connection,$query);

    if(!$result){
        die('Fallo la consulta'.mysqli_error($connection));
    }
    
    $json = array();
    while($row = mysqli_fetch_array($result)) {
      $json[] = array(
        'name' => $row['name'],
        'lastName'=> $row['lastName'],
        'id' => $row['id'],
        'date'=> $row['date'],
        'gender'=> $row['gender']
      );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;

?>