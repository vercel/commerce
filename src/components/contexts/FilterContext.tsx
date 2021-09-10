import { createContext, ReactNode, useContext, useState } from "react";
import { filterContextType } from "src/utils/types.utils";

const contextDefaultValues: filterContextType = {
    visible: false,
    open: () => {},
    close: () => {},
};

const FilterContext = createContext<filterContextType>(contextDefaultValues);

export function useAuth() {
    return useContext(FilterContext);
}

type FilterProviderProps = {
    children: ReactNode;
};

export function FilterProvider({ children }: FilterProviderProps) {
    const [visible, setVisible] = useState<boolean>(false);

    const open = () => {
        setVisible(true);
    };

    const close = () => {
        setVisible(false);
    };

    const value = {
        visible,
        open,
        close,
    };
    return (
        <>
            <FilterContext.Provider value={value}>
                {children}
            </FilterContext.Provider>
        </>
    );
}