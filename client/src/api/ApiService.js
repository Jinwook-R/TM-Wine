import axios from 'axios';
import { API_BASE_URL } from './config';

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export async function wineInfoByImageRequest(data) {
    const result = await toBase64(data)
        .then((e) => {
            return axios.post(`${API_BASE_URL}/api/v1/label/`, {
                image: e
            });
        })
        .catch((error) => {
            console.log(error);
        });
    return result.data;
}

export function wineInfoByKeywordRequest(data) {
    return axios.post(`${API_BASE_URL}/api/v1/keyword/`, data);
}
