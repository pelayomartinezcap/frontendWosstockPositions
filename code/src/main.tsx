/* istanbul ignore file */

import React from "react";
import ReactDOM from "react-dom";
import Auth from "@amiga-fwk-web/auth/auth";
import AuthSwitch from "@amiga-fwk-web/auth/auth-switch";
import ComponentEventsProvider from "@amiga-fwk-web/components-utils/component-events-provider";
import ConfigProvider from "@amiga-fwk-web/config/config-provider";
import IntlProvider from "@amiga-fwk-web/components-intl/intl-provider";
import JanusProvider from "@amiga-fwk-web/auth-janus/janus-provider";
import Layout from "@/layout";
import LogProvider from "@amiga-fwk-web/logging/log-provider";
import NotificationsProvider from "@amiga-fwk-web/components-feedback/notifications-provider";
import Router from "@amiga-fwk-web/components-routing/router";
import consoleTransport from "@amiga-fwk-web/logging/console-transport";
import logger from "@amiga-fwk-web/logging/logger";
import { locales, menuEntries, messages, routes } from "./modules";
import Login from "@amiga-fwk-web/components-login/login";
import loginBg from "./assets/img/login-bg.jpg";
import "./assets/styles/custom.scss";

import { defaultErrorHandler } from "@amiga-fwk-web/errors";

const createLogger = () =>
  logger({
    transports: [consoleTransport()],
  });

const Application = () => (
  <ConfigProvider>
    {() => (
      <LogProvider logger={createLogger()}>
        <ComponentEventsProvider>
          <NotificationsProvider>
            <Auth provider={<JanusProvider />}>
              <IntlProvider supportedLocales={locales} messages={messages}>
                <AuthSwitch layout={<Login backgroundUrl={loginBg} />}>
                  <Router>
                    <Layout menuEntries={menuEntries}>{routes}</Layout>
                  </Router>
                </AuthSwitch>
              </IntlProvider>
            </Auth>
          </NotificationsProvider>
        </ComponentEventsProvider>
      </LogProvider>
    )}
  </ConfigProvider>
);

window.addEventListener("error", defaultErrorHandler);
window.addEventListener("unhandledrejection", defaultErrorHandler);

ReactDOM.render(<Application />, document.getElementById("app"));
