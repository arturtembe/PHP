<?php

    // Mysql

    //Connect database
    $localhost="localhost:3306";
    $root="root";
    $pass="root";
    $db="cfbcursos";
    $tb_db="tb_cadastro";

    //Inicar uma conexao
    $con=mysqli_connect($localhost,$root,$pass);
    mysqli_select_db($con,$db);

    if(isset($_POST['f_cod']) & isset($_POST['f_prod'])
    & isset($_POST['f_preco']) & isset($_POST['f_qtd']) 
    &  isset($_POST['f_cat'])){

        $cod=$_POST['f_cod'];
        $prod=$_POST['f_prod'];
        $preco=$_POST['f_preco'];
        $qtd=$_POST['f_qtd'];
        $cat=$_POST['f_cat'];

        
        $sql_insert="INSERT INTO tb_produto (`codigo`, `produto`, `preco`, `qtd`,`cat`) 
        VALUES ('$cod', '$prod', '$preco', '$qtd','$cat')";
        
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

    //Fechar a conexao
    mysqli_close($con);


?>
<!DOCTYPE html>
<html lang="pt-pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aula 22: Insert Formulario- Curso de PHP</title>
</head>
<body>

    <form name="f_cadProd" method="post" action="http://localhost:3000/aula22_mysql/form/parte_4_insert_formulario.php">

        <label>Codigo:</label><br/>
        <input type="text" name="f_cod" size="40" maxlength="30"/><br/><br/>

        <label>Produto:</label><br/>
        <input type="text" name="f_prod" size="60" maxlength="50"/><br/><br/>

        <label>Preco:</label><br/>
        <input type="text" name="f_preco" size="10"/><br/><br/>

        <label>Quantidade:</label><br/>
        <input type="text" name="f_qtd" size="10"/><br/><br/>

        <label>Categoria:</label><br/>
        <input type="text" name="f_cat" size="10"/><br/><br/>

        <input type="submit" value="Gravar"/>
        <input type="reset" value="Limpar"/>

    </form>

</body>
</html>
