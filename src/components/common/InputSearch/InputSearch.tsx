import React from 'react';
import { IconSearch } from 'src/components/icons';
import { LANGUAGE } from 'src/utils/language.utils';
import { Inputcommon } from '..';

interface Props {
    onChange?: (value: string | number) => void,
    onEnter?: (value: string | number) => void,
}

const InputSearch = ({ onChange, onEnter }: Props) => {
    return (
        <Inputcommon placeholder={LANGUAGE.PLACE_HOLDER.SEARCH}
            styleType='custom'
            icon={<IconSearch />}
            onChange={onChange}
            onEnter={onEnter}
        />
    )
}

export default InputSearch
