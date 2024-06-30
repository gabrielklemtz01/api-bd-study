const appError = require("../utils/AppError");

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

  create(request, response) {
    const { name, email } = request.body;

    if (!name) {
      throw new appError("nome é obrigatório");
    }
    response.status(200).json({ name, email });
  }
}

module.exports = UsersControllers;
