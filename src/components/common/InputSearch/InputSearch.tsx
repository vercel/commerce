import React from 'react';
import { IconSearch } from 'src/components/icons';
import { LANGUAGE } from 'src/utils/language.utils';
import { Inputcommon } from '..';

interface Props {
    onChange?: (value: string | number) => void,
    onEnter?: (value: string | number) => void,
    value: string | number
}

const InputSearch = ({ onChange, onEnter, value }: Props) => {


    return (
        <Inputcommon placeholder={LANGUAGE.PLACE_HOLDER.SEARCH}
            value={value}
            styleType='custom'
            icon={<IconSearch />}
            onChange={onChange}
            onEnter={onEnter}
        />
    )
}

export default InputSearch
