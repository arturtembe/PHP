<?php

    // Mysql

    //Connect database
    include "connect.inc";

    if(isset($_POST['f_tarefa'])){

        $rt=$_POST['f_tarefa'];

        $pattern="/,/";

        $cmp=preg_split($pattern,$rt,-1,PREG_SPLIT_OFFSET_CAPTURE);

        $tarefa=$cmp[0][0];
        $meses=array("Janeiro","Fevereiro","Marco","Abril"."Maio","Junho","Julho","Agosto","Setembro","Octubro","Novembro","Dezembro");
    
        //$criada=date('d')."  de ".$meses[date('m')-1]." de  ".date('Y')." ".date('h').":".date('i').":".date('s');
        $criada=$cmp[1][0];
        $status="concluida";

        
        $sql_insert="INSERT INTO $tb_db (`tarefa`, `criada`, `status`) 
        VALUES ('$tarefa', '$criada', '$status')";
        
        mysqli_query($con,$sql_insert);

        $num=mysqli_affected_rows($con);
        //Quantos registido fora affectados
        if($num===1){
            echo "Numero de registro inserido: ".$num."<br/>";
        }
        else{
            echo "Falha ao inserir <br/>";
        }
        
    }
    else{
        echo "Falha";
    }

    //Fechar a conexao
    mysqli_close($con);

?>