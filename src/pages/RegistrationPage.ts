import { BasePage } from './BasePage';
import { Env } from '../utils/env';

export class RegistrationPage extends BasePage
{
    private first = this.page.locator('input[name="customer.firstName"]');
    private last = this.page.locator('input[name="customer.lastName"]');
    private address = this.page.locator('input[name="customer.address.street"]');
    private city = this.page.locator('input[name="customer.address.city"]');
    private state = this.page.locator('input[name="customer.address.state"]');
    private zip = this.page.locator('input[name="customer.address.zipCode"]');
    private phone = this.page.locator('input[name="customer.phoneNumber"]');
    private ssn = this.page.locator('input[name="customer.ssn"]');
    private username = this.page.locator('input[name="customer.username"]');
    private password = this.page.locator('input[name="customer.password"]');
    private confirm = this.page.locator('input[name="repeatedPassword"]');
    private registerBtn = this.page.getByRole("button", { name: 'Register' });

    async register()
    {
        await this.first.fill(Env.firstName);
        await this.last.fill(Env.lastName);
        await this.address.fill(Env.address);
        await this.city.fill(Env.city);
        await this.state.fill(Env.state);
        await this.zip.fill(Env.zip);
        await this.phone.fill(Env.phone);
        await this.ssn.fill(Env.ssn);
        await this.username.fill(Env.username);
        await this.password.fill(Env.password);
        await this.confirm.fill(Env.password);
        await this.registerBtn.click();
    }
}