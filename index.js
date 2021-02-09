const express = require('express')
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const app = express()
const port = process.env.PORT || 3000
const dotenv = require('dotenv').config();
const cron = require('node-cron');


const api = new WooCommerceRestApi({
    url: process.env.url,
    consumerKey: process.env.consumerKey,
    consumerSecret: process.env.consumerSecret,
    version: process.env.version
});

const productID = process.env.productID

let stockObject = {};
let stock = {};


cron.schedule('30 * * * * *', function () {
    // Fetch Product
    api.get(`products/${productID}`, {
        per_page: 1, // 20 products per page
    })
        .then((response) => {
            // Build Object
            stockObject["stock_left"] = response.data.stock_quantity;
            stock = response.data.stock_quantity;
            stockObject["product_name"] = response.data.name;
            // Successful request
            console.log("Product:", stockObject.product_name, "| Stock:", stockObject.stock_left);
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
});


app.get('/', (req, res) => {
    res.send("Silence is Golden");
})

app.get('/stock', (req, res) => {
    res.send(`<p style="text-align:center">Estimated Stock Remaining: ${stock}</p>`);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})