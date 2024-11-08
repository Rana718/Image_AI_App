import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AvatarModelInfo } from '@/constants/ModelInfo'

interface AiModelProps {
    data: AvatarModelInfo[];
}

interface apicall{
    api: string,
    prompt: string
}

export default function AiModel({ data }: AiModelProps) {
    const renderHeader = ({api, prompt}: apicall) => {
        console.log(api, prompt)
    }

    return (
        <FlatList
            data={data}
            className='mt-4 mb-8'
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <TouchableOpacity className='mr-4' onPress={()=>renderHeader({ api: item.api, prompt: item.prompt })}>
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