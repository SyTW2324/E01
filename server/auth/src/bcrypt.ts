import bcrypt from 'bcrypt';

const saltRounds = 10;

export function hash(pass: string): Promise<string> {
    return bcrypt.hash(pass, saltRounds);
}

export function check(pass: string, hash: string): Promise<boolean> {
    return bcrypt.compare(pass, hash);
}
