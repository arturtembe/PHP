<?php

    // Mysql

    //Connect database
    $localhost="localhost:3306";
    $root="root";
    $pass="root";
    $db="cfbcursos";
    $tb_db="tb_cadastro";

    $endpoint="http://localhost:3000/aula22_mysql/form/parte_3_2_select_like.php";

    //Inicar uma conexao
    $con=mysqli_connect($localhost,$root,$pass);
    mysqli_select_db($con,$db);

    $sql_select="SELECT * FROM tb_produto";
    $prod="";
    $sql="";

    if(isset($_POST['f_prod'])){

        $prod=$_POST['f_prod'];
        
        $sql=" WHERE produto LIKE '%$prod%'";
    }

?>
<!DOCTYPE html>
<html lang="pt-pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aula 22: Select - Curso de PHP</title>
</head>
<body>

    <?php 

    echo "
    <form name='f_cadProd' method='post' action='$endpoint'>

        <label>Produto:</label><br/>
        <input type='text' name='f_prod' size='60' maxlength='50' value='$prod'/><br/><br/>

        <input type='submit' value='Pesquisar'/>

    </form>
    ";

    ?>

</body>
</html>

<?php 

    //Select
    
    $res=mysqli_query($con,$sql_select.$sql);
    
    //Linhas
    $linha=mysqli_num_rows($res);
    //Quantos registido fora encontrados
    echo "<br/><hr/>";
    echo "Numero de registro: ".$linha."<br/><hr/>";

    while($reg=mysqli_fetch_row($res)){
        $vcod=$reg[1];//Codigo;
        $vprod=$reg[2];//Producto;
        $vpreco=$reg[3];//Preco;
        $vqtd=$reg[4];//Quantidade;
        echo "Codigo: ".$vcod."<br/>";
        echo "Produto: ".$vprod."<br/>";
        echo "Preco: ".$vpreco."<br/>";
        echo "Quanidade: ".$vqtd."<br/><hr/>";
    }

    //Fechar a conexao
    mysqli_close($con);

?>
