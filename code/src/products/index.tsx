/* istanbul ignore file */

import React from "react";
import Route from "@amiga-fwk-web/components-routing/route";
import { MenuItem, MenuLink } from "@amiga-fwk-web/components-navigation/menu";
import ProductsPage from "./components/products-page";
import FormattedMessage from "@amiga-fwk-web/components-intl/formatted-message";
import PositionPage from "./components/positions/positions-page";

const menu = (
  <>
    <MenuItem>
      <MenuLink to="/products">Products</MenuLink>
    </MenuItem>
    <MenuItem>
      <MenuLink to="/positions">
        <FormattedMessage id="positions.title" />
      </MenuLink>
    </MenuItem>
  </>
);

const routes = (
  <>
    <Route path="/products">
      <ProductsPage />
    </Route>
    <Route path="/positions">
      <PositionPage />
    </Route>
  </>
);

export default {
  routes,
  menu,
};
