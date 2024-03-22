import { TokenClaims } from "../../entities/User";
import { ITokenStrategy } from "../../interfaces/strategy/TokenStrategy";

export class MockTokenStrategy implements ITokenStrategy {
    public tokenClaims: TokenClaims | undefined = undefined
    public token: string = ""
    buildToken(claims: TokenClaims):string {
        this.tokenClaims = claims
        this.token = 'token'
        return this.token
    }
    getTokenClaims(token: any): TokenClaims {
        if(token == this.token)
            return this.tokenClaims!
        throw new Error('Invalid token')
    }

}