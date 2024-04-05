<?php

    // Mysql

    //Connect database
    include "connect.inc";

    $sql_select="SELECT * FROM $tb_db";

    //Select
    
    $res=mysqli_query($con,$sql_select.$sql);
    
    //Linhas
    $linha=mysqli_num_rows($res);
    
    if($linha>0){
        while($reg=mysqli_fetch_row($res)){

            $pnd="pendente"==$reg[3]? "selected":"";
            $eand="em andamento"==$reg[3]? "selected":"";
            $cnld="concluida"==$reg[3]? "selected":"";

            echo "
            <tr>
            <td id='c$reg[0]'>
                <p>$reg[1]</p>
                <form class='input-edit' method='post'
                action='./db/p5_update_task.php' data-id='$reg[0]'>         
                </form>
            </td>
            <td>$reg[2]</td>
            <td>
                <select data-id='$reg[0]' class='select-form'>
                    <option value='pendente' $pnd>Pendente</option>
                    <option value='em andamento' $eand>Em andamento</option>
                    <option value='concluida' $cnld>Concluida</option>
                </select>
            </td>
            <td>
                <button class='btn-action edit' data-id='$reg[0]'>
                        <i class='fa fa-pencil' aria-hidden='true' data-id='$reg[0]'></i>
                </button>
                <button class='btn-action remove' data-id='$reg[0]'>
                        <i class='fa fa-trash' aria-hidden='true' data-id='$reg[0]'></i>
                </button>
            </td>
        </tr>
        ";

        }
    }
    else{
        echo "";
    }

    function optionStatus($rg,$option){

        if($rg==$option)
            return "selected";
        else 
        return "";
    }

    //Fechar a conexao
    mysqli_close($con);

?>