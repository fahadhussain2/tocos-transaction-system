import app from "./app"; // the actual Express application
import config from "./utils/config";
import { info } from "./utils/logger";

const port = config.PORT ? config.PORT : 3000;

// Listener for Starting the Express Server
app.listen(port, () => {
  info(`Server running on port ${port}`);
});
