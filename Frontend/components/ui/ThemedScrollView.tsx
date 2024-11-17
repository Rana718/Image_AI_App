import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';

interface ThemedScrollViewProps extends ScrollViewProps {
    children: React.ReactNode;
    backgroundColorKey?: keyof typeof Colors['light'];
}

const ThemedScrollView: React.FC<ThemedScrollViewProps> = ({ children, backgroundColorKey = 'primary', style, ...props }) => {
    const { themeColors } = useTheme();

    return (
        <ScrollView style={[{ backgroundColor: themeColors[backgroundColorKey] }, style]} {...props}>
            {children}
        </ScrollView>
    );
};

export default ThemedScrollView;
