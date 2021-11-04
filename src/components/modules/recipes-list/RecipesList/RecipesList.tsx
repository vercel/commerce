import { Collection } from '@commerce/types/collection'
import { Facet, QueryRecipes } from '@framework/schema'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ListBlogCardSkeleton, RecipeCard, SelectCommon } from 'src/components/common'
import BreadcrumbCommon from 'src/components/common/BreadcrumbCommon/BreadcrumbCommon'
import MenuNavigation from 'src/components/common/MenuNavigation/MenuNavigation'
import PaginationCommon from 'src/components/common/PaginationCommon/PaginationCommon'
import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard'
import { useGetRecipeList } from 'src/components/hooks/recipe'
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


const CATEGORYSELECT = [
  {
    name: 'All',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=${OPTION_ALL}`,
  },
  {
    name: 'Malaysian',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=malaysia`,
  },
  {
    name: 'Vietnamese',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=vietnamese`,
  },
  {
    name: 'Thailand',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=thailand`,
  },
  {
    name: 'Indian',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=indian`,
  },
  {
    name: 'Lao',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=lao`,
  },
  {
    name: 'Chinese',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=chinese`,
  },
  {
    name: 'Korean',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=korean`,
  },
  {
    name: 'Japanese',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=japanese`,
  },
  {
    name: 'Western',
    value: `${ROUTE.RECIPES}/?${QUERY_KEY.RECIPES}=western`,
  },
]

const OPTIONSLECT = [
  {
    name: 'Lastest Blogs',
    value: 'lastest-blogs',
  },
  {
    name: 'Recent Blogs',
    value: 'recent-blogs',
  },
]

interface Props {
  collections?:Collection[]
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
  const router = useRouter()
  const [initialQueryFlag, setInitialQueryFlag] = useState<boolean>(true)
  const [optionQueryBlog, setOptionQueryBlog] = useState<QueryRecipes>(DEFAULT_RECIPES_ARGS)
  const { reicpes, totalItems, loading } = useGetRecipeList(optionQueryBlog)
  
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

  useEffect(() => {
    firstRender.current = false
    const query = { ...DEFAULT_RECIPES_ARGS } as QueryRecipes
    const page = getPageFromQuery(router.query[QUERY_KEY.PAGE] as string)
    query.options.skip = page * DEFAULT_RECIPES_PAGE_SIZE

    // sort
    const rs = router.query[QUERY_KEY.SORTBY] as string
    if (rs) {
        setSortValue(rs)
    }
    // collections
    // const categoryQuery = router.query[QUERY_KEY.CATEGORY] as string
    // if (categoryQuery) {
    //   query.input.collectionSlug = categoryQuery
    // }

    const sortQuery = router.query[QUERY_KEY.SORTBY] as string
    if (sortQuery) {
      query.options.sort = getRecipeSortParamFromQuery(sortQuery)
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

  let data;
  if(initialQueryFlag == true){
      data = recipeList;
  }else{
      data = reicpes
  }

  return (
    <>
      <div className={s.recipesListWrapper}>
        <div className={s.breadcrumb}>
          <BreadcrumbCommon crumbs={BREADCRUMB} />
        </div>
        <div className={s.recipesListPageMain}>
          <div className={s.categories}>
            <MenuNavigation path={ROUTE.RECIPES} queryKey={QUERY_KEY.CATEGORY} categories={collections || []} heading="Categories" />
          </div>

          <div className={s.recipesList}>
            <div className={s.recipesHead}>
              <HeadingCommon align="left">SPECIAL RECIPES</HeadingCommon>

                <div className={s.boxSelect}>
                  <div className={s.categorySelectCate}>
                    <label htmlFor="">Categories</label>
                    <div className={s.select}>
                      <SelectCommon
                        options={CATEGORYSELECT}
                        placeholder="Categories"
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
                {data?.map((item, index) => (
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
