import React, { useState, useEffect } from "react";
import Page from "../../../layout/page";
import FormattedMessage from "@amiga-fwk-web/components-intl/formatted-message";
import Loader from "@amiga-fwk-web/components-feedback/loader";
import Grid, { Col, Row } from "@amiga-fwk-web/components-layout/grid";
import List from "@amiga-fwk-web/components-content/list";
import { SimpleListItem } from "@amiga-fwk-web/components-content/simple-list";
import Label from "@amiga-fwk-web/components-content/label";
import api from "../../../utils/api";
import type { RenderItemProps } from "@amiga-fwk-web/components-content/list";
import type { Positions } from "../types";

const PositionPage = () => {
  const [positions, setPositions] = useState<Positions[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .getApp("/v1/position")
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Status ${res.status}`);
      })
      .then((positions: Positions[]) => {
        setPositions(positions);
      })
      .catch(console.error);
  }, []);

  const renderItem = ({
    onItemClick,
    item: { id, name },
  }: RenderItemProps<Positions>) => {
    return (
      <SimpleListItem
        testId={`positions-list-element-${id}`}
        key={id}
        onClick={onItemClick}
        label={name}
      />
    );
  };

  return (
    <Page>
      <div className="page-grid-padding">
        <Grid className="fullHeight" type="dense">
          <Row>
            <Col>
              <h2>
                <FormattedMessage id="positions.title" />
              </h2>
            </Col>
            <Col className="text--right">
              <Label
                label={
                  <FormattedMessage
                    id="positions.counter"
                    values={{ amount: positions.length }}
                  />
                }
              />
            </Col>
          </Row>
          <Row className="fullHeightContainer">
            <Col className="fullHeight">
              {loading ? (
                <div className="positions-loader">
                  <Loader testId="positions-loader" />
                  <div className="positions-loader__label">
                    <FormattedMessage id="positions.loading" />
                  </div>
                </div>
              ) : (
                <div className="positions-container">
                  <List
                    testId="positions-list"
                    items={positions}
                    renderItem={renderItem}
                  />
                </div>
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    </Page>
  );
};

export default PositionPage;
