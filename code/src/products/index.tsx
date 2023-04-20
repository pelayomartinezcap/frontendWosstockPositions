/* istanbul ignore file */

import React from "react";
import Route from "@amiga-fwk-web/components-routing/route";
import { MenuItem, MenuLink } from "@amiga-fwk-web/components-navigation/menu";
import ProductsPage from "./components/products-page";

const menu = (
  <>
    <MenuItem>
      <MenuLink to="/products">Products</MenuLink>
    </MenuItem>
  </>
);

const routes = (
  <Route path="/products">
    <ProductsPage />
  </Route>
);

export default {
  routes,
  menu,
};
