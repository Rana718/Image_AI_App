import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemedScrollView from '@/components/ui/ThemedScrollView';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import FeaturedModel from '@/components/FeaturedModel';

export default function index() {
    const { top: safeTop } = useSafeAreaInsets();

    return (
        <ThemedScrollView className='px-5' style={{ paddingTop: safeTop}}>
            <Header/>

            <Banner/>

            <FeaturedModel/>
        </ThemedScrollView>
    )
}