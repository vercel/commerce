import { ReactNode, useState } from "react";
import { ModalAuthenContext } from "./ModalAuthenContext";

type Props = {
    children: ReactNode;
};

export function ModalAuthenProvider({ children }: Props) {
    const [visible, setVisible] = useState<boolean>(false);
    const [modalAuthenMode, setModalAuthenMode] = useState<'register'>()
    const [initialEmail, setInitialEmail] = useState<string>()
    const [disableRedirect, setDisableRedirect] = useState<boolean>()

    const closeModalAuthen = () => {
        setVisible(false);
    };

    const openModalAuthen = (email?: string, mode?: 'register', disableRedirect = false) => {
        setVisible(true);
        setModalAuthenMode(mode)
        setInitialEmail(email)
        setDisableRedirect(disableRedirect)
    };

    const toggleModalAuthen = () => {
        setVisible(!visible);
    };

    return (
        <>
            <ModalAuthenContext.Provider
                value={{
                    modalAuthenVisible: visible,
                    closeModalAuthen,
                    openModalAuthen,
                    toggleModalAuthen,
                    modalAuthenMode,
                    initialEmail,
                    disableRedirect

                }}>
                {children}
            </ModalAuthenContext.Provider>
        </>
    );
}