import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import ThemedText from './ui/ThemedText'
import { useUser } from '@clerk/clerk-expo'
import { Coin } from '@/assets'
import { UserDetailContext } from '@/context/UserDetailContext'

export default function Header() {
    const {user} = useUser();
    //@ts-expect-error
    const {userDetail, setUserDetail} = useContext(UserDetailContext)

    return (
        <View className='pt-2 flex flex-row justify-between items-center'>
            <ThemedText className='text-3xl font-bold'>
                Imagin AI
            </ThemedText>

            <View className='flex flex-row gap-3'>
                <View className=' flex flex-row rounded-full gap-1 px-2 items-center bg-yellow-400 border border-yellow-950'>
                    <Image className='w-8 h-8' source={Coin}/>

                    <Text className='text-white text-xl font-bold'>{userDetail?.credits}</Text>
                </View>

                <Image className='w-10 h-10 rounded-full' source={{uri: user?.imageUrl}}/>
            </View>
        </View>
    )
}