export interface Path {
    group?: string
    transaction?: string
}

export function parse(params: string): Path|null {
    if (params === "") {
        return {};
    }
    const parts = params.split("/");
    const p = parseGroup(parts);
    return p ? p : parseTransaction(parts);
}

function parseGroup(parts: string[]): Path|null {
    if (parts.length !== 2 || parts[0] !== "group") {
        return null;
    }
    return {
        group: parts[1]
    }
}

function parseTransaction(parts: string[]): Path|null {
    if (parts.length !== 4 || parts[0] !== "group" || parts[2] !== "transaction") {
        return null;
    }
    return {
        group: parts[1],
        transaction: parts[3]
    }
}

