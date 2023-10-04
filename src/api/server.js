import { fetchWrapper } from '@/helpers/fetch-wrapper.js';

class ServerAPI {
    baseUrl = `${import.meta.env.VITE_GATEWAY_URL}/servers`;

    async getServerConfigs() {
        return await fetchWrapper.get(`${this.baseUrl}/configurations`);
    }
    
    async getServers() {
        return await fetchWrapper.get(this.baseUrl);
    }
    
    async getServer(id) {
        return await fetchWrapper.get(`${this.baseUrl}/${id}`);
    }
    
    async getServersLimit() {
        return await fetchWrapper.get(`${this.baseUrl}/limit`);
    }
    
    async createServer(server) {
        return await fetchWrapper.post(`${this.baseUrl}/from_configuration`, server);
    }
    
    async updateServer(server) {
        return await fetchWrapper.patch(`${this.baseUrl}/${server.id}`, server);
    }
    
    async deleteServer(id) {
        await fetchWrapper.delete(`${this.baseUrl}/${id}`);
    }
}

export default new ServerAPI();