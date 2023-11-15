const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

//use the cors middleware
app.use(cors());

const db = require("./models");

//Routers
const usersRouter = require("./routes/Users");
const usersDetailsRouter = require("./routes/UsersDetails");
const combinedRouter = require("./routes/CombinedRoutes");
app.use("/auth", usersRouter);
app.use("/usersdetails", usersDetailsRouter);
app.use("/combined", combinedRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});
