<?php 

    $nome="Artur JFG FDD";
    $username="dfrt";
    $senha="dr545";
    $email="dr545@gcf.com";
    $telefone="77987";
    $status=1;
    $obs="Tuy";

    
    $sql_insert="INSERT INTO tb_cadastro (`nome`, `username`, `senha`, `email`, `telefone`, `status`, `obs`) 
    VALUES ('$nome', '$username', '$senha', '$email', '$telefone', '$status', '$obs')";
    

    //$sql_insert="INSERT INTO tb_cadastro VALUES ('$nome', '$username', '$senha', '$email', '$telefone', '$status', '$obs')";

    mysqli_query($con,$sql_insert);

    $num=mysqli_affected_rows($con);
    //Quantos registido fora affectados
    echo "Numero de registro inserido: ".$num."<br/>";

    //include "parte_3_select.inc"

?>