import { QueryRecipes } from '@framework/schema'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BlogEmpty, ButtonCommon, RecipeCard, SelectCommon } from 'src/components/common'
import BreadcrumbCommon from 'src/components/common/BreadcrumbCommon/BreadcrumbCommon'
import MenuNavigation from 'src/components/common/MenuNavigation/MenuNavigation'
import PaginationCommon from 'src/components/common/PaginationCommon/PaginationCommon'
import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard'
import { useGetRecipeList } from 'src/components/hooks/recipe'
import { DEFAULT_RECIPES_PAGE_SIZE, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import { getPageFromQuery, getRecipeSortParamFromQuery } from 'src/utils/funtion.utils'
import HeadingCommon from '../../../common/HeadingCommon/HeadingCommon'
import RecipeEmpty from '../RecipeEmpty/RecipeEmpty'
import s from './RecipesList.module.scss'

const BREADCRUMB = [
  {
    name: 'Recipes',
    link: `#`,
  },
]

const OPTIONSLECT = [
  {
    name: 'Lastest Blogs',
    value: 'lastest_blogs',
  },
  {
    name: 'Recent Blogs',
    value: 'recent_blogs',
  },
]

interface Props {
  collections?: {name: string, value: string, slug: string}[]
  recipeList?: RecipeCardProps[]
  total: number
}

const RecipesList = ({collections, recipeList, total }: Props) => {
  const DEFAULT_RECIPES_ARGS = useMemo(
    () => ({
      options:{
        take: DEFAULT_RECIPES_PAGE_SIZE,
      }
    }),
    []
  )
  const [initialQueryFlag, setInitialQueryFlag] = useState<boolean>(true)
  const [optionQueryBlog, setOptionQueryBlog] = useState<QueryRecipes>(DEFAULT_RECIPES_ARGS)
  const { recipes, totalItems, loading } = useGetRecipeList(optionQueryBlog)
  const [selectMobileValue, setSelectMobileValue] = useState<string>();
  const [sortValue, setSortValue] = useState<string>();
  const router = useRouter()

  const onPageChange = (page: number) => {
    router.push(
      {
        pathname: ROUTE.RECIPES,
        query: {
          ...router.query,
          [QUERY_KEY.PAGE]: page,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  // skip
  const firstRender = useRef(true);

  let data:RecipeCardProps[] | undefined = undefined;
  if(initialQueryFlag == true){
      data = recipeList;
  }else{
      data = recipes;
  }

  useEffect(() => {
    firstRender.current = false
    const query = { ...DEFAULT_RECIPES_ARGS } as QueryRecipes
    const page = getPageFromQuery(router.query[QUERY_KEY.PAGE] as string)
    query.options.skip = page * DEFAULT_RECIPES_PAGE_SIZE

    // sort

    // query sort
    const sortQuery = router.query[QUERY_KEY.SORTBY] as string
    if (sortQuery) {
        setSortValue(sortQuery)
    }
    if (sortQuery) {
      query.options.sort = getRecipeSortParamFromQuery(sortQuery) 
    }
    
    // collections
    const categoryQuery = router.query[QUERY_KEY.CATEGORY] as string
    
    if (categoryQuery) {
     
      query.slug = categoryQuery
      
      
      setSelectMobileValue(categoryQuery);
    }

    
    setOptionQueryBlog(query)
    setInitialQueryFlag(false)

  }, [router.query,DEFAULT_RECIPES_ARGS])

  const onSortChange = (value: string) => {
    setSortValue(value)
    router.push({
        pathname: ROUTE.RECIPES,
        query: {
            ...router.query,
            [QUERY_KEY.SORTBY]: value
        }
    },
        undefined, { shallow: true }
    )
  }

  const onChangeCollectionMobile = (value: string)=>{
      router.push({
        pathname: ROUTE.RECIPES,
        query: {
            ...router.query,
            [QUERY_KEY.CATEGORY]: value
        }
    },
        undefined, { shallow: true }
    )
  }
  

 
  return (
    <>
      <div className={s.recipesListWrapper}>
        <div className={s.breadcrumb}>
          <BreadcrumbCommon crumbs={BREADCRUMB} />
        </div>
        <div className={s.recipesListPageMain}>
          <div className={s.categories}>
            <MenuNavigation isSingleSelect={true} path={ROUTE.RECIPES} queryKey={QUERY_KEY.CATEGORY} categories={collections || []} heading="Collections" />
          </div>

          <div className={s.recipesList}>
            <div className={s.recipesHead}>
              <HeadingCommon align="left">SPECIAL RECIPES</HeadingCommon>

                <div className={s.boxSelect}>
                  <div className={s.categorySelectCate}>
                    <label htmlFor="">Collections</label>
                    <div className={s.select}>
                      <SelectCommon
                        options={collections || []}
                        placeholder="Collections"
                        onChange={onChangeCollectionMobile}
                        value={selectMobileValue}
                      />
                    </div>
                  </div>
                  <div className={s.categorySelectSort}>
                    <label htmlFor="">Sort By</label>
                    <div className={s.select}>
                      <SelectCommon options={OPTIONSLECT} value={sortValue} placeholder="Sort By" onChange={onSortChange} />
                    </div>
                  </div>
                </div>
            </div>
            

            <div className={s.inner}>
              <div className={s.boxItem}>
                {
                  (data?.length === 0) && <><RecipeEmpty/> </>
                }
                {(data?.length !== 0) && data?.map((item:RecipeCardProps, index:number) => (
                  <div key={index} className={s.item}>
                    <RecipeCard
                      slug={item.slug}
                      imageSrc={item.imageSrc}
                      title={item.title}
                      description={item.description}
                    />
                  </div>
                ))}
               
              </div>
            </div>
            <div className={s.recipesPagination}>
            {(data?.length !== 0) &&
              <PaginationCommon
                pageSize={DEFAULT_RECIPES_PAGE_SIZE}
                total={totalItems !== undefined ? totalItems : total}
                onChange={onPageChange}
              />
            }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipesList
