import { createRoute } from "@tanstack/react-router";

import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import { rootRoute } from "@/routes/root-route";

import Test from "./test";

const testRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/test",
  component: Test,
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default testRoute;
