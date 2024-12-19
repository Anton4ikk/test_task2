import { expect, Locator, Page } from '@playwright/test';

export class WorkspacePage {
    readonly page: Page;
    readonly newWorkspaceButton: Locator;
    readonly lastWorkspaceName: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly addToWorkspaceButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newWorkspaceButton = page.locator('//button[@title="Add"]');
        this.lastWorkspaceName = page.locator('(//div[contains(@class,"workspaces")]//div[contains(@class,"base")])[1]');
        this.searchInput = page.locator('//input[@placeholder="Start entering the product code"]');
        this.searchButton = page.locator('//button[contains(@class,"input-search-button")]');
        this.addToWorkspaceButton = page.locator('//span[text()="Add to workspace"]//parent::button');
        this.checkoutButton = page.locator('//button[contains(@class,"checkout")]');
    }

    async getLastCreatedWorkspaceName() {
        await expect(this.lastWorkspaceName).toBeVisible();
        const lastWorkspaceNameString = await this.lastWorkspaceName.textContent() || 'Не получено имя последнего созданного Workspace';
        return lastWorkspaceNameString;
    }

    async clickNewWorkspaceButton() {
        await expect(this.newWorkspaceButton).toBeVisible();
        await this.newWorkspaceButton.click();
        await this.page.waitForTimeout(1000); // TODO: Update waiting for animation
    }

    async clickCheckoutButton() {
        await expect(this.checkoutButton).toBeVisible();
        await this.checkoutButton.click();
        await this.page.waitForTimeout(1000); // TODO: Update waiting for animation
    }

    async getCreatedWorkspaceButton(workspaceName: string) {
        return this.page.locator(`(//div[contains(@class,"workspaces")]//div[contains(@class,"base") and text()="${workspaceName}"])[1]`)
    }

    async getProductTotalPrice(productName: string) {
        const productTotalPriceCell = this.page.locator(`(//div[text()="${productName}"]//following::div[contains(text(),"€")])[2]`);
        await expect(productTotalPriceCell).toBeVisible();
        const totalPrice = await productTotalPriceCell.textContent() || 'Цена товара не получена';
        return totalPrice;
    }

    async createAndGoIntoNewWorkspace() {
        const previousWorkspaceName = await this.getLastCreatedWorkspaceName();
        await this.clickNewWorkspaceButton();
        const newWorkspaceName = await this.getLastCreatedWorkspaceName();

        expect(newWorkspaceName).not.toBe(previousWorkspaceName);
        const createdWorkspaceButton = await this.getCreatedWorkspaceButton(newWorkspaceName);

        await expect(createdWorkspaceButton).toBeVisible();
        await createdWorkspaceButton.click();

        await expect(this.page.locator(`//div[@title="${newWorkspaceName}"]`)).toBeVisible();
    }

    async findAndAddItemToWorkspace(productCode: string, productName: string){
        await expect(this.searchInput).toBeVisible();
        await this.searchInput.fill(productCode);

        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForTimeout(2 * 1000); // TODO: Update waiting for animation

        await expect(this.addToWorkspaceButton).toBeVisible();
        await this.addToWorkspaceButton.click();
        await this.page.waitForTimeout(2 * 1000); // TODO: Update waiting for animation

        await expect(this.page.locator(`//div[contains(@class,"cell")]//div[text()="${productName}"]`)).toBeVisible();
    }
}
