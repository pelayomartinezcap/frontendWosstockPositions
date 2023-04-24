import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Table, { THead, TBody, Tr, Td, Th } from "@amiga-fwk-web/components-content/table";
import { ContainerType } from "../types";

const TableContainers = (props: { containers: ContainerType[] }) => {    
    const { containers } = props;
    
    return (
        <Table>
            <THead>
                <Tr>
                    <Th colSpan={3}></Th>
                    <Th colSpan={3}>Tamaño</Th>
                    <Th colSpan={2}></Th>
                    <Th colSpan={2}>Estado</Th>
                </Tr>
                <Tr>
                    <Th>Matricula</Th>
                    <Th>Identificador</Th>
                    <Th>Centro distribucion</Th>
                    <Th>Largo</Th>
                    <Th>Ancho</Th>
                    <Th>Alto</Th>
                    <Th>Tipo contenedor</Th>
                    <Th>Peso</Th>
                    <Th>Estado</Th>
                    <Th>Descripcion de estado</Th>
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