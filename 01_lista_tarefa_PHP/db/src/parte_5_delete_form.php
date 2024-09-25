<?php

    // Mysql

    //Connect database
    $localhost="localhost:3306";
    $root="root";
    $pass="root";
    $db="cfbcursos";
    $tb_db="tb_cadastro";

    $endpoint="http://localhost:3000/aula22_mysql/form/parte_5_delete_form.php";

    //Inicar uma conexao
    $con=mysqli_connect($localhost,$root,$pass);
    mysqli_select_db($con,$db);

    $sql_select="SELECT * FROM tb_cadastro";
    
    if(isset($_POST['sel'])){
        //echo "Submitido";
        foreach($_POST['sel'] as $vcod){
            //echo "Codigo: $vcod <br/>";
            $sql="DELETE FROM tb_cadastro WHERE cod = '$vcod'";
            $res=mysqli_query($con,$sql);
        }
        //Linhas
        $num=mysqli_affected_rows($con);
        //Quantos registido fora encontrados
        
        if($num>0){
            echo "Numero de registro removido: ".$num."<br/>";
        }else{
            echo "Falha ao remover <br/>";
        }
    }else{
        echo "Nao submitido";
    }


?>
<!DOCTYPE html>
<html lang="pt-pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aula 22: Delete - Curso de PHP</title>
</head>
<body>

<?php
    echo "<form name='f_delete' method='post' action='$endpoint'>";
?>    
    <input type='submit' value='Delete'/><br/>
    <input type="hidden" name="f_del" value="f_del"/>
    <br/>
    
    <table border='1'>
        <tr>
            <td>Codigo</td>
            <td>Nome</td>
            <td>Selecionar</td>
        </tr>

        <?php 

            //Select

            $res=mysqli_query($con,$sql_select);

            //Linhas
            
            while($reg=mysqli_fetch_row($res)){
                $vcod=$reg[0];//Codigo;
                $vprod=$reg[1];//Nome;
                echo "
                <tr>
                    <td>'$vcod'</td>
                    <td>'$vprod'</td>
                    <td align='center'>
                    <input type='checkbox' name=sel[] value='$vcod'/>
                    </td>
                </tr>
                ";

            }

            //Fechar a conexao
            mysqli_close($con);

        ?>

    </table>
</form>

</body>
</html>

