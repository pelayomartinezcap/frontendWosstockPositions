import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import FormattedMessage from "@amiga-fwk-web/components-intl/formatted-message";
import useIntl from "@amiga-fwk-web/components-intl/use-intl";
import Form from "@amiga-fwk-web/components-form/form";
import Grid, { Row, Col } from "@amiga-fwk-web/components-form/grid";
import FormField from "@amiga-fwk-web/components-form/form-field";
import TextField from "@amiga-fwk-web/components-input/text-field";
import ButtonGroup from "@amiga-fwk-web/components-action/button-group";
import Button from "@amiga-fwk-web/components-action/button";
import Select from "@amiga-fwk-web/components-input/select";
import { ContainerSizes } from "../types";

const FormContainers = (props: { submit: any; }) => {    
    const { submit } = props;
    const intl = useIntl();
    const options = Object.values(ContainerSizes).map((e, i)=> ({ label: e.name, value: Object.keys(ContainerSizes)[i] }));

    return (
        <Form onSubmit={value => submit(value)}>
            <Grid>
                <Row>
                    <Col>
                        <FormField field="tag" label={intl.formatMessage({ id: "filters.tag" })}>
                            <TextField  />
                        </FormField>
                    </Col>
                    <Col>
                        <FormField field="id" label={intl.formatMessage({ id: "filters.id" })}>
                            <TextField  />
                        </FormField>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormField field="dc" label={intl.formatMessage({ id: "filters.dc" })}>
                            <TextField  />
                        </FormField>
                    </Col>
                    <Col>
                        <FormField field="size" label={intl.formatMessage({ id: "filters.size" })}>
                            <TextField  />
                        </FormField>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormField field="type" label={intl.formatMessage({ id: "filters.typeC" })}>
                            <TextField  />
                        </FormField>
                    </Col>
                    <Col>
                        <FormField field="weight" label={intl.formatMessage({ id: "filters.weight" })}>
                            <TextField  />
                        </FormField>
                    </Col>
                    <Col>
                        <FormField field="status" label={intl.formatMessage({ id: "filters.status" })}>
                            <Select name="select" label="Select" options={options}  />
                        </FormField>
                    </Col>
                </Row>
                <Row>
                    <Col w={6}>
                        <ButtonGroup>
                            <Button type="reset" label="Reset"  />
                            <Button type="submit" kind="primary" label="Submit"  />
                        </ButtonGroup>
                    </Col>
                </Row>
            </Grid>
        </Form>
    );
};

FormContainers.propTypes = {
    submit: PropTypes.func
};

export default FormContainers;