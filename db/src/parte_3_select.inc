<?php 

    //Select

    //Select all object
    //$res=mysqli_query($con,"SELECT * FROM tb_cadastro");
    
    //Select specif object
    $vcat=1;
    $res=mysqli_query($con,"SELECT * FROM tb_produto WHERE cat = $vcat");
    
    //Linhas
    $linha=mysqli_num_rows($res);
    //Quantos registido fora encontrados
    echo "Numero de registro: ".$linha."<br/>";

?>