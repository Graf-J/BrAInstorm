import jwt_decode from 'jwt-decode';
import { JWT } from './jwt.model';
import { BehaviorSubject } from 'rxjs';

export class User {
    private _jwt: JWT | null = null;
    private _isAuthenticated = new BehaviorSubject<boolean>(false);

    constructor(jwt: string | null) {
        if (jwt) {
            this._jwt = jwt_decode<JWT>(jwt);
            if (this._jwt.exp > Math.floor(Date.now() / 1000)) {
                this._isAuthenticated.next(true);
            }
        }
    }

    set jwt(jwt: string) {
        this._jwt = jwt_decode<JWT>(jwt);
        if (this._jwt.exp > Math.floor(Date.now() / 1000)) {
            this._isAuthenticated.next(true);
        }
    }

    get id(): number | null {
        if (this._jwt) return this._jwt.userId;
        return null;
    }

    get isAuthenticated(): BehaviorSubject<boolean> {
        return this._isAuthenticated
    }
}