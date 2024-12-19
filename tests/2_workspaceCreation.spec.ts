import { expect, test } from '@playwright/test';
import { stageUrl, userCredentials } from '../config';
import { LoginPage } from '../pageObject/loginPage';
import { WorkspacePage } from '../pageObject/workspacePage';

test('Создание Workspace', async ({ page }) => {
    const Login = new LoginPage(page);

    await Login.loginByUser(stageUrl, userCredentials.login, userCredentials.password);

    const Workspace = new WorkspacePage(page);

    const previousWorkspaceName = await Workspace.getLastCreatedWorkspaceName();
    await Workspace.clickNewWorkspaceButton();
    const newWorkspaceName = await Workspace.getLastCreatedWorkspaceName();
    
    expect(newWorkspaceName).not.toBe(previousWorkspaceName);
});
