import { ContainerType } from './types'

class Container {
    data: ContainerType;

    constructor(data: ContainerType) {
        this.data = data;
    }

    getData() {
        return this.data;
    }
}

import { StockType } from './types'

class Stock {
    data: StockType;

    constructor(data: StockType) {
        this.data = data;
    }

    getData() {
        return this.data;
    }
}

export { Container, Stock }