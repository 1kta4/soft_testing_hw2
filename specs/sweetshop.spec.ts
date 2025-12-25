import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Sweet Shop Functional Tests', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        await homePage.navigate();
    });

    // Test 1: Navigation - Interact with button/navigation and URL assertion
    test('should navigate to the sweets page from home', async ({ page }) => {
        await homePage.clickBrowseSweets();
        await expect(page).toHaveURL(/.*sweets/);
    });

    // Test 2: Interaction - Interact with button and check locator assertion
    test('should add a product and update basket count', async () => {
        await homePage.clickBrowseSweets();
        await productsPage.addFirstProductToBasket();
        const count = await productsPage.getBasketCount();
        expect(count).toBe('1');
    });

    // Test 3: Locator Assertion - Verify product visibility
    test('should display product cards on the sweets page', async () => {
        await homePage.clickBrowseSweets();
        const count = await productsPage.getProductCount();
        expect(count).toBeGreaterThan(0);
    });

    // Test 4: Negative Test & Form Interaction - Invalid input submit
    test('should show validation errors on empty checkout submission', async () => {
        await homePage.goToBasket();
        await cartPage.clickCheckout();

        const isFirstNameErr = await cartPage.isFirstNameErrorVisible();
        const isLastNameErr = await cartPage.isLastNameErrorVisible();

        expect(isFirstNameErr).toBeTruthy();
        expect(isLastNameErr).toBeTruthy();
    });

    // Test 5: Form Input - Interact with form inputs and verify persistence
    test('should allow user to fill checkout details', async () => {
        await homePage.goToBasket();
        await cartPage.fillCheckoutForm('John', 'Doe', 'john@example.com');

        await expect(cartPage.firstNameInput).toHaveValue('John');
        await expect(cartPage.lastNameInput).toHaveValue('Doe');
        await expect(cartPage.emailInput).toHaveValue('john@example.com');
    });
});
