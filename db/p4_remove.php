<?php

    // Mysql

    //Connect database
    include "connect.inc";
    
    if(isset($_POST['delete'])){
        $id=$_POST['delete'];

        $sql="DELETE FROM $tb_db WHERE id = '$id'";
        $res=mysqli_query($con,$sql);

        //Linhas
        $num=mysqli_affected_rows($con);
        //Quantos registido fora encontrados
        
        if($num>0){
            echo "A task foi removida";
        }else{
            echo "Falha ao remover a task";
        }
    }else{
        echo "Ocorreu um erro";
    }

    //Fechar a conexao
    mysqli_close($con);

?>
