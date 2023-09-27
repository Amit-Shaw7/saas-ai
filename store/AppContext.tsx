"use client";

import { ReactNode, createContext, useContext, useState } from "react";

type appContextType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const appContextDefaultValues: appContextType = {
    isOpen: true,
    onOpen: () => { },
    onClose: () => { },
};

const AppContext = createContext<appContextType>(appContextDefaultValues);

export function useApp() {
    return useContext(AppContext);
}

type Props = {
    children: ReactNode;
};

export function AppProvider({ children }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const onOpen = () => {
        setIsOpen(true);
    };
    const onClose = () => {
        setIsOpen(false);
    };

    const value = {
        isOpen,
        onClose,
        onOpen
    }

    return (
        <>
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
        </>
    );
}
