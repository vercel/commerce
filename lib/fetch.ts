import zeitFetch from '@zeit/fetch'

export default typeof window === 'undefined' ? zeitFetch() : fetch
