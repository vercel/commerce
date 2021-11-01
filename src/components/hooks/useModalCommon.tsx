import { useState } from 'react';

interface Props {
    initialValue?: boolean,
}

const useModalCommon = ({ initialValue = false }: Props) => {
    const [visible, setVisible] = useState<boolean>(initialValue)

    const openModal = (e?: any) => {
        e && e.stopPropagation()
        setVisible(true)
    }

    const closeModal = (e?: any) => {
        e && e.stopPropagation()
        setVisible(false)
    }

    const toggleModal = (e?: any) => {
        e && e.stopPropagation()
        setVisible(!visible)
    }

    return {
        visible, openModal, closeModal, toggleModal,
    }
};

export default useModalCommon