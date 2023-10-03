export default class ServerBase {
    constructor(name, status, public_ip, private_ip, launched_at, terminated_at) {
        this.name = name;
        this.status = status;
        this.public_ip = public_ip;
        this.private_ip = private_ip;
        this.launched_at = launched_at;
        this.terminated_at = terminated_at;
    }

    getStatus() {
        switch (this.status) {
            case 'active':
                return 'Активний'
            case 'inactive':
                return 'Неактивний'
            default:
                return this.status
        }
    }

    getStatusColor() {
        switch (this.status) {
            case 'active':
                return 'green'
            case 'inactive':
                return 'red'
            default:
                return this.status
        }
    }
}