import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'

export default function Banner() {
    const { themeColors } = useTheme();
    
    return (
        <View className='mt-8'>
            <View className='relative w-full'>
                <Image 
                    className='w-full h-52 rounded-3xl' 
                    source={require('@/assets/images/banner.png')} 
                />
                <View 
                    className='absolute w-full h-52 inset-0 rounded-3xl' 
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        shadowColor: themeColors.text,
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.25,
                        shadowRadius: 12,
                    }}
                />

                <View className='absolute top-0 left-0 p-6'>
                    <Text className='text-white font-bold text-4xl pl-4' 
                        style={{
                            textShadowColor: 'rgba(0,0,0,0.4)',
                            textShadowOffset: { width: 2, height: 2 },
                            textShadowRadius: 5,
                        }}>
                        Turn Words
                    </Text>
                    <Text 
                        className='font-bold text-4xl pl-4'
                        style={{
                            color: themeColors.accent,
                            textShadowColor: 'rgba(0,0,0,0.4)',
                            textShadowOffset: { width: 2, height: 2 },
                            textShadowRadius: 5,
                        }}>
                        Into ART
                    </Text>
                </View>
            </View>

            <TouchableOpacity 
                className='absolute bottom-4 right-8 px-6 py-3 rounded-2xl'
                style={{
                    backgroundColor: themeColors.accent,
                    shadowColor: themeColors.accent,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                }}
            >
                <Text className='text-white font-bold text-lg'>Explore</Text>
            </TouchableOpacity>
        </View>
    )
}
