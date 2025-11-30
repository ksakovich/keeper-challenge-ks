import { test, expect } from '@playwright/test';
import { Env } from '../src/utils/env';
import { LoginPage } from '../src/pages/LoginPage';
import { RegistrationPage } from '../src/pages/RegistrationPage';
import { RequestLoanPage } from '../src/pages/RequestLoanPage';
import { ForgotInfoPage } from '../src/pages/ForgotInfoPage';

//Please read:
// a lot of functuanalitites is broken at the moment I'm writing and running my tests, 
// but I was able to automate 4 tests as mentioned in the requrements , but some asserts are written for an error (decided to write test cases properly)
test.describe('Keeper Security tests from Kirill Sakovich', () =>
{
    const BASE_URL = 'https://parabank.parasoft.com/parabank/index.html';

    //PLEASE NOTE : make sure either to empty DB or change a username in .env file in order this test to pass 
    test("Register new user", async ({ page }) =>
    {
        const registrationPage = new RegistrationPage(page);
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

        await page.getByRole('link', { name: 'Register' }).click();
        await page.waitForURL('https://parabank.parasoft.com/parabank/register.htm;jsessionid=**');

        await expect(page.getByRole('heading', { name: 'Signing up is easy!' })).toBeVisible();

        await registrationPage.register();

        await expect(page.getByRole('heading', { name: `Welcome ${Env.username}` })).toBeVisible();
    });

    test('Login', async ({ page }) =>
    {

        const loginPage = new LoginPage(page);
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

        await loginPage.login();

        // PLEASSE READ: Error is happening while I'm writing this test, so I can assert only error in h1
        await expect(page.getByRole('heading', { name: 'Error' })).toBeVisible();
    });

    test('Forgot info', async ({ page }) => 
    {
        const forgotInfoPage = new ForgotInfoPage(page);
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

        await page.getByRole('link', { name: 'Forgot login info?' }).click();

        await forgotInfoPage.requestInfo();

        await expect(page.getByRole('heading', { name: 'Customer Lookup' })).toBeVisible();
    });

    test.only('Request a loan', async ({ page }) =>
    {
        const forgotInfoPage = new ForgotInfoPage(page);
        const requstLoanPage = new RequestLoanPage(page);
        //PLEASE READ: a lot of functionality doesn't work while I'm writing tests
        //In general now login is broken but I found a hack how to login  - bu requesting an info
        //-------------------- prerequisits --------------------

        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

        await page.getByRole('link', { name: 'Forgot login info?' }).click();
        await forgotInfoPage.requestInfo();

        await expect(page.getByRole('heading', { name: 'Customer Lookup' })).toBeVisible();
        // ====================== Actual test ===============
        await page.getByRole('link', { name: 'Request Loan' }).click();
        await requstLoanPage.applyForLoan('1000', '100');

        // Error is happening while I'm writing this test so I can  assert only for an error
        await expect(page.getByRole('heading', { name: 'Error' })).toBeVisible();
    });

});