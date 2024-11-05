import { View, Image, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRouter } from "expo-router";
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';

export default function Auth() {
    const router = useRouter();
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <View>
            <Image
                source={require('@/assets/landing_img.png')}
                className="w-full h-[600px]"
            />

            <ThemedView className={`p-6 mt-[-20px] h-[600px] rounded-t-[30px]`}>
            
                <ThemedText className='text-center text-2xl font-bold'>
                    Welcome To AI World
                </ThemedText>

                <ThemedText className="pt-4 text-center text-lg" colorKey="lightText">
                    This is AI World, where you can find the best AI tools and services.
                </ThemedText>

                <TouchableOpacity className='flex items-center justify-center' onPress={()=> router.push('/auth/login')}>
                    <View className='w-[80%] p-5 rounded-full mt-5 bg-tint'>
                        <Text className='text-center text-white font-bold text-xl'>Continue</Text>
                    </View>
                </TouchableOpacity>
            </ThemedView>
        </View>
    );
}
