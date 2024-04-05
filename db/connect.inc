<?php 

    //Connect database
    $localhost="localhost:3306";
    $root="root";
    $pass="root";
    $db="aula_extra";
    $tb_db="tb_task";

    //Inicar uma conexao
    //$con=mysqli_connect($localhost,$root,$pass,$db);
    $con=mysqli_connect($localhost,$root,$pass);
    mysqli_select_db($con,$db);

?>