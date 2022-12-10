require("dotenv").config({ path: "./src/configs/.env" });

const app = require("./index");

const connect = require("./configs/db");

const port = process.env.PORT || 8080;

app.listen(port, async () => {
  try {
    await connect();
    console.log(connect());
  } catch (err) {
    console.log(err);
  }

  console.log("listening on port 5000", port);
});
