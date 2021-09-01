import React from 'react';


interface Props {
    title: string,
    subtitle?: string,
}

const InfoProducts = ({ title, subtitle }: Props) => {
    return (
        <div>
            InfoProducts
            {title}
        </div>
    );
};

export default InfoProducts;