export interface AuthPayload {
    email: string;
    password: string;
}

export interface AuthJwtDecode {
    id: string,
    iat: number,
    exp: number
}