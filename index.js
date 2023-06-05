const app = require("./app");
const colors = require("colors");
const dbConnect = require("./db");

// Start the server
const PORT = process.env.PORT || 5000;

dbConnect()
  .then(() => {
    console.log("Database connect successfully".bgGreen);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`.bgBlue);
    });
  })
  .catch((e) => {
    console.log(`error: ${e}`.bgRed);
  });
