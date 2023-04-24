const createContainers = (size) => {
    let ar = []
    for (let i = 0; i < size; i++) {
        ar.push(
            {
                tag: `id-${i}`,
                id: `${i}`,
                dc: 1,
                size: {
                    length: 400,
                    height: 400,
                    width: 400,
                },
                typeC: 2,
                weight: 200,
                status: {
                    name: "Disponible para ubicación",
                    description: "El contenedor está disponible para ubicar en el silo"
                },
                stock: [{
                    sku: '1',
                    status: 'Bien',
                    lot: 3,
                    "u/l": 2,
                }]
            }
        )
    } 
    return ar;
}

const filterContainers = (params) => {
    console.log(params);
    let ar = createContainers(15)
    return {
        containers: ar,
        pagination: {
            totalItems: ar.length,
            totalPages: 2
            // totalPages: Math.ceil(ar.length/params.itemsPerPage),
        }
    }
}

module.exports = {
    createContainers,
    filterContainers
}