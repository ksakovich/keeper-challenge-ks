import { test, expect } from '@playwright/test';

test.only("register new user", async ({ page }) =>
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