import express from 'express';
import Shopify from '@shopify/shopify-api';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { 
        API_KEY,
        SCOPES,
        API_SECRET_KEY,
        SHOP,
        HOST
       } from '../index.js';
// import Customer from '../models/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const router = express.Router();

console.log('customer fetch called')

const response = await fetch (
    'https://nuvitacb.myshopify.com/admin/api/2022-04/customers.json',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': ACCESS_TOKEN
        }
    });

const data = await response.json();
// console.log(data, data.customers.length);

let customerData;
customerData = data.customers;
// console.log(customerData.length);

// customerData.map(customer => {
//     console.log(customer);
//     Customer.create({
//         id: customer.id,
//         first_name: customer.first_name,
//         last_name: customer.last_name,
//         email: customer.email,
//         orders_count: customer.orders_count,
//         state: customer.state,
//         total_spent: customer.total_spent
//     })
// });

// create a seed file
function createSeedFile(data) {
    fs.writeFileSync(
        path.join(__dirname, '../data/seed.json'),
        JSON.stringify(data, null, 2)
    )
}

// console.log(customerData);

export default router;