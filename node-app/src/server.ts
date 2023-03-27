import app from "./app";
import AppDataSource from "./data-source"
import "dotenv/config"

const BASE_URL = process.env.BASE_url || "https://localhost:"
const PORT = Number(process.env.PORT) || 3000;
const API_DETAIL = process.env.API_DETAIL || "/api/v1";

(async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Database connected");

      app.listen(PORT, () => {
        console.log(`Server is running on ${BASE_URL + PORT + API_DETAIL}`);
      });
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
})();