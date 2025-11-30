import { BasePage } from './BasePage';
import { Env } from '../utils/env';

export class LoginPage extends BasePage
{
    private username = this.page.locator('input[name="username"]');
    private password = this.page.locator('input[name="password"]');
    private loginBtn = this.page.getByRole("button", { name: 'Log In' });

    async login()
    {
        await this.username.fill(Env.username);
        await this.password.fill(Env.password);
        await this.loginBtn.click();
    }
}