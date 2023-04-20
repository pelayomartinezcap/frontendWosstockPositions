/* istanbul ignore file */

import React from "react";
import PageProperties from "@amiga-fwk-web/components-layout/page-properties";

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const Page: React.FC<Props> = ({ children, title = null }) => (
  <>
    {title && <PageProperties title={title} />}
    {children}
  </>
);

export default Page;
