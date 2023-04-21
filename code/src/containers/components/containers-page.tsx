import React, { useState, useEffect } from "react";
import Page from "../../layout/page";
import FormattedMessage from "@amiga-fwk-web/components-intl/formatted-message";
import Loader from "@amiga-fwk-web/components-feedback/loader";
import Grid, { Col, Row } from "@amiga-fwk-web/components-layout/grid";
import List from "@amiga-fwk-web/components-content/list";
import { SimpleListItem } from "@amiga-fwk-web/components-content/simple-list";
import Label from "@amiga-fwk-web/components-content/label";
import api from "../../utils/api";
import type { RenderItemProps } from "@amiga-fwk-web/components-content/list";
import type { Container } from "./types";

const ContainersPage = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .getApp("/v1/containers")
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Status ${res.status}`);
      })
      .then((Containers: Container[]) => {
        console.log(loading);
        console.log(Containers);
        
        setContainers(Containers);
      })
      .catch(console.error);
  }, []);

  const renderItem = ({ onItemClick, item: { id, name } }: RenderItemProps<Container>) => {
    console.log(id);
    
    return <SimpleListItem testId={`product-list-element-${id}`} key={id} onClick={onItemClick} label={name} />;
  };

  return (
    <Page>
      <div className="page-grid-padding">
        <Grid className="fullHeight" type="dense">
          <Row>
            <Col>
              <h2>
                <FormattedMessage id="containers.title" />
              </h2>
            </Col>
            <Col className="text--right">
              <Label label={<FormattedMessage id="containers.counter" values={{ amount: containers.length }} />} />
            </Col>
          </Row>
          <Row className="fullHeightContainer">
            <Col className="fullHeight">
              {loading ? (
                <div className="loader">
                  <Loader testId="containers-loader" />
                  <div className="loader__label">
                    <FormattedMessage id="containers.loading" />
                  </div>
                </div>
              ) : (
                <div className="element-container">
                  <List testId="container-list" items={containers} renderItem={renderItem} />
                </div>
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    </Page>
  );
};

export default ContainersPage;
