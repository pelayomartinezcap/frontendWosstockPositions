import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Table, { THead, TBody, Tr, Td, Th } from "@amiga-fwk-web/components-content/table";
import FormattedMessage from "@amiga-fwk-web/components-intl/formatted-message";
import { ContainerType } from "../types";

const TableContainers = (props: { containers: ContainerType[] }) => {    
    const { containers } = props;
    
    return (
        <Table>
            <THead>
                <Tr>
                    <Th colSpan={3}></Th>
                    <Th colSpan={3}><FormattedMessage id="container.size" /></Th>
                    <Th colSpan={2}></Th>
                    <Th colSpan={2}><FormattedMessage id="container.status" /></Th>
                </Tr>
                <Tr>
                    <Th><FormattedMessage id="container.tag" /></Th>
                    <Th><FormattedMessage id="container.id" /></Th>
                    <Th><FormattedMessage id="container.dc" /></Th>
                    <Th><FormattedMessage id="container.size.length" /></Th>
                    <Th><FormattedMessage id="container.size.width" /></Th>
                    <Th><FormattedMessage id="container.size.height" /></Th>
                    <Th><FormattedMessage id="container.typeC" /></Th>
                    <Th><FormattedMessage id="container.weight" /></Th>
                    <Th><FormattedMessage id="container.status.name" /></Th>
                    <Th><FormattedMessage id="container.status.description" /></Th>
                </Tr>
            </THead>
            <TBody>
                {containers.map((container: ContainerType, i: number) => {
                return (
                    <Tr key={i}>
                        <Td>{container.tag}</Td>
                        <Td>{container.id}</Td>
                        <Td>{container.dc}</Td>
                        <Td>{container.size.length}</Td>
                        <Td>{container.size.width}</Td>
                        <Td>{container.size.height}</Td>
                        <Td>{container.typeC}</Td>
                        <Td>{container.weight}</Td>
                        <Td>{container.status.name}</Td>
                        <Td>{container.status.description}</Td>
                    </Tr>
                )})}
            </TBody>
        </Table>
    );
};

TableContainers.propTypes = {
    containers: PropTypes.array
};

export default TableContainers;