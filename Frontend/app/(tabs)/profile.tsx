import { View, Text, ToastAndroid, useColorScheme, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import ThemedView from '@/components/ui/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemedText from '@/components/ui/ThemedText';
import ThemedScrollView from '@/components/ui/ThemedScrollView';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from "@expo/vector-icons";
import CustomSwitch from '@/components/ui/CustomSwitch';
import { useTheme } from '@/context/ThemeContext';

export default function Profile() {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { top: safeTop } = useSafeAreaInsets();
    const { theme, themeColors, toggleTheme } = useTheme();

    useEffect(() => {
        ToastAndroid.show("The settings page is still under development", ToastAndroid.LONG);
    }, []);


    return (
        <>
            <Stack.Screen options={{
                headerShown: true,
                title: "Settings",
                headerStyle: {
                    backgroundColor: themeColors.lightbackground,
                },
                headerTitleStyle: {
                    color: themeColors.text,
                    fontSize: 32,
                    fontWeight: 'bold',
                }
            }} />
            <ThemedScrollView backgroundColorKey='background'>
                <TouchableOpacity className="flex-row justify-between px-5 py-4">
                    <ThemedText className='text-[16px] font-medium'>About</ThemedText>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={16}
                        color={themeColors.text}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between px-5 py-4">
                    <ThemedText className='text-[16px] font-medium'>Send Feedback</ThemedText>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={16}
                        color={themeColors.text}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between px-5 py-4">
                    <ThemedText className="text-[16px] font-medium">Privacy Policy</ThemedText>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={16}
                        color={themeColors.text}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between px-5 py-4">
                    <ThemedText className="text-[16px] font-medium">Terms of Use</ThemedText>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={16}
                        color={themeColors.text}
                    />
                </TouchableOpacity>

                {/* Dark Mode Toggle */}
                <View className="flex-row justify-between px-5 pt-4">
                    <ThemedText className="text-[16px] font-medium">Dark Mode</ThemedText>
                    <CustomSwitch onToggle={toggleTheme} isEnabled={theme === 'dark'} />
                </View>

                <TouchableOpacity 
                    className="flex-row justify-between px-5 pt-5 pb-4"
                    // onPress={() => handleLogout()}
                >
                    <Text className="text-[16px] font-bold text-red-500">Logout</Text>
                    <MaterialIcons
                        name="logout"
                        size={24}
                        color={"red"}
                    />
                </TouchableOpacity>
            </ThemedScrollView>
        </>
    );
}
