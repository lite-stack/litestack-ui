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
    
    async getServerConsole(id) {
        return await fetchWrapper.get(`${this.baseUrl}/${id}/console-url`);
    }

    async getServersLimit() {
        return await fetchWrapper.get(`${this.baseUrl}/limit`);
    }

    async createServer(server) {
        await fetchWrapper.post(`${this.baseUrl}/from_configuration`, server);
    }
    
    async updateServer(server) {
        await fetchWrapper.patch(`${this.baseUrl}/${server.id}`, server);
    }
    
    async deleteServer(id) {
        await fetchWrapper.delete(`${this.baseUrl}/${id}`);
    }

    async actServer(id, action) {
        await fetchWrapper.patch(`${this.baseUrl}/${id}/state`, action);
    }
}

export default new ServerAPI();