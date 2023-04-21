/* istanbul ignore file */

import React from "react";
import Route from "@amiga-fwk-web/components-routing/route";
import { MenuItem, MenuLink } from "@amiga-fwk-web/components-navigation/menu";
import ContainersPage from "./components/containers-page";

const menu = (
  <>
    <MenuItem>
      <MenuLink to="/containers">Containers</MenuLink>
    </MenuItem>
  </>
);

const routes = (
  <Route path="/containers">
    <ContainersPage />
  </Route>
);

export default {
  routes,
  menu,
};
