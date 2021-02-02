const express = require('express')
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const app = express()
const port = 3000
const dotenv = require('dotenv').config();



// const api = new WooCommerceRestApi({
//     url: process.env.url,
//     consumerKey: process.env.consumerKey,
//     consumerSecret: process.env.consumerSecret,
//     version: process.env.version
// });

const api = new WooCommerceRestApi({
    url: "https://www.northcote.com",
    consumerKey: "ck_b4ebe384c839d026d0a8e1be5cf78c15681e3089",
    consumerSecret: "cs_3c318107f63054448c7e19bb1badafdc996804df",
    version: "wc/v3"
});


let stock = 0;

// List products
api.get("products/27686", {
    per_page: 1, // 20 products per page
})
    .then((response) => {
        // Successful request
        // console.log("Response Status:", response.status);
        // console.log("Response Headers:", response.headers);
        console.log("Product:", response.data.name);
        console.log("Stock:", response.data.stock_quantity);
        stock = response.data.stock_quantity;
    })
    .catch((error) => {
        // Invalid request, for 4xx and 5xx statuses
        console.log("Response Status:", error.response.status);
        console.log("Response Headers:", error.response.headers);
        console.log("Response Data:", error.response.data);
    })
    .finally(() => {
        // Always executed.
    });

app.get('/', (req, res) => {
    res.send(JSON.stringify(stock));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})