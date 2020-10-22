import React, { FC } from 'react'
import { ThemeProvider } from 'next-themes'
import { SSRProvider, OverlayProvider } from 'react-aria'

export interface State {
  displaySidebar: boolean
  displayDropdown: boolean
}

const initialState = {
  displaySidebar: false,
  displayDropdown: false,
}

type Action =
  | {
      type: 'OPEN_SIDEBAR'
    }
  | {
      type: 'CLOSE_SIDEBAR'
    }
  | {
      type: 'OPEN_DROPDOWN'
    }
  | {
      type: 'CLOSE_DROPDOWN'
    }

export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      }
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
      }
    }
    case 'OPEN_DROPDOWN': {
      return {
        ...state,
        displayDropdown: true,
      }
    }
    case 'CLOSE_DROPDOWN': {
      return {
        ...state,
        displayDropdown: false,
      }
    }
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' })
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' })

  const openDropdown = () => dispatch({ type: 'OPEN_DROPDOWN' })
  const closeDropdown = () => dispatch({ type: 'CLOSE_DROPDOWN' })

  const value = {
    ...state,
    openSidebar,
    closeSidebar,
    openDropdown,
    closeDropdown,
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

export const ManagedUIContext: FC = ({ children }) => (
  <UIProvider>
    <ThemeProvider>
      <SSRProvider>
        <OverlayProvider>{children}</OverlayProvider>
      </SSRProvider>
    </ThemeProvider>
  </UIProvider>
)
