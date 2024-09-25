<?php 

    if(isset($_POST['update'])){

        //vr
        $rt=$_POST['update'];

        $pattern="/,/";

        $cmp=preg_split($pattern,$rt,-1,PREG_SPLIT_OFFSET_CAPTURE);

        $id=$cmp[0][0];
        $status=$cmp[1][0];

        if(isset($id) and isset($status)){

            //Connect database
            include "connect.inc";

            //Update

            $sql="UPDATE $tb_db SET status='$status' WHERE id = '$id'";
            $res=mysqli_query($con,$sql);
            
            //Linhas
            $num=mysqli_affected_rows($con);
            //Quantos registido fora encontrados
            
            if($num>0){
                echo "Registro actualizado";
            }else{
                echo "Falha ao actualizar";
            }
        }
    }

?>