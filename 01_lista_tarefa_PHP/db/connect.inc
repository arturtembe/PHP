<?php 

    //Connect database
    $localhost="http://sql10.freesqldatabase.com/";
    $root="sql10697024";
    $pass="WtQmPLtyDd";
    $db="aula_extra";
    $tb_db="tb_task";

    //Inicar uma conexao
    //$con=mysqli_connect($localhost,$root,$pass,$db);
    $con=mysqli_connect($localhost,$root,$pass);
    mysqli_select_db($con,$db);

?>
