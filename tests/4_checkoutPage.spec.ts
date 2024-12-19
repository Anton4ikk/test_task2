import { expect, test } from '@playwright/test';
import { products, stageUrl, userCredentials } from '../config';
import { CheckoutPage } from '../pageObject/checkoutPage';
import { LoginPage } from '../pageObject/loginPage';
import { WorkspacePage } from '../pageObject/workspacePage';

test('Проверка Checkout', async ({ page }) => {
    const Login = new LoginPage(page);

    await Login.loginByUser(stageUrl, userCredentials.login, userCredentials.password);

    const Workspace = new WorkspacePage(page);

    await Workspace.createAndGoIntoNewWorkspace();
    await Workspace.findAndAddItemToWorkspace(products.fuelFilter.code, products.fuelFilter.name)
    const workspaceProductTotalPrice = await Workspace.getProductTotalPrice(products.fuelFilter.name)

    const context = page.context();
    const pagePromise = context.waitForEvent('page');

    await Workspace.clickCheckoutButton();
    page = await pagePromise;
    await expect(page).toHaveURL(/checkout/);

    const Checkout = new CheckoutPage(page);
    await Checkout.checkProductOnPage(products.fuelFilter.code);
    const checkoutProductTotalPrice = await Checkout.getProductTotalPrice(products.fuelFilter.code);

    expect(workspaceProductTotalPrice).toBe(checkoutProductTotalPrice.replace(',', ' '));

    // TODO: Дописать сценарий
});
