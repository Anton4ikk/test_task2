import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginField: Locator;
    readonly passwordField: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginField = page.locator('//input[@id="loginForm_email"]');
        this.passwordField = page.locator('//input[@id="loginForm_password"]');
        this.submitButton = page.locator('//button[@type="submit"]');
    }

    async goTo(url: string) {
        await this.page.goto(url);
        await expect(this.page).toHaveURL(/login/);
    }

    async fillLoginField(login: string) {
        await expect(this.loginField).toBeVisible();
        await this.loginField.fill(login);
    }

    async fillPasswordField(password: string) {
        await expect(this.passwordField).toBeVisible();
        await this.passwordField.fill(password);
    }

    async clickSubmitButton() {
        await expect(this.submitButton).toBeVisible();
        await this.submitButton.click();
    }

    async loginByUser(url: string, login: string, password: string) {
        await this.goTo(url);
        await this.fillLoginField(login);
        await this.fillPasswordField(password);
        await this.clickSubmitButton();
        
        await expect(this.page).toHaveURL(/workspace/);
    }
}