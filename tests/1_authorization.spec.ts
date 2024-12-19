import { expect, test } from '@playwright/test';
import { stageUrl, userCredentials } from '../config';
import { LoginPage } from '../pageObject/loginPage';

test('Авторизация', async ({ page }) => {
    const Login = new LoginPage(page);

    await Login.goTo(stageUrl);
    await Login.fillLoginField(userCredentials.login);
    await Login.fillPasswordField(userCredentials.password);
    await Login.clickSubmitButton();

    await expect(page).toHaveURL(/workspace/);
});
