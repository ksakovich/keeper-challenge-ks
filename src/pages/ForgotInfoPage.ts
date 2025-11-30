import { BasePage } from './BasePage';
import { Env } from '../utils/env';

export class ForgotInfoPage extends BasePage
{
    private first = this.page.locator('input[name="firstName"]');
    private last = this.page.locator('input[name="lastName"]');
    private address = this.page.locator('input[name="address.street"]');
    private city = this.page.locator('input[name="address.city"]');
    private state = this.page.locator('input[name="address.state"]');
    private zip = this.page.locator('input[name="address.zipCode"]');
    private ssn = this.page.locator('input[name="ssn"]');
    private findInfo = this.page.getByRole("button", { name: 'Find My Login Info' });

    async requestInfo()
    {
        //PLEASE READ:
        //only works with manually submitted user not for automatically registered user

        // await this.first.fill(Env.firstName);
        // await this.last.fill(Env.lastName);
        // await this.address.fill(Env.address);
        // await this.city.fill(Env.city);
        // await this.state.fill(Env.state);
        // await this.zip.fill(Env.zip);
        // await this.ssn.fill(Env.ssn);
        await this.first.fill('test');
        await this.last.fill('test');
        await this.address.fill('test');
        await this.city.fill('test');
        await this.state.fill('test');
        await this.zip.fill('test');
        await this.ssn.fill('test');
        await this.findInfo.click();
    }
}