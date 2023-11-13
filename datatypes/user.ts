import { GID } from "./group";

export type UID = string;

export interface User {
    email: string;
    groups: {[key: GID]: string};
    image: number;
    name: string;
    pass: string;
    uid: UID;
}
