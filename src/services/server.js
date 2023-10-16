import ServerDetailed from "@/models/server_detailed.js";
import ServerAction from "@/models/server_action.js";
import ServerConfig from "@/models/server_config.js";
import ServerBase from "@/models/server.js";
import ServerAPI from "@/api/server.js"

class ServerService {
    
    actions = [
        new ServerAction("Призупинити", "pause"),
        new ServerAction("Відновити", "unpause"),
        new ServerAction("Запустити", "start"),
        new ServerAction("Стоп", "stop"),
        new ServerAction("Перезавантажити", "reboot"),
        ];
    async getConfigs() {
        let configsJson = await ServerAPI.getServerConfigs()

        let configs = []
        for (let configJson of configsJson) {
            configs.push(new ServerConfig(configJson['name'], configJson['description']))
        }

        return configs
    }
    
    async getServers() {
        let serversJson = await ServerAPI.getServers()
        let servers = []
        for (let serverJson of serversJson) {
            servers.push(new ServerBase(
                serverJson['id'],
                serverJson['name'],
                serverJson['status'],
                serverJson['ip_v4_public'] || serverJson['ip_v6_public'],
                serverJson['ip_v4_private'] || serverJson['ip_v6_private'],
                serverJson['launched_at'],
                serverJson['terminated_at'],
                serverJson['tags'],
                )
            )
        }

        return servers
    }

    async getConfigurableServers() {
        let serversJson = await ServerAPI.getConfigurableServers()
        let servers = []
        for (let serverJson of serversJson) {
            servers.push(new ServerBase(
                serverJson['id'],
                serverJson['name'],
                serverJson['status'],
                serverJson['ip_v4_public'] || serverJson['ip_v6_public'],
                serverJson['ip_v4_private'] || serverJson['ip_v6_private'],
                serverJson['launched_at'],
                serverJson['terminated_at'],
                serverJson['tags'],
            )
            )
        }

        return servers
    }

    async getServer(id) {
        let serverJson = await ServerAPI.getServer(id)
        return new ServerDetailed(
            id,
            serverJson['name'],
            serverJson['status'],
            serverJson['ip_v4_public'] || serverJson['ip_v6_public'],
            serverJson['ip_v4_private'] || serverJson['ip_v6_private'],
            serverJson['launched_at'],
            serverJson['terminated_at'],
            serverJson['tags'],
            serverJson['description'],
            serverJson['flavor'],
            serverJson['image'],
            [],
            serverJson['created_at'],
            serverJson['updated_at'],
            serverJson['metadata'],
            serverJson['full_info'],
        )
    }

    async getServerConsoleURL(id) {
        let console = await ServerAPI.getServerConsole(id)
        return console.url || ''
    }

    getServerActions() {
        return this.actions;
    }
    
    async getServersLimit() {
        let limitResp = await ServerAPI.getServersLimit()
        return limitResp['limit']
    }

    async createServer(server) {
        await ServerAPI.createServer(server)
    }
    async deleteServer(id) {
        return ServerAPI.deleteServer(id);
    }
    
    async updateServer(server) {
        await ServerAPI.updateServer(server);
    }

    async actServer(id, action) {
        await ServerAPI.actServer(id, {
            "action": action
        });
    }

    countsServersByTag(servers) {
        let tagMap = {};
        for (let server of servers) {
            if(server.tags) {
                for (let tag of server.tags) {
                    tagMap[tag] = tagMap[tag] + 1 || 1;
                }
            } else {
                tagMap['Пусті'] = tagMap['Пусті'] + 1 || 1;
            }

        }
        return tagMap;
    }

    async runCommand(server_id, command) {
        await ServerAPI.runServerCommand(server_id, command);
    }
}

export default new ServerService();