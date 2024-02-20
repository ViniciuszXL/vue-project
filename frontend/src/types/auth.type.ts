import { UserInterface } from "./user.type";

export interface StateInterface {
    token: string | undefined;
    users: UserInterface[]
}