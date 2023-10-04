import ServerBase from "@/models/server.js"

export default class ServerDetailed extends ServerBase {
    constructor(
        id,
        name,
        status,
        public_ip,
        private_ip,
        launched_at,
        terminated_at,
        description,
        flavor,
        image,
        volumes,
        created_at,
        updated_at,
        metadata,
        full_info,
        ) {
        super(id, name, status, public_ip, private_ip, launched_at, terminated_at);
        this.description=description;
        this.flavor=flavor;
        this.image=image;
        this.volumes=volumes;
        this.created_at=created_at;
        this.updated_at=updated_at;
        this.metadata=metadata;
        this.full_info=full_info;
    }
}
