/* istanbul ignore file */

import React from "react";
import FormattedMessage from "@amiga-fwk-web/components-intl/formatted-message";
import DefaultApplicationLayout from "@amiga-fwk-web/components-application/default-application-layout";
import type { DefaultApplicationLayoutProps } from "@amiga-fwk-web/components-application/default-application-layout";
import "./layout.scss";

type Props = {
  children?: React.ReactNode;
  menuEntries?: DefaultApplicationLayoutProps["menuEntries"];
};

const Layout: React.FC<Props> = ({ menuEntries, children }) => (
  <DefaultApplicationLayout
    applicationName={
      <span className="pg-layout__app-name">
        <FormattedMessage id="app.name" />
      </span>
    }
    menuEntries={menuEntries}
  >
    {children}
  </DefaultApplicationLayout>
);

export default Layout;
