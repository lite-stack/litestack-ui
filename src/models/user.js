export default class User {
    constructor(id, email, password, is_active, is_superuser, is_verified, username) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.is_active = is_active;
        this.is_superuser = is_superuser;
        this.is_verified = is_verified;
        this.username = username;
    }
}