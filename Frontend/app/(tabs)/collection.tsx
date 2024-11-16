import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import ThemedView from '@/components/ui/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemedScrollView from '@/components/ui/ThemedScrollView';
import { UserDetailContext } from '@/context/UserDetailContext';
import ThemedText from '@/components/ui/ThemedText';

export default function Collection() {
    const { top: safeTop } = useSafeAreaInsets();
    const API_KEY = process.env.EXPO_PUBLIC_BACKEND_API;
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    //@ts-expect-error
    const { userDetail } = useContext(UserDetailContext);

    useEffect(() => {
        getData();
    }, [page]);

    const getData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await fetch(`${API_KEY}/images?email=${userDetail.userEmail}&page=${page}&limit=6`);
            const data_res = await res.json();
            setData(data_res);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };
    //@ts-expect-error
    const renderItem = ({ item }) => (
        <View className='w-1/2 p-2'>
            <Image
                source={{ uri: item.image }}
                style={{ width: '100%', height: 150, borderRadius: 10 }}
                resizeMode='cover'
            />
        </View>
    );

    const handleEndReached = () => {
        if (!loading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <ThemedScrollView className='px-5' style={{ paddingTop: safeTop }} backgroundColorKey='background'>
            <ThemedText className='text-2xl font-bold mb-4'>Your Saved Images</ThemedText>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <Text>Loading...</Text> : null}
            />
        </ThemedScrollView>
    );
}
