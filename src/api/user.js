import { fetchWrapper } from '@/helpers/fetch-wrapper.js';

class UserAPI {
    baseUrl = `${import.meta.env.VITE_GATEWAY_URL}/users`;

    async getMe() {
        return await fetchWrapper.get(`${this.baseUrl}/me`);
    }
    
    async getUsers() {
        return await fetchWrapper.get(this.baseUrl);
    }
    
    async deleteUser(id) {
        await fetchWrapper.delete(`${this.baseUrl}/${id}`);
    }
}

export default new UserAPI();