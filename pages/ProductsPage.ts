import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly addToBasketBtns: Locator;
    readonly basketCountBadge: Locator;
    readonly productCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToBasketBtns = page.locator('a.addItem');
        this.basketCountBadge = page.locator('a[href="/basket"] span');
        this.productCards = page.locator('.card');
    }

    async addFirstProductToBasket() {
        await this.addToBasketBtns.first().click();
    }

    async getBasketCount(): Promise<string> {
        return (await this.basketCountBadge.innerText()).trim();
    }

    async getProductCount(): Promise<number> {
        return await this.productCards.count();
    }
}
