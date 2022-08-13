<?php 
include('database.php');
$search = $_POST['search'];

if(!empty($search)){
    $query = "SELECT * FROM contacts WHERE contact_name LIKE '$search%' ";
   $result =  mysqli_query($connection,$query);
   if(!$result){
    die('Query error'.mysqli_error($connection));

   }
   $json = array();
   
   while($row = mysqli_fetch_array($result)) {
     $json[] = array(
        'contact_id' => $row['contact_id'],
        'contact_name'=> $row['contact_name'],
        'contact_number' => $row['contact_number'],
        'contact_type' => $row['contact_type'],
        'contact_relationship' => $row['contact_relationship']
          
     );
   }
   $jsonstring = json_encode($json);
   echo $jsonstring;
 

}
?>