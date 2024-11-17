import { useColorScheme } from 'react-native'
import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Colors } from '@/constants/Colors';

type ThemeContextType= {
    theme: 'light' | 'dark';
    themeColors: typeof Colors.light | typeof Colors.dark;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemColorsScheme = useColorScheme();
    const [theme, setTheme] = useState<'light' | 'dark'>(systemColorsScheme === 'dark' ? 'dark' : 'light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light' ));
    };

    const themeColors = theme === 'dark' ? Colors.dark  : Colors.light;

    return(
        <ThemeContext.Provider value={{ theme, themeColors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}


export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}