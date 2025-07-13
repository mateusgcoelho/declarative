import { DeclarativeUI, RouterManager, runApp } from "@mtg/declarative";
import { CounterPage } from "./pages/counter-page";

const app = new DeclarativeUI({
  router: new RouterManager({
    routes: {
      "/": new CounterPage(),
    },
  }),
});

runApp(app);
