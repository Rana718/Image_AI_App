import { View, Text, TouchableOpacity, Image, FlatList, ListRenderItem } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import ThemedView from '@/components/ui/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserDetailContext } from '@/context/UserDetailContext';
import ThemedText from '@/components/ui/ThemedText';
import { ImageItem } from '@/types';
import { useRouter } from 'expo-router';

export default function Collection() {
    const { top: safeTop } = useSafeAreaInsets();
    const route = useRouter();
    const API_KEY = process.env.EXPO_PUBLIC_BACKEND_API;
    const [data, setData] = useState<ImageItem[]>([]);
    const [visibleData, setVisibleData] = useState<ImageItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(6);
    //@ts-expect-error
    const { userDetail } = useContext(UserDetailContext);

    useEffect(() => {
        getData();
    }, [data]);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_KEY}/images?email=${userDetail.userEmail}`);
            const data_res = await res.json();
            setData(data_res);
            setVisibleData(data_res.slice(0, itemsToShow));
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handelOnPress = (item: ImageItem) => {
        route.push({
            pathname: '/view',
            params:{
                image: item.image,
                email: item.userEmail,
                isHome: 'true',
            }
        })
    }

    const renderItem: ListRenderItem<ImageItem> = ({ item }) => (
        <TouchableOpacity className='w-1/2 p-2' onPress={()=> handelOnPress(item)}>
            <Image
                className='border border-black'
                source={{ uri: item.image }}
                style={{ width: '100%', height: 150, borderRadius: 10 }}
                resizeMode='cover'
            />
        </TouchableOpacity>
    );

    const handleEndReached = () => {
        if (!loading && itemsToShow < data.length) {
            const newItemsToShow = itemsToShow + 6;
            setItemsToShow(newItemsToShow);
            setVisibleData(data.slice(0, newItemsToShow));
        }
    };

    return (
        <ThemedView className='px-5 flex-1' style={{ paddingTop: safeTop }} backgroundColorKey='background'>
            <ThemedText className='text-3xl font-bold mt-5 mb-3 text-center'>Your Saved Images</ThemedText>
            <FlatList
                data={visibleData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <Text>Loading...</Text> : null}
            />
        </ThemedView>
    );
}
