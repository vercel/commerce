import { LANGUAGE } from "./language.utils";

export function errorMapping(message?: string) {
    if (!message) {
        return LANGUAGE.MESSAGE.ERROR
    }

    switch (message) {
        case 'The provided credentials are invalid':
            return 'The email address or password is incorrect!'
        default:
            return LANGUAGE.MESSAGE.ERROR
    }
}