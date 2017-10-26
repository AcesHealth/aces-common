export interface Permission {
    readonly resource : string;
    readonly operations : Operation[];
}

export type Operation = "C" | "R" | "U" | "D";

export interface Request {
    readonly url : string;
    readonly method : string;
}

export interface Authorization {
    readonly access : "ALLOW" | "DENY";
    readonly endpoints : string[] | null;
}