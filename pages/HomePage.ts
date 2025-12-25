import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly browseSweetsBtn: Locator;
    readonly loginLink: Locator;
    readonly basketLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.browseSweetsBtn = page.locator('a.sweets');
        this.loginLink = page.locator('a[href="/login"]');
        this.basketLink = page.locator('a[href="/basket"]');
    }

    async navigate() {
        await this.page.goto('https://sweetshop.netlify.app/');
    }

    async clickBrowseSweets() {
        await this.browseSweetsBtn.click();
    }

    async goToLogin() {
        await this.loginLink.click();
    }

    async goToBasket() {
        await this.basketLink.click();
    }
}
