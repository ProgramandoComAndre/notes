export interface TokenHelper {
    generateToken: (payload: any) => string
    verifyToken: (token: string) => any
}