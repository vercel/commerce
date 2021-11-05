import { ReactNode, useState,useEffect } from "react";
import { ToggleProductWishlistContext } from "./ToggleProductWishlistContent";
import { QueryFavorite } from "@framework/schema"
import { ACCOUNT_TAB, DEFAULT_PAGE_SIZE,QUERY_KEY, ROUTE } from "src/utils/constanst.utils"
import { useGetFavoriteProduct } from 'src/components/hooks/account'
import { getPageFromQuery } from 'src/utils/funtion.utils'
import { useRouter } from "next/router"
import { ProductCardProps } from "src/components/common/ProductCard/ProductCard";

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
    const { itemsWishlist, totalItems, mutate }= useGetFavoriteProduct(optionQueryFavorite);

    useEffect(() => {
        if (router.asPath === `${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.FAVOURITE}`) {
            const query = { ...DEFAULT_FAVORITE_ARGS } as QueryFavorite;
            const page = getPageFromQuery(router.query[QUERY_KEY.PAGE] as string);
            query.options.skip = page * DEFAULT_PAGE_SIZE;
            setoptionQueryFavorite(query);
        }
    },[router.query, router.asPath])

    
    const mutateProductWishlist = () => {
        if (router.asPath === `${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.FAVOURITE}`) {
            mutate()
        }
    }

    return (
        <>
            <ToggleProductWishlistContext.Provider value={{
                mutateProductWishlist,
                itemsWishlist,
                wishlistIds: itemsWishlist?.map((item: ProductCardProps) => item.id),
                totalItems
            }}>
                {children}
            </ToggleProductWishlistContext.Provider>
        </>
    );
}