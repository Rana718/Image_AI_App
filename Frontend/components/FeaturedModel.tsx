import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ThemedText from './ui/ThemedText'
import { ModelInfo, TopBarItem } from '@/constants/ModelInfo'
import { useRouter } from 'expo-router'

export default function FeaturedModel() {
    const router = useRouter();

    const handleonclick = (data: ModelInfo) => {
        router.push({
            pathname:'/promptpage',
            //@ts-expect-error
            params: data
        })
    }


    return (
        <View>
            <ThemedText className='font-bold text-2xl mt-5'>
                FEATURED
            </ThemedText>


            <View className='flex-row justify-between mt-2'>
                {TopBarItem.map((item, index) => (
                    <TouchableOpacity
                        onPress={()=>handleonclick(item)} key={index}
                        className='flex-1 items-center'
                    >
                        <View className='p-3 bg-slate-700 rounded-full'>
                            <Image className='w-9 h-9' source={item.icon} />
                        </View>

                        <ThemedText className='text-xs text-center px-2'>{item.name}</ThemedText>
                    </TouchableOpacity>
                ))
                }
            </View>
        </View>
    )
}
