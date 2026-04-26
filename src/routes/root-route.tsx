import { createRootRoute } from "@tanstack/react-router";

import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import RootLayout from "@/routes/root-layout";

import gameRoute from "@/routes/game/game-route";
import homeRoute from "@/routes/home/home-route";
import testRoute from "@/routes/test/test-route";

export const rootRoute = createRootRoute({
  component: RootLayout,
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  testRoute,
  gameRoute,
]);
