import { fetchWrapper } from '@/helpers/fetch-wrapper.js';

class AuthAPI {
    baseUrl = `${import.meta.env.VITE_GATEWAY_URL}/auth`;
    
    async login(user) {
        return await fetchWrapper.post(`${this.baseUrl}/login`, user, true);
    }
    
    async logout(user) {
        return await fetchWrapper.post(`${this.baseUrl}/logout`);
    }
    
    async register(user) {
        await fetchWrapper.post(`${this.baseUrl}/register`, user);
    }
}

export default new AuthAPI();