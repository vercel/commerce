import * as Core from '@commerce/types/page'
export type Maybe<T> = T | null
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    /** The `AnyScalar` type allows any scalar value by examining the input and passing the serialize, parseValue, and parseLiteral operations to their respective types. */
    AnyScalar: any
    /** DateTime custom scalar type */
    DateTime: any
    /** Object custom scalar type */
    Object: any
}

export * from '@commerce/types/page'

export type Page = Core.Page

export type PageTypes = {
    page: Page
}

export type GetPagesQueryParams = {
    documentListName: Maybe<Scalars["String"]>
}

export type GetPageQueryParams = {
    id: Maybe<Scalars["String"]>
    documentListName: Maybe<Scalars["String"]>
}

export type GetAllPagesOperation = Core.GetAllPagesOperation<PageTypes>
export type GetPageOperation = Core.GetPageOperation<PageTypes>
