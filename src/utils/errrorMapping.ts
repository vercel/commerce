import { ErrorCode } from "src/domains/enums/ErrorCode";
import { LANGUAGE } from "./language.utils";

export function errorMapping(errorCode?: string) {
    if (!errorCode) {
        return LANGUAGE.MESSAGE.ERROR
    }

    switch (errorCode) {
        case ErrorCode.NotVerifiedError:
                return 'Please verify your email before login!'
        case ErrorCode.InvalidCredentialsError:
            return 'The email address or password is incorrect!'
        case ErrorCode.InsufficientStockError:
                return 'Out of stock!'
        default:
            return LANGUAGE.MESSAGE.ERROR
    }
}