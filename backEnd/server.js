const express = require("express");
const { postgrator } = require("./lib/db");
const cors = require("cors");
const app = express();
const path = require("path");
const dotenv = require("dotenv").config();
const usersRoute = require("./routes/users");
const scoresRoute = require("./routes/scores");

// const port = 8000;

// if (process.env.NODE_ENV == development) {
//   results = dotenv.config({
//     path: path.join(__dirname, `./.env.development`),
//   });
//   if (result.error) {
//     throw new Error(result.error);
//   }
// }
app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/scores", scoresRoute);

postgrator
  .migrate()
  .then((result) => {
    console.log(`migrated db successfully:`, result);
    app.listen(process.env.PORT, () => {
      console.log(`server is listening at http://${process.env.HOST}:${process.env.PORT}`);
    });
  })
  .catch((error) => console.error(error));
