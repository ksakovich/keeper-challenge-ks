import { BasePage } from './BasePage';
import { Env } from '../utils/env';

export class RequestLoanPage extends BasePage
{
    private amount = this.page.locator('#amount');
    private downpayment = this.page.locator('#downPayment');
    private applyForLoanBtn = this.page.getByRole("button", { name: 'Apply Now' });

    async applyForLoan(amount, downpayment)
    {
        await this.amount.fill(amount);
        await this.downpayment.fill(downpayment);
        await this.applyForLoanBtn.click();
    }
}