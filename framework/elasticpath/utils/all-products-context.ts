import React from "react";
import { Product } from '@commerce/types/product';

const AllProductContext = React.createContext<Product>({
    id: '',
    name: '',
    description: '',
    images: [],
    variants: [],
    price: {
        value: 0
    },
    options: [],
});

export default AllProductContext;