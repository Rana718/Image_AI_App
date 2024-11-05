import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { House } from 'lucide-react-native';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen 
                name="index" 
                options={{ 
                    title: "Home", 
                    tabBarIcon: ({ color, size }) => <House color={color} size={size} /> 
                }} 
            />
            <Tabs.Screen 
                name="collection" 
                options={{ 
                    title: "Collection", 
                    tabBarIcon: ({ color, size }) => <House color={color} size={size} /> 
                }} 
            />
            <Tabs.Screen 
                name="profile" 
                options={{ 
                    title: "Profile", 
                    tabBarIcon: ({ color, size }) => <House color={color} size={size} />
                }} 
            />
        </Tabs>
    );
}
