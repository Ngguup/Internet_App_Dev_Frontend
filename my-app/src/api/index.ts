import { Api } from './Api';
import { dest_api } from '../../target_config';

export const api = new Api({
    baseURL: dest_api,
});