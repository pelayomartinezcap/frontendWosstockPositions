import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Pagination, { Configuration, ResultCounter, Navigation } from "@amiga-fwk-web/components-navigation/pagination";

const PaginationContainers = (props: { pagination: { totalItems: number, totalPages: number } }) => {    
    const { pagination } = props;
    const { totalItems, totalPages } = pagination;

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage, setElementsPerPage] = useState(10);
    const options = [
        { label: "10", value: 10 },
        { label: "20", value: 20 },
    ]
    
    return (
        <>
            <Pagination
                configuration={
                    (
                        <Configuration
                            options={options}
                            value={elementsPerPage}
                            onChange={(perPage) => {
                                setElementsPerPage(perPage);
                            }}
                            
                        />
                    )
                }
                resultCounter={
                    <ResultCounter from={((currentPage - 1) * elementsPerPage) + 1} to={elementsPerPage * currentPage} total={totalItems}  />
                }
                navigation={
                    (
                        <Navigation
                            current={currentPage}
                            total={totalPages}
                            onChange={(page) => {
                                setCurrentPage(page);
                            }}
                            
                        />
                    )
                }                
                divider
            />
        </>
    );
};

PaginationContainers.propTypes = {
    pagination: PropTypes.object
};

export default PaginationContainers;