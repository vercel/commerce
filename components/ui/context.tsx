import React, { FC } from 'react'

export interface State {
  displaySidebar: boolean
}

const initialState = {
  displaySidebar: false,
}

type Action =
  | {
      type: 'OPEN_SIDEBAR'
    }
  | {
      type: 'CLOSE_SIDEBAR'
    }

export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

export const UIProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' })
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' })

  const value = {
    ...state,
    openSidebar,
    closeSidebar,
  }

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return !state.displaySidebar
        ? {
            ...state,
            displaySidebar: true,
          }
        : state
    }
    case 'CLOSE_SIDEBAR': {
      return state.displaySidebar
        ? {
            ...state,
            displaySidebar: false,
          }
        : state
    }
  }
}
