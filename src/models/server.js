export default class ServerBase {
    constructor(id, name, status, public_ip, private_ip, launched_at, terminated_at, tags) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.public_ip = public_ip;
        this.private_ip = private_ip;
        this.launched_at = launched_at;
        this.terminated_at = terminated_at;
        this.tags = tags;
    }

    getStatus() {
        switch (this.status) {
            case 'ACTIVE':
                return 'Активний'
            case 'PAUSED':
                return 'На паузі'
            case 'BUILD':
                return 'Створення'
            case 'REBOOT':
                return 'Перезавантаження'
            case 'ERROR':
                return 'Помилка'
            case 'DELETED':
                return 'Видалений'
            default:
                return this.status
        }
    }

    getStatusColor() {
        switch (this.status) {
            case 'ACTIVE':
                return 'green'
            case 'DELETED':
            case 'ERROR':
                    return 'red'
            default:
                return 'blue'
        }
    }
}