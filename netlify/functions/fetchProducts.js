// netlify/functions/fetchProducts.js

exports.handler = async function (event, context) {
    const mockData = [
        { id: 1, name: "Product 1", price: 100 },
        { id: 2, name: "Product 2", price: 200 },
    ];

    return {
        statusCode: 200,
        body: JSON.stringify(mockData),
    };
};
