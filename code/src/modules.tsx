/* istanbul ignore file */

import React from "react";
import NotFoundPage from "@amiga-fwk-web/components-application/not-found-page";
import Redirect from "@amiga-fwk-web/components-routing/redirect";
import Route from "@amiga-fwk-web/components-routing/route";
import Switch from "@amiga-fwk-web/components-routing/switch";
import UnauthorizedPage from "@amiga-fwk-web/components-application/unauthorized-page";
import containers from "@/containers";
import products from "@/products";

import messages from "config/locales";
export { messages };

export const locales = Object.keys(messages);

const combineMenuEntries = (...menus: JSX.Element[]) => menus.flatMap((menu) => menu.props.children);

export const menuEntries = combineMenuEntries(containers.menu, products.menu);

export const routes = (
  <Switch>
    <Redirect from="/" to="/containers" exact />
    {containers.routes}
    {products.routes}
    <Route key="unauthorized" path="/unauthorized" exact component={UnauthorizedPage} />,
    <Route key="not-found" component={NotFoundPage} />
  </Switch>
);
