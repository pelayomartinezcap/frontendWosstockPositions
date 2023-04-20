import React from "react";
import IntlProvider from "@amiga-fwk-web/components-intl/intl-provider";
import messages from "config/locales";

type Props = {
  children?: React.ReactNode;
};

export const AppWrapper: React.FC<Props> = ({ children }) => {
  return (
    <IntlProvider defaultLocale="es" messages={messages}>
      {children}
    </IntlProvider>
  );
};
