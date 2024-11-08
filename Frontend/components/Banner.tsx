import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Banner() {
    return (
        <View className='mt-8'>
            <View className='relative w-full'>
                <Image className='w-full h-52 rounded-2xl' source={require('@/assets/images/banner.png')} />
                <View className='absolute w-full h-52 inset-0 bg-black/20 rounded-2xl' />

                <View className='absolute top-0 left-0 p-4'>
                    <Text className='text-white font-bold text-3xl pl-4'>
                        Turn Words
                    </Text>
                    <Text className='font-bold text-3xl text-yellow-600 pl-4'>
                        Into ART
                    </Text>
                </View>
            </View>

            <TouchableOpacity 
                className='absolute bottom-0 right-4 m-4 px-3 py-2 rounded-lg bg-yellow-600'
            >
                <Text className='text-white font-bold'>Explore</Text>
            </TouchableOpacity>
        </View>
    )
}
