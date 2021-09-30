import { QueryFacetsArgs } from '@framework/schema'
import { useMemo, useState } from 'react'
import { Layout } from 'src/components/common'
import { useFacets } from 'src/components/hooks/facets'

export default function Test() {
  const [keyword, setKeyword] = useState('c')

  const optionsFilter = useMemo(() => {
    console.log("change options")
    return {
      options: {
        filter: {
          name: {
            contains: keyword
          }
        }
      }
    } as QueryFacetsArgs
  }, [keyword])

  const { items, totalItems } = useFacets(optionsFilter)

  const changeQuery = () => {
    setKeyword('ca')
  }

  return (
    <>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, praesentium.</div>
      <div>
        total: {totalItems}
      </div>
      <div>
        ITEMS: {JSON.stringify(items)}
      </div>
      <button onClick={changeQuery}>change</button>
    </>
  )
}

Test.Layout = Layout
