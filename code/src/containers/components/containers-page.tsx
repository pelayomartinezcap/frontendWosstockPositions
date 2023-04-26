import React, { useState, useEffect } from "react";
import Page from "../../layout/page";
import FormattedMessage from "@amiga-fwk-web/components-intl/formatted-message";
import Loader from "@amiga-fwk-web/components-feedback/loader";
import Grid, { Col, Row } from "@amiga-fwk-web/components-layout/grid";
import Label from "@amiga-fwk-web/components-content/label";
import api from "../../utils/api";
import TableContainers from "./Table/table";

import type { ContainerType } from "./types";
import FormContainers from "./Form/form";
import PaginationContainers from "./Pagination/pagination";

const ContainersPage = () => {
  const [containers, setContainers] = useState<ContainerType[]>([]);
  const [pagination, setPagination] = useState({ totalItems: 15, totalPages: 2 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    createData()
  }, []);  

  const createData = () => 
  api
  .getApp("/v1/containers")
  .then((res) => {
    setLoading(false);
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Status ${res.status}`);
  })
  .then((containers: ContainerType[]) => {
    setContainers(containers);
  })
  .catch(console.error);

  const loadData = (params: object) => 
  api
  .getApp("/v1/filterContainers", { body: {} })
  .then((res) => {
    setLoading(false);
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Status ${res.status}`);
  })
  .then((data: { containers: ContainerType[], pagination: object }) => {  
    console.log(data);    
    setContainers(data.containers);
    setPagination({ ...pagination, ...data.pagination })
  })
  .catch(console.error);

  const sendForm = (filters: object): void => { 
    loadData({
      filters,
      pagination : {
        page: pagination.totalItems,
		    itemsPerPage: pagination.totalPages
      }
    })
  }

  return (
    <Page>
      <div className="page-grid-padding">
        <Grid type="dense">
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
          <Row>
            <Col>
              <FormContainers submit={sendForm}></FormContainers>
            </Col>
          </Row>
          <Row>
            <Col>
              {loading ? (
                <div className="loader">
                  <Loader testId="containers-loader" />
                  <div className="loader__label">
                    <FormattedMessage id="containers.loading" />
                  </div>
                </div>
              ) : (
                <div className="element-container">
                  <TableContainers containers={containers}></TableContainers>
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <PaginationContainers pagination={pagination}></PaginationContainers>
            </Col>
          </Row>
        </Grid>
      </div>
    </Page>
  );
};

export default ContainersPage;
