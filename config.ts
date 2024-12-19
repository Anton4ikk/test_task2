import dotenv from 'dotenv';

dotenv.config();

const stageUrl = process.env.STAGE_URL || 'URL стенда не указан в .env';

const userCredentials = {
    login: process.env.USER_LOGIN || 'Логин юзера не указан в .env',
    password: process.env.USER_PASSWORD || 'Пароль юзера не указан в .env'
}
const products = {
    fuelFilter: {
        code: 'E1300KP03D381',
        name: 'Fuel filter'
    },
    airFilter: {
        code: 'E588L',
        name: 'Air filter'
    }
}

export { products, stageUrl, userCredentials };

