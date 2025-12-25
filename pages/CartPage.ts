import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly checkoutBtn: Locator;
    readonly firstNameError: Locator;
    readonly lastNameError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('input#name').nth(0);
        this.lastNameInput = page.locator('input#name').nth(1);
        this.emailInput = page.locator('input#email');
        this.checkoutBtn = page.locator('button:has-text("Continue to checkout")');

        // Error messages appear when form is submitted with invalid data
        this.firstNameError = page.locator('text=Valid first name is required.');
        this.lastNameError = page.locator('text=Valid last name is required.');
    }

    async fillCheckoutForm(firstName: string, lastName: string, email: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
    }

    async clickCheckout() {
        await this.checkoutBtn.click();
    }

    async isFirstNameErrorVisible(): Promise<boolean> {
        return await this.firstNameError.isVisible();
    }

    async isLastNameErrorVisible(): Promise<boolean> {
        return await this.lastNameError.isVisible();
    }
}
