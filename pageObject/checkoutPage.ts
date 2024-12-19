import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly newWorkspaceButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newWorkspaceButton = page.locator('//button[@title="Add"]');
    }

    async checkProductOnPage(productCode: string) {
        await expect(this.page.locator(`//div/b[text()="${productCode}"]`)).toBeVisible();
    }

    async getProductTotalPrice(productCode: string) {
        const productTotalPriceCell = this.page.locator(`(//div/b[text()="${productCode}"]//following::div[contains(text(),"€")])[1]`);
        await expect(productTotalPriceCell).toBeVisible();
        const totalPrice = await productTotalPriceCell.textContent() || 'Цена товара не получена';
        return totalPrice;
    }
}
