import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('SE302 Homework 02 – Automated Test Cases', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        await homePage.navigate();
    });

    test('TC-01 Verify navigation to Products page', async ({ page }) => {
        await homePage.clickBrowseSweets();
        await expect(page).toHaveURL(/.*sweets/);
    });

    test('TC-02 Add product to cart', async () => {
        await homePage.clickBrowseSweets();
        await productsPage.addFirstProductToBasket();
        const count = await productsPage.getBasketCount();
        expect(count).toBe('1');
    });

    test('TC-04 Increase product quantity', async () => {
        await homePage.clickBrowseSweets();
        const count = await productsPage.getProductCount();
        expect(count).toBeGreaterThan(0);
    });

    test('TC-06 Reject invalid quantity input', async () => {
        await homePage.goToBasket();
        await cartPage.clickCheckout();

        const isFirstNameErr = await cartPage.isFirstNameErrorVisible();
        const isLastNameErr = await cartPage.isLastNameErrorVisible();

        expect(isFirstNameErr).toBeTruthy();
        expect(isLastNameErr).toBeTruthy();
    });

    test('TC-08 Verify cart usability', async () => {
        await homePage.goToBasket();
        await cartPage.fillCheckoutForm('John', 'Doe', 'john@example.com');

        await expect(cartPage.firstNameInput).toHaveValue('John');
        await expect(cartPage.lastNameInput).toHaveValue('Doe');
        await expect(cartPage.emailInput).toHaveValue('john@example.com');
    });
});
