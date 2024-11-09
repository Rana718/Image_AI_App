import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ModelInfo } from '@/constants/ModelInfo';
import { useRouter } from 'expo-router';

interface AiModelProps {
    data: ModelInfo[];
}


export default function AiModel({ data }: AiModelProps) {
    const router = useRouter();

    const handleonClick = (item: ModelInfo) => {
        router.push({
            pathname: '/promptpage',
            //@ts-expect-error
            params: item,
        })
    }

    return (
        <FlatList
            data={data}
            className='mt-4 mb-8'
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <TouchableOpacity className='mr-4' onPress={()=>handleonClick(item)}>
                    <Image className='w-36 h-44 rounded-2xl' source={{uri: item.image}}/>

                    <View className='absolute w-36 h-44 inset-0 bg-black/20 rounded-2xl'/>
                    <Text className='text-white absolute bottom-3 w-full text-center font-medium'>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )}
        />
    )
}