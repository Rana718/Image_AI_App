import { View, Text, ToastAndroid, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useRouter } from 'expo-router';
import ThemedView from '@/components/ui/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemedText from '@/components/ui/ThemedText';
import ThemedScrollView from '@/components/ui/ThemedScrollView';
import { Colors } from '@/constants/Colors';

export default function profile() {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { top: safeTop } = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    useEffect(() => {
        ToastAndroid.show("the setting page is still under development", ToastAndroid.LONG);
    }, [])

    return (
        <>
            <Stack.Screen options={{
                headerShown: true,
                title: "Settings",
                headerStyle:{
                    backgroundColor: themeColors.background,
                },
                headerTitleStyle:{
                    color: themeColors.text,
                    fontSize: 32,
                    fontWeight: 'bold',
                }
            }} />
            <ThemedScrollView>
                <ThemedText>Hello</ThemedText>
            </ThemedScrollView>
        </>
    )
}