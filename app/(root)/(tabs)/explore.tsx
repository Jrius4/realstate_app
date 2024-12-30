import {ActivityIndicator, Button, FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Link, router, useLocalSearchParams} from "expo-router";
import React, {useEffect} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "@/lib/global-provider";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import {Card, FeaturedCard} from "@/components/Cards";
import Filters from "@/components/Filters";
import {getLatestProperties, getProperties} from "@/lib/appwrite";
import {useAppwrite} from "@/lib/useAppwrite";
import NoResults from "@/components/NoResults";
import images from "@/constants/images";


export default function Explore() {

    const params = useLocalSearchParams<{query?:string,filter?:string}>()


    const {data:properties, loading,refetch} = useAppwrite({
        fn:getProperties,params:{
            filter:params.filter,
            query:params.query,
            limit:20
        },
        skip:true
    });

    const handleCardPress = (id:string)=>{
        router.push(`/properties/ ${id}`);
    }

    useEffect(() => {
        refetch(
            {
                filter:params.filter!,
                query:params.query!,
                limit:20
            }
        );
    }, [params.filter,params.query]);

    return (
        <SafeAreaView className={'bg-white h-full'}>

            <FlatList
                data={properties}
                keyExtractor={(item,index)=>`${index.toString()}_featured`}
                renderItem={({item,index})=>(
                    <Card item={item} onPress={()=>handleCardPress(item.$id)} />
                )}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                contentContainerClassName={'pb-32 gap-4'}
                ListEmptyComponent={
                    loading?(<ActivityIndicator
                        size={'large'} className={'mt-5 text-primary-300'}
                    />):(<NoResults/>)
                }

                ListHeaderComponent={
                    <View className={'px-5'}>


                        <View className={'flex flex-row items-center justify-between mt-5'}>
                         <TouchableOpacity className={'flex flex-row bg-primary-200 rounded-full items-center justify-center size-11'} onPress={()=>router.back()}><Image source={icons.backArrow} className={'size-5'}/></TouchableOpacity>
                            <Text className={'text-base font-rubik-medium text-black-300'}>Search for your Ideal Home</Text>
                            <TouchableOpacity className={''} onPress={()=>router.push('/profile')}><Image source={icons.bell} className={'w-6 h-6'}/></TouchableOpacity>

                        </View>
                        <View className={'mt-2'}>
                            <Search/>
                        </View>
                        <View className={'mt-2'}>
                            <Filters/>
                        </View>
                        <View className={'flex flex-row items-center justify-between'}>
                            <Text className={'font-rubik-bold text-xl text-black-300 mt-5'}>Found {properties?.length} Properties</Text>
                        </View>

                    </View>
                }
            />



        </SafeAreaView>
    );
}
