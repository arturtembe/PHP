<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de tarefas</title>
    <link rel="stylesheet" href="./css/style.css"/>
    <link rel="stylesheet" type="text/css" href="./css/font_icon/all.min.css"/>
    <link rel="stylesheet" type="text/css" href="./css/font_icon/fontawesome.min.css"/>
</head>
<body>

    <main>

        <form class="add-form" id="form" method="post"
        action="./db/p3_insert.php">
            <div class="cc">
                <input type="text" placeholder="Adicionar tarefa" class="input-task"
                id="f_tarefa" name="f_tarefa"/>
                <button type="submit" id="btn_submit">+</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Tarefa</th>
                        <th>Criado em</th>
                        <th>Status</th>
                        <th>Acoes</th>
                    </tr>
                </thead>
                <tbody id="tby">
                    <!--
                    <tr>
                        <td>Titulo da task</td>
                        <td>05 de Marco de 2024 21:15</td>
                        <td>
                            <select>
                                <option value="pendente">Pendente</option>
                                <option value="em andamento">Em andamento</option>
                                <option value="concluida">Concluida</option>
                            </select>
                        </td>
                        <td>
                            <button class="btn-action">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                            </button>
                            <button class="btn-action">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                            </button>
                        </td>
                    </tr>
                    -->
                </tbody>
            </table>

        </form>

    </main>

    <script defer src="./js/app.js"></script>
</body>
</html>