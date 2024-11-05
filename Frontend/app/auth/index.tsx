import { View, Text, Image, useColorScheme } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

export default function Auth() {
    const colorScheme = useColorScheme();
    const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

    return (
        <View>
            <Image
                source={require('@/assets/landing_img.png')}
                className="w-full h-[600px]"
            />

            <View 
                className={`p-6 mt-[-20px] h-[600px] rounded-t-[30px]`}
                style={{backgroundColor: themeColors.background}}
            >
            
                <Text className="text-center text-2xl font-bold"
                    style={{color: themeColors.text}}
                >Welcome To AI World</Text>

                <Text className='pt-4 text-center text-lg'
                    style={{color: themeColors.text}}
                >
                    this is Ai World, where you can find the best AI tools and services.
                </Text>
            </View>
        </View>
    );
}
