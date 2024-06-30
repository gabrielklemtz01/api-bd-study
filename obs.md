## UTILIZAÇÃO PARAMETROS NODEJS EXPRESS

const { Router } = require("express");

const usersRoutes = Router();

// /: usado para parametros , PARAMS
// usersRoutes.get("/message/:id/:user", (request, response) => {

// const { id, user } = request.params;

// // response > responde a aplicação | request restorna os dados passados nos parametros
// response.send(`id: ${id}, Usuário: ${user}`);

// });

-- QUERY
// usersRoutes.get("/contato", (request, response) => {
// const { page, limit } = request.query;

// response.send(Página ${page}, Mostrar ${limit});
// });

// usando metodo do post para resgatar informações
usersRoutes.post("/", (request, response) => {
const { name, email } = request.body;

//PADRÃO PARA UTILIZAR API, EXTRAIR DADOS EM FORMATO JSON(OBJETO)
response.json({ name, email });
});

module.exports = usersRoutes;

## BANCO DE DADOS

/_ CRIA UMA TABELA
CREATE TABLE users (
id INTEGER PRIMARY KEY AUTOINCREMENT, /_ UM DADO COM ID SENDO INTEIRO E UMA CHAVE COM ID AUTOMATICO*/
name VARCHAR,
email VARCHAR,
password VARCHAR,
avatar VARCHAR NULL, /* NULL PERMITE QUE O CAMPO SEJA OPCIONAL*/
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, /* PADRÃO DE DATA E A DATA ATUAL*/
update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)*/

/_ ALTERA O NOME DA TABELA
ALTER TABLE clients
RENAME TO users
_/

/_ ADICIONA UMA NOVA COLUNA NA TABELA
ALTER TABLE users
ADD status VARCHAR
_/

/_ ALTERAR O NOME DE UMA COLUNA
ALTER TABLE users
RENAME COLUMN status TO active
_/

/_ DELETA UMA COLUNA
ALTER TABLE users
DROP COLUMN status
_/

## CRUD BD

/_ INSERINDO OS REGISTROS_/
INSERT INTO users (name, email, password) /_ DEFININDO CAMPOS PARA PREENCHER_/
VALUES ('Joao', 'teste23@teste.com', 'vemcodar23'); /_ DEFININDO OS VALORES DESSES CAMPOS_/

/_ VISUALIZAR TODO O CONTÉUDO DE UMA TABELA_/
SELECT \* FROM users;

/_ VISUALIZAR O CONTÉUDO ESPECIFICO DE UMA TABELA_/
SELECT id, name, email FROM users;

/_ ATUALIZAR UMA COLUNA DE UM USUARIO ESPECIFICO_/
UPDATE users SET
avatar = 'gabriel.png'
WHERE id = 1;

/_ DELETAR UM REGISTRO ESPECIFICO_/
DELETE FROM users
WHERE name = 'Joao';
