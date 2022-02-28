import * as Core from '@vercel/commerce/types/customer'
export type Maybe<T> = T | null
export * from '@vercel/commerce/types/customer'
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

export type Customer = {
    id: Scalars['Int'],
    firstName?: Maybe<Scalars['String']>,
    lastName?: Maybe<Scalars['String']>,
    email?: Maybe<Scalars['String']>,
    userName?: Maybe<Scalars['String']>,
    isAnonymous?: Maybe<Scalars['Boolean']>
}

export type CustomerSchema = Core.CustomerSchema
