import { ReactNode, useState,useEffect } from "react";
import { ToggleProductWishlistContext } from "./ToggleProductWishlistContent";
import { QueryFavorite } from "@framework/schema"
import { DEFAULT_PAGE_SIZE,QUERY_KEY } from "src/utils/constanst.utils"
import { useGetFavoriteProduct } from 'src/components/hooks/account'
import { getPageFromQuery } from 'src/utils/funtion.utils'
import { useRouter } from "next/router"

type Props = {
    children: ReactNode;
};

const DEFAULT_FAVORITE_ARGS = {
    options:{
        skip:0, take:DEFAULT_PAGE_SIZE
    }
}

export function ToggleProductWishlistProvider({ children }: Props) {

    const router = useRouter()

    const [optionQueryFavorite, setoptionQueryFavorite] = useState<QueryFavorite>(DEFAULT_FAVORITE_ARGS)
   
    const { itemWishlist, totalItems, mutate }= useGetFavoriteProduct(optionQueryFavorite);


    // skip
    useEffect(() => {
        const query = { ...DEFAULT_FAVORITE_ARGS } as QueryFavorite;
        const page = getPageFromQuery(router.query[QUERY_KEY.PAGE] as string);
        query.options.skip = page * DEFAULT_PAGE_SIZE;
        setoptionQueryFavorite(query);
    },[router.query])

    
    const mutateProductWishlist = ()=>{
        mutate()
    }

    return (
        <>
            <ToggleProductWishlistContext.Provider value={{
                mutateProductWishlist,
                itemWishlist,
                totalItems
            }}>
                {children}
            </ToggleProductWishlistContext.Provider>
        </>
    );
}