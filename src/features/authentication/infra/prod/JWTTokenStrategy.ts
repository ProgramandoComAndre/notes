import { TokenClaims } from "../../entities/User";
import { TokenStrategy } from "../../interfaces/strategy/TokenStrategy";
import { verify, sign, type Jwt, JwtPayload } from 'jsonwebtoken'

type Expiracy = string |number| undefined

type Token = string
class JWTTokenStrategy extends TokenStrategy<string> {
    constructor(public secret: string){
        super()
    }
    buildToken(claims: TokenClaims, expires: Expiracy = undefined): Token {
        try {
        return sign(claims, this.secret, { expiresIn: expires})
        }
        catch(error) {
            throw error
        }
    }

    private toTokenClaims(claims: any) : TokenClaims {
        return  { id: claims.id, email: claims.email}
    }
    getTokenClaims(token: Token): TokenClaims {
        try {
            const tokenClaims:any = verify(token, this.secret)

            return this.toTokenClaims(tokenClaims)
        }
        catch(error) {
            throw error
        }
    }

}