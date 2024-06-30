require("express-async-errors");

const migrationRun = require("./database/sqlite/migrations");
const appError = require("./utils/AppError");
const express = require("express");

const routes = require("../src/routes");

migrationRun();

const app = express(); // express ajuda nas requisiçoes HTTP
app.use(express.json());

// permite a extração de dados JSON
app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof appError) {
    return response.status(error.statuscode).json({
      status: "error",
      message: error.message,
    });
  }
  console.error(error);
  return response.status(500).json({
    status: "error",
    message: "internal server error",
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`estamos on na porta ${PORT}`));
