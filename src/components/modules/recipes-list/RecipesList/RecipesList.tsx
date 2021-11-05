import { QueryFilterRecipes, QueryRecipes } from '@framework/schema'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ListBlogCardSkeleton, RecipeCard, SelectCommon } from 'src/components/common'
import BreadcrumbCommon from 'src/components/common/BreadcrumbCommon/BreadcrumbCommon'
import MenuNavigation from 'src/components/common/MenuNavigation/MenuNavigation'
import PaginationCommon from 'src/components/common/PaginationCommon/PaginationCommon'
import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard'
import { useGetRecipeList } from 'src/components/hooks/recipe'
import useFilterRecipeList from 'src/components/hooks/recipe/useFilterRecipeList'
import { DEFAULT_RECIPES_PAGE_SIZE, OPTION_ALL, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import { getPageFromQuery, getRecipeSortParamFromQuery } from 'src/utils/funtion.utils'
import HeadingCommon from '../../../common/HeadingCommon/HeadingCommon'
import s from './RecipesList.module.scss'



const BREADCRUMB = [
  {
    name: 'Special Recipes',
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
  collections?: {name: string, value: string}[]
  recipeList?: RecipeCardProps[]
  total: number
}

const RecipesList = ({collections, recipeList, total }: Props) => {
  const DEFAULT_RECIPES_ARGS = useMemo(
    () => ({
      excludeBlogIds: [],
      options:{
        take: DEFAULT_RECIPES_PAGE_SIZE,
      }
    }),
    []
  )
  const DEFAULT_FILTER_RECIPES_ARGS = useMemo(
    () => ({
      slug: "",
      options:{
        take: DEFAULT_RECIPES_PAGE_SIZE,
      }
    }),
    []
  )
  const router = useRouter()
  const [initialQueryFlag, setInitialQueryFlag] = useState<boolean>(true)
  const [optionQueryBlog, setOptionQueryBlog] = useState<QueryRecipes>(DEFAULT_RECIPES_ARGS)
  const [optionFilterRecipes, setOptionFilterRecipes] = useState<QueryRecipes>(DEFAULT_FILTER_RECIPES_ARGS)
  const { reicpesByFilter, totalItems:totalItemByFilter, loading:loadingByFilter } = useFilterRecipeList(optionFilterRecipes);
  const { reicpes, totalItems, loading } = useGetRecipeList(optionQueryBlog)
  
  const [selectMobileValue, setSelectMobileValue] = useState<string>();
  const [sortValue, setSortValue] = useState<string>();

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

  let data;
  if(initialQueryFlag == true){
      data = recipeList;
  }else{
      data = reicpes
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
     
      const queryFilter = { ...DEFAULT_FILTER_RECIPES_ARGS } as QueryFilterRecipes
      queryFilter.slug = categoryQuery
      if(page){
        queryFilter.options.skip = page * DEFAULT_RECIPES_PAGE_SIZE
      }
      if (sortQuery) {
        queryFilter.options.sort = getRecipeSortParamFromQuery(sortQuery)
      }
      
      
      data = reicpesByFilter;
      setSelectMobileValue(categoryQuery);
      setOptionFilterRecipes(queryFilter);
      setInitialQueryFlag(false)
    }


    

    setOptionQueryBlog(query)
    setInitialQueryFlag(false)

  }, [router.query,DEFAULT_RECIPES_ARGS,DEFAULT_FILTER_RECIPES_ARGS])

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
              {(!initialQueryFlag && loading && !data) && <ListBlogCardSkeleton count={DEFAULT_RECIPES_PAGE_SIZE} isWrap  />}
                {data?.map((item:RecipeCardProps, index:number) => (
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
              <PaginationCommon
                pageSize={DEFAULT_RECIPES_PAGE_SIZE}
                total={totalItems !== undefined ? totalItems : total}
                onChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipesList
