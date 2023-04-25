import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import DataGrid from "@amiga-fwk-web/components-data-viz/data-grid/data-grid";
import { DataGridColumns } from "@amiga-fwk-web/components-data-viz/data-grid/types";
import {
  HeaderRenderer,
  TextRenderer,
} from "@amiga-fwk-web/components-data-viz/data-grid";

const PositionPage = () => {
  const [positions, setPositions] = useState<Positions[]>([]);
  const [loading, setLoading] = useState(false);
  const getRowId = useCallback((datum: { id: any }) => datum.id, []);

  useEffect(() => {
    setLoading(true);
    api
      .getApp("/v1/position")
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          console.log(res);
          return res.json();
        }
        throw new Error(`Status ${res.status}`);
      })
      .then((positions: Positions[]) => {
        setPositions(positions);
        console.log(positions);
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

  const columns: DataGridColumns<Positions> = useMemo(() => {
    return {
      id: {
        fixed: true,
        header: () => <HeaderRenderer>Id</HeaderRenderer>,
        cell: ({ datum }) => <TextRenderer>{datum.id}</TextRenderer>,
      },
    };
  }, []);

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
          {/* table grid */}
          <Row>
            <Col>
              <DataGrid
                data={positions}
                getRowId={getRowId}
                columns={columns}
                loading={loading}
              ></DataGrid>
            </Col>
          </Row>
        </Grid>
      </div>
    </Page>
  );
};

export default PositionPage;
