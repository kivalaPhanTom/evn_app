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
    getToken: 'Token',
}

function getTokenApi(data: tokenRequest) {
    const formData = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return apiFormUrlEncoded.post(
        `${servicePattern.getToken}`,
        formData.toString(),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
    );
}