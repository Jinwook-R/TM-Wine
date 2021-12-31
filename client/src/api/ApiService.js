import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080';

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
            console.log(e);
            return axios.get(`${API_BASE_URL}/api/v1/label`, {
                image: e
            });
        })
        .catch((error) => {
            console.log(error);
        });
    console.log(result);
    return result;
}
