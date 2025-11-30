import { test, expect } from '@playwright/test';

test("register new user", async ({ page }) =>
{
    await page.goto('https://parabank.parasoft.com/parabank/index.html', { waitUntil: 'domcontentloaded' });

    await page.getByRole('link', { name: 'Register' }).click();
    await page.waitForURL('https://parabank.parasoft.com/parabank/register.htm;jsessionid=**');

    await expect(page.getByRole('heading', { name: 'Signing up is easy!' })).toBeVisible();

    await page.locator('input[name="customer.firstName"]').fill('John');
    await page.locator('input[name="customer.lastName"]').fill('Doe');
    await page.locator('input[name="customer.address.street"]').fill('11101 NE Main St');
    await page.locator('input[name="customer.address.city"]').fill('Seattle');//#customer.address.city
    await page.locator('input[name="customer.address.state"]').fill('WA');// #customer.address.state
    await page.locator('input[name="customer.address.zipCode"]').fill('980000');// #customer.address.zipCode
    await page.locator('input[name="customer.phoneNumber"]').fill('1234567890');// #customer.phoneNumber
    await page.locator('input[name="customer.ssn"]').fill('111-22-3333');
    let username = 'john_doe_test_100101';
    let password = 'P@$sw0rd_123!';

    await page.locator('input[name="customer.username"]').fill(username);//#customer.username
    await page.locator('input[name="customer.password"]').fill(password);// P@$sw0rd_123!
    await page.locator('input[name="repeatedPassword"]').fill(password);// #repeatedPassword

    await page.getByRole("button", { name: 'Register' }).click();

    await expect(page.getByRole('heading', { name: `Welcome ${username}` })).toBeVisible();
    //Welcome john_doe_test_001
});

test('Login', async ({ page }) =>
{
    await page.goto('https://parabank.parasoft.com/parabank/index.htm', { waitUntil: 'domcontentloaded' });
    //await page.waitForURL('https://parabank.parasoft.com/parabank/login.htm;jsessionid=**');
    let username = 'john_doe_test_100101';
    let password = 'P@$sw0rd_123!';
    await page.locator('input[name="username"]').fill(username);//#customer.username
    await page.locator('input[name="password"]').fill(password);// P@$sw0rd_123!

    await page.getByRole("button", { name: 'Log In' }).click();

    await expect(page.getByRole('heading', { name: 'Error' })).toBeVisible(); // Error is happening while I'm writing this test
});

test('Forgot info', async ({ page }) => 
{
    await page.goto('https://parabank.parasoft.com/parabank/index.htm', { waitUntil: 'domcontentloaded' });

    await page.getByRole('link', { name: 'Forgot login info?' }).click();
    let item = 'test';
    await page.locator('input[name="firstName"]').fill(item);
    await page.locator('input[name="lastName"]').fill(item);
    await page.locator('input[name="firstName"]').fill(item);
    await page.locator('input[name="address.street"]').fill(item);
    await page.locator('input[name="address.city"]').fill(item);//#customer.address.city
    await page.locator('input[name="address.state"]').fill(item);// #customer.address.state
    await page.locator('input[name="address.zipCode"]').fill(item);// #customer.address.zipCode
    await page.locator('input[name="ssn"]').fill(item);

    await page.getByRole('button', { name: 'Find My Login Info' }).click();

    await expect(page.getByRole('heading', { name: 'Customer Lookup' })).toBeVisible();
});

test.only('Request a loan', async ({ page }) =>
{

    //PLEASE READ: a lot of functionality doesn't work while I'm writing tests
    //In general now login is broken but I found a hack how to login  - bu requesting an info
    //-------------------- prerequisits --------------------
    await page.goto('https://parabank.parasoft.com/parabank/index.htm', { waitUntil: 'domcontentloaded' });

    await page.getByRole('link', { name: 'Forgot login info?' }).click();
    let item = 'test';
    await page.locator('input[name="firstName"]').fill(item);
    await page.locator('input[name="lastName"]').fill(item);
    await page.locator('input[name="firstName"]').fill(item);
    await page.locator('input[name="address.street"]').fill(item);
    await page.locator('input[name="address.city"]').fill(item);//#customer.address.city
    await page.locator('input[name="address.state"]').fill(item);// #customer.address.state
    await page.locator('input[name="address.zipCode"]').fill(item);// #customer.address.zipCode
    await page.locator('input[name="ssn"]').fill(item);

    await page.getByRole('button', { name: 'Find My Login Info' }).click();

    await expect(page.getByRole('heading', { name: 'Customer Lookup' })).toBeVisible();
    // ====================== Actual test ===============
    await page.getByRole('link', { name: 'Request Loan' }).click();

    await page.locator('#amount').fill('1000');
    await page.locator('#downPayment').fill('100');

    await page.getByRole('button', { name: 'Apply Now' }).click();
    await expect(page.getByRole('heading', { name: 'Error' })).toBeVisible(); // Error is happening while I'm writing this test
})