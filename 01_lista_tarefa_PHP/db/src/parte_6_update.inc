<?php 

    //Update
    $vcod=4;
    $tel="111222";

    $sql="UPDATE tb_cadastro SET telefone='$tel' WHERE cod = $vcod";
    $res=mysqli_query($con,$sql);
    
    //Linhas
    $num=mysqli_affected_rows($con);
    //Quantos registido fora encontrados
    
    if($num>0){
        echo "Numero de registro actualizado: ".$num."<br/>";
    }else{
        echo "Falha ao actualizar <br/>";
    }

?>