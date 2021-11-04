import { createContext, useContext } from 'react';

export type ModalAuthenContextType = {
    modalAuthenVisible: boolean;
    toggleModalAuthen: (visible?: boolean) => void;
    openModalAuthen: () => void;
    closeModalAuthen: () => void;
    modalAuthenMode?: 'register'
    initialEmail?: string
    disableRedirect ?: boolean
};
export const DEFAULT_VALUE: ModalAuthenContextType = {
    modalAuthenVisible: false,
    toggleModalAuthen: () => { },
    openModalAuthen: () => { },
    closeModalAuthen: () => { },
};

export const ModalAuthenContext = createContext<ModalAuthenContextType>(DEFAULT_VALUE)

export function useModalAuthen() {
    return useContext(ModalAuthenContext);
}
