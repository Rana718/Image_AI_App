import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import ThemedText from './ui/ThemedText'
import { TopBarItem } from '@/constants/ModelInfo'

export default function FeaturedModel() {
    return (
        <View>
            <ThemedText className='font-bold text-2xl mt-5'>
                FEATURED
            </ThemedText>

            <FlatList
                data={TopBarItem}
                numColumns={4}
                renderItem={({ item, index }) => (
                    <View className='flex-1 items-center'>
                        <View className='p-2'>
                            <Image className='w-9 h-9' source={item.icon} />
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()} 
            />
        </View>
    )
}
