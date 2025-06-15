import { User } from "../__entities__/user.entity";

export class ReturnUser {
    id: string;
    name: string;
    email: string;
    cellphone: string;
    cpf: string;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.cellphone = user.cellphone;
        this.cpf = user.cpf;
    }
}