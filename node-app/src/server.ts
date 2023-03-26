import app from "./app";
import {AppDataSource} from "./data-source"
import "dotenv/config"

const BASE_URL = process.env.BASE_url || "https://localhost:"
const PORT = process.env.PORT || 3000;

// AppDataSource.initialize()
//   .then(async () => {
//     console.log('Database connected.');

//     app.listen(PORT, () => {
//       console.log(`App is running on https://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => console.error(err));

(async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Database connected");

      app.listen(PORT, () => {
        console.log(`Server is running on ${BASE_URL + PORT}`);
      });
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
})();