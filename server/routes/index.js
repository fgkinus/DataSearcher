import keystone from "keystone";
import cors from "cors";

export const baseUrl = "/api/v1";

const importRoutes = keystone.importer(__dirname);
const App = app => {
  app.use(cors());
  const routes = {
    api: importRoutes("./api")
  };

  app.post(`${baseUrl}/items`, [], routes.api.items.create);
  app.get(`${baseUrl}/items`, [], routes.api.items.list);
  app.get(`${baseUrl}/items/search`, [], routes.api.items.search);
};

export default App;
