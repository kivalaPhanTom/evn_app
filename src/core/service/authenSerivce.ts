import { apiFormUrlEncoded } from './api.service'
interface tokenRequest {
    grant_type: string;
    username: string;
    password: string;
}
export const Service = {
    getTokenApi,
}
export const servicePattern = {
    getToken: '/Token',
}

function getTokenApi(data:tokenRequest) {
    return apiFormUrlEncoded.post(`${servicePattern.getToken}`, data)
}