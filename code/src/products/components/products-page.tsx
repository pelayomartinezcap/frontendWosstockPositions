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
import type { Product } from "./types";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .getApp("/v1/product")
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Status ${res.status}`);
      })
      .then((products: Product[]) => {
        setProducts(products);
      })
      .catch(console.error);
  }, []);

  const renderItem = ({ onItemClick, item: { id, name } }: RenderItemProps<Product>) => {
    return <SimpleListItem testId={`product-list-element-${id}`} key={id} onClick={onItemClick} label={name} />;
  };

  return (
    <Page>
      <div className="page-grid-padding">
        <Grid className="fullHeight" type="dense">
          <Row>
            <Col>
              <h2>
                <FormattedMessage id="products.title" />
              </h2>
            </Col>
            <Col className="text--right">
              <Label label={<FormattedMessage id="products.counter" values={{ amount: products.length }} />} />
            </Col>
          </Row>
          <Row className="fullHeightContainer">
            <Col className="fullHeight">
              {loading ? (
                <div className="products-loader">
                  <Loader testId="products-loader" />
                  <div className="products-loader__label">
                    <FormattedMessage id="products.loading" />
                  </div>
                </div>
              ) : (
                <div className="products-container">
                  <List testId="product-list" items={products} renderItem={renderItem} />
                </div>
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    </Page>
  );
};

export default ProductsPage;
