import ServerBase from "@/models/server.js"
class ServerDetailed extends ServerBase {
    constructor(
        id,
        name,
        status,
        public_ip,
        private_ip,
        launched_at,
        terminated_at,
        tags,
        description,
        flavor,
        image,
        volumes,
        created_at,
        updated_at,
        metadata,
        full_info,
        ) {
        super(id, name, status, public_ip, private_ip, launched_at, terminated_at, tags);
        this.description=description;
        this.volumes=volumes;
        this.created_at=created_at;
        this.updated_at=updated_at;
        this.metadata=metadata;
        this.full_info=full_info;
        this.flavor=new Flavour(flavor);
        if (image) {
            this.image=new Image(image);
        };

    }
}

class Flavour {
    constructor(flavor) {
        this.name=flavor.name
        this.description=flavor.description
        this.ram=flavor.ram
        this.vcpus=flavor.vcpus
        this.disk_size=flavor.disk_size
        this.swap_size=flavor.swap_size
        this.ephemeral_size=flavor.ephemeral_size
    }
}

class Image {
    constructor(image) {
        this.name=image.name
        this.min_disk_size=image.min_disk_size
        this.min_ram_size=image.min_ram_size
        this.status=image.status
        this.size=image.size
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
}

export default ServerDetailed;
