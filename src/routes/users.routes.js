const { Router } = require("express");
const UsersControllers = require("../controllers/UsersControllers");
const usersRoutes = Router();

/* FUNÇÃO PARA VERIFICAR SEGURANÇA*/
// function myMiddleware(request, response, next) {
//   console.log("passandoooo aqui no middle");
//   console.log(request.body);
//   if (!request.body.isAdmin) {
//     return response.json({ message: "Você não possui autorização" });
//   }
//   next();
// }

const usersControllers = new UsersControllers();

usersRoutes.post("/", usersControllers.create);

module.exports = usersRoutes;
