import { test } from '@playwright/test';
import { products, stageUrl, userCredentials } from '../config';
import { LoginPage } from '../pageObject/loginPage';
import { WorkspacePage } from '../pageObject/workspacePage';

test('Добавление товаров', async ({ page }) => {
    const Login = new LoginPage(page);

    await Login.loginByUser(stageUrl, userCredentials.login, userCredentials.password);

    const Workspace = new WorkspacePage(page);

    await Workspace.createAndGoIntoNewWorkspace();
    await Workspace.findAndAddItemToWorkspace(products.fuelFilter.code, products.fuelFilter.name)
    await Workspace.findAndAddItemToWorkspace(products.airFilter.code, products.airFilter.name)
});
