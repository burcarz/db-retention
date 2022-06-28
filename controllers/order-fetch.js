import express from 'express';
import Shopify from '@shopify/shopify-api';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { 
        API_KEY,
        SCOPES,
        API_SECRET_KEY,
        SHOP,
        HOST
       } from '../index.js';

dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

console.log('order fetch called');

const router = express.Router();

const response = await fetch (
    'https://nuvitacb.myshopify.com/admin/api/2022-04/orders.json',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': ACCESS_TOKEN
        }
    });

const data = await response.json();
console.log(data, data.orders.length);


export default router;