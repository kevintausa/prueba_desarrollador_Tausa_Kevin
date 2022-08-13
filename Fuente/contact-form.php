<?php

include('database.php');

if(isset($_POST['id'])) {
  $id = mysqli_real_escape_string($connection, $_POST['id']);

  $query = "SELECT * from contacts WHERE contact_id = {$id}";

  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
        'contact_name' => $row['contact_name'],
        'contact_number' => $row['contact_number'],
        'contact_type' => $row['contact_type'],
        'contact_relationship' => $row['contact_relationship'],
        'contact_id' => $row['contact_id'],
    );
  }
  $jsonstring = json_encode($json[0]);
  echo $jsonstring;
}

?>