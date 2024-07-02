const { Router } = require("express");
const NotesControllers = require("../controllers/NotesControllers");
const notesRoutes = Router();

/* FUNÇÃO PARA VERIFICAR SEGURANÇA*/
// function myMiddleware(request, response, next) {
//   console.log("passandoooo aqui no middle");
//   console.log(request.body);
//   if (!request.body.isAdmin) {
//     return response.json({ message: "Você não possui autorização" });
//   }
//   next();
// }

const notesControllers = new NotesControllers();

notesRoutes.get("/", notesControllers.index);
notesRoutes.post("/:user_id", notesControllers.create);
notesRoutes.get("/:id", notesControllers.show);
notesRoutes.delete("/:id", notesControllers.delete);

module.exports = notesRoutes;
