import * as dotenv from 'dotenv';
dotenv.config();


export const Env = {
    password: process.env.USER_PASSWORD || '',
    firstName: process.env.USER_FIRSTNAME || '',
    lastName: process.env.USER_LASTNAME || '',
    username: process.env.USERNAME || '',
    address: process.env.USER_ADDRESS || '',
    city: process.env.USER_CITY || '',
    zip: process.env.USER_ZIP || '',
    state: process.env.USER_STATE || '',
    phone: process.env.USER_PHONE || '',
    ssn: process.env.USER_SSN || ''
};