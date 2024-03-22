import { TokenClaims } from "../../entities/User"


export interface ITokenStrategy {
    buildToken(claims: TokenClaims): any
    getTokenClaims(token: any): TokenClaims
}

export abstract class TokenStrategy<T> implements ITokenStrategy {
    abstract buildToken(claims: TokenClaims): T
    abstract getTokenClaims(token: T): TokenClaims
}