import ServerBase from "@/models/server.js";
import ServerDetailed from "@/models/server_detailed.js";
import ServerConfig from "@/models/server_config.js";

class ServerService {
    
    servers = [
        new ServerBase("Назва1", "active", "192.01.01.01", "192.12.12.12", "25.09.2023", "25.09.2023"),
        new ServerBase("Назва2", "active", "192.01.01.01", "192.12.12.12", "25.09.2023", "25.09.2023"),
    ];
    getConfigs() {
        return [
            new ServerConfig("Назва1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."),
            new ServerConfig("Назва2", "Lorem ipsum dolor sit amet, Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."),
            new ServerConfig("Назва3", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."),
            new ServerConfig("Назва4", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."),
            new ServerConfig("Назва5", "Lorem ipsu veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."),
            new ServerConfig("Назва6", "Lorem ipsum dolor sit amet, consectetur adipisc d exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."),
            new ServerConfig("Назва7", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."),
            new ServerConfig("Назва8", "Lorem ipsum dolor sit amet Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."),
            ];
    }
    
    getServers() {
        return this.servers
    }
    
    getServer(name) {
        return new ServerDetailed(
            name, "active", "192.01.01.01", "192.12.12.12", "25.09.2023", "25.09.2023",
            "Опис", "flavor", "image", ["volumes"],  "25.09.2023", "25.09.2023", `{}`,
            `[
                {
    "_id": "651bd4865f8a4ca00c4df447",
    "index": 0,
    "guid": "f4403acb-ee22-45a4-a450-f0088104b99c",
    "isActive": true,
    "balance": "$2,377.89",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "brown",
    "name": "Parks Gaines",
    "gender": "male",
    "company": "GENMEX",
    "email": "parksgaines@genmex.com",
    "phone": "+1 (805) 543-3868",
    "address": "921 Ash Street, Gardiner, Montana, 2059",
    "about": "qwe",
    "registered": "2019-10-27T02:26:45 -02:00",
    "latitude": -35.238959,
    "longitude": -150.965593,
    "tags": [
      "aliquip",
      "in",
      "veniam",
      "est",
      "sint",
      "laborum",
      "enim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Berg Barron"
      },
      {
        "id": 1,
        "name": "Marquez Rasmussen"
      },
      {
        "id": 2,
        "name": "Sondra Brennan"
      }
    ],
    "greeting": "Hello, Parks Gaines! You have 4 unread messages.",
    "favoriteFruit": "banana"
  }
]`
        )
    }
    
    getServersLimit() {
        return 10
    }
    
    
    createServer() {
        return this.servers.push(
            new ServerBase("Створений", "active", "192.01.01.01", "192.12.12.12", "25.09.2023", "25.09.2023"),
        )
    }
    deleteServer(name) {
        return this.servers.filter(item => item.name !== name);
    }
    
    updateServer(name) {
        return this.servers.filter(item => item.name !== name);
    }
}

export default new ServerService();