/* EXPORTANDO METODO DE CRIPTOGRAFIA DA SENHA NO BD*/
const { hash, compare } = require("bcryptjs");

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
    const { name, email, password, old_password } = request.body;
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

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new appError("Informe sua senha antiga");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new appError("Sua senha antiga esta incorreta.");
      }
      const checkEqualPassword = await compare(password, user.password);
      if (checkEqualPassword) {
        throw new appError(
          "Por favor, digite uma senha que ainda não tenha utilizado."
        );
      }
    }

    user.password = await hash(password, 8);

    await database.run(
      `UPDATE users SET name = ?, 
      email = ?, 
      password = ?, 
      update_at= DATETIME('now') 
      WHERE ID = ?`,
      [user.name, user.email, user.password, id]
    );

    return response.status(201).json();
  }

  async delete(request, response) {
    const { name, email, password } = request.body;
    const database = await sqliteConnection();

    const { id } = request.params;

    const user = await database.get("SELECT * FROM users WHERE id=(?)", [id]);

    if (!user) {
      throw new appError("Usuário não existe");
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new appError("Por favor, informe a senha correta");
    }

    await database.run(
      `DELETE FROM users
      WHERE id = ?`,
      [id]
    );
    return response.status(201).json();
  }
}

module.exports = UsersControllers;
