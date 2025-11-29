import { Api } from './Api';
import { dest_api } from '../../target_config';

export const api = new Api({
    baseURL: dest_api,
    securityWorker: (token) => {
        if (!token) return {};

        return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        };
    },
});