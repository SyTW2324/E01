import { UID } from "./user";

export type GID = string;

export interface Group {
    gid: GID;
    members: {[key: UID]: string};
    name: string;
}
