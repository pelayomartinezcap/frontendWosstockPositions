import { get as getVerb } from "@amiga-fwk-web/api-utils/verbs";
import { withJanusAuth } from "@amiga-fwk-web/auth-janus/decorators";
import { decorate } from "@amiga-fwk-web/api-utils/decorators";
import type { HttpVerbDecorator } from "@amiga-fwk-web/api-utils/decorators";
import { config } from "@amiga-fwk-web/global";

/* istanbul ignore next */
const setAppBackend: HttpVerbDecorator =
  (fn) =>
  (endpoint, options = {}) =>
    fn(`${config.getEndpoint("main")}${endpoint}`, { ...options });

const [getApp] = decorate(withJanusAuth(), setAppBackend, [getVerb]);

export default {
  getApp,
};
