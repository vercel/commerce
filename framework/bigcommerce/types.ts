import * as Core from '@commerce/types'

export interface Cart extends Core.Cart {
  lineItems: LineItem[]
}

export interface LineItem extends Core.LineItem {}

export interface UpdateLineItemBody extends Core.UpdateLineItemBody {}

export interface UpdateLineItem extends Core.UpdateItemBody {}
