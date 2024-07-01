/* EXPORTANDO METODO DE CRIPTOGRAFIA DA SENHA NO BD*/
const { hash } = require("bcryptjs");

const appError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersControllers {
  /**
   * ---- CONTROLLER PODE TER APENAS 5 MÉTODOS:
   *
   * index = GET para listar vários registros.
   * show = GET para exibir um registro especifico.
   * create = POST para criar um registo.
   * update = PUT para atualizar um registro.
   * delete = DELETE para deletar um registro.
   *
   * ----
   */

  async create(request, response) {
    const { name, email, password } = request.body;
    const database = await sqliteConnection();

    /* REALIZANDO CHECAGEM DE DADOS*/
    const checkUserExist = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExist) {
      throw new appError("Email ja cadastrado");
    }

    /* CRIPTOGRAFANDO A SENHA*/
    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id=(?)", [id]);

    if (!user) {
      throw new appError("Usuário não existe");
    }

    const userNewEmail = await database.get(
      "SELECT * FROM users WHERE email=(?)",
      [email]
    );

    if (userNewEmail && userNewEmail.id !== user.id) {
      throw new appError("Este email já esta em uso");
    }

    user.name = name;
    user.email = email;

    await database.run(
      `UPDATE users SET name = ?, email = ?, update_at=? WHERE ID = ?`,
      [user.name, user.email, new Date(), id]
    );

    return response.status(201).json();
  }
}

module.exports = UsersControllers;
