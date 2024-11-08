import React from 'react';
import { ScrollView, ScrollViewProps, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ThemedScrollViewProps extends ScrollViewProps {
    children: React.ReactNode;
    backgroundColorKey?: keyof typeof Colors['light'];
}

const ThemedScrollView: React.FC<ThemedScrollViewProps> = ({ children, backgroundColorKey = 'primary', style, ...props }) => {
    const colorScheme = useColorScheme();
    const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

    return (
        <ScrollView style={[{ backgroundColor: themeColors[backgroundColorKey] }, style]} {...props}>
            {children}
        </ScrollView>
    );
};

export default ThemedScrollView;
