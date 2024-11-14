import { View, FlatList } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import FeaturedModel from '@/components/FeaturedModel';
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import AiModel from '@/components/AiModel';
import { AvatarModel, StylingModel } from '@/constants/ModelInfo';

export default function index() {
    const { top: safeTop } = useSafeAreaInsets();

    return (
        <ThemedView className='px-5 flex-1' style={{ paddingTop: safeTop }}>
            <FlatList
                data={[1]}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View>
                        <Header />

                        <Banner />

                        <FeaturedModel />

                        <ThemedText className='text-2xl mt-4 font-light'>AVATAR</ThemedText>
                        <AiModel data={AvatarModel}/>

                        <ThemedText className='text-2xl font-light'>STYLE</ThemedText>
                        <AiModel data={StylingModel}/>
                    </View>
                )}
            />
        </ThemedView>

    )
}