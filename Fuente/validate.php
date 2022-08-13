<?php
include('database.php');
$id = $_POST['documento'];
//echo $search;
if(!empty($id)){
    $query = "SELECT * FROM user WHERE id ='$id' ";
   $result =  mysqli_query($connection,$query);
   if(!$result){
    die('Query error'.mysqli_error($connection));

   }
   $json = array();
   
   while($row = mysqli_fetch_array($result)) {
     $json[] = array(
       'name' => $row['name'],
       'lastName'=> $row['lastName'],
       'id' => $row['id']
     );
   }
   $jsonstring = json_encode($json);
   echo $jsonstring;
 

}


?>