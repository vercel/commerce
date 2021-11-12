import { LANGUAGE } from "./language.utils";

export function errorMapping(message?: string) {
    if (!message) {
        return LANGUAGE.MESSAGE.ERROR
    }

    switch (message) {
        case 'The provided credentials are invalid':
            return 'The email address or password is incorrect!'
        case 'No items were added to the order due to insufficient stock':
                return 'Out of stock!'
        default:
            return LANGUAGE.MESSAGE.ERROR
    }
}