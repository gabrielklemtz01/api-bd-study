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

    return response.status(201).json();
  }
}

module.exports = UsersControllers;
