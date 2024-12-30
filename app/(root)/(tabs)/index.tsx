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


export default function Index() {
    const {user} = useGlobalContext();
    const params = useLocalSearchParams<{query?:string,filter?:string}>()
    const {data:latestProperties, loading:lastestPropertiesLoading} = useAppwrite({
        fn:getLatestProperties
    });

    const {data:properties, loading,refetch} = useAppwrite({
        fn:getProperties,params:{
            filter:params.filter,
            query:params.query,
            limit:6
        },
        skip:true
    });

    const handleCardPress = (id:string)=>{
        router.push(`/properties/${id}`);
    }

    useEffect(() => {
        refetch(
            {
                filter:params.filter!,
                query:params.query!,
                limit:6
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
                     <View className={'flex flex-row items-center'}>
                         <Image source={{uri:user?.avatar.toString()}} className={'size-12 rounded-full'}/>
                         <View className={'flex flex-col items-start ml-2 justify-center'}>
                             <Text className={'font-rubik text-xs text-black-100'}>Good Morning</Text>
                             <Text className={'font-rubik-medium text-base text-black-300 capitalize'}>{user?.name}</Text>
                         </View>
                     </View>
                     <Image source={icons.bell} className={'size-6'}/>
                 </View>

                 <View className={'flex flex-row justify-center'}>
                     <Search/>
                 </View>
                 <View className={'flex flex-row items-center justify-between'}>
                     <Text className={'font-rubik-bold text-xl text-black-300 mt-5'}>Featured</Text>
                     <TouchableOpacity className={' mt-5'}>
                         <Text className={'text-primary-300 font-rubik-medium text-base '}>View All</Text>
                     </TouchableOpacity>
                 </View>
                 {lastestPropertiesLoading?(<ActivityIndicator
                     size={'large'} className={'mt-5 text-primary-300'}/>):
                 !lastestPropertiesLoading && latestProperties?.length === 0?(<NoResults/>):(
                     <FlatList data={latestProperties}
                               keyExtractor={(item,index)=>`featured_${index.toString()}`}
                               renderItem={({item,index})=>(
                                   <FeaturedCard item={item}  onPress={()=>handleCardPress(item.$id)}/>
                               )}
                               showsHorizontalScrollIndicator={false}
                               showsVerticalScrollIndicator={false}
                               horizontal={true}
                               contentContainerClassName={'flex gap-5 mt-5'}
                               bounces={false}


                     />
                 )
                 }

                 <View className={'flex flex-row items-center justify-between'}>
                     <Text className={'font-rubik-bold text-xl text-black-300 mt-5'}>Our Recommendation</Text>
                     <TouchableOpacity className={' mt-5'}>
                         <Text className={'text-primary-300 font-rubik-medium text-base '}>View All</Text>
                     </TouchableOpacity>
                 </View>
                 <View>
                     <Filters/>
                 </View>
             </View>
         }
         />



      </SafeAreaView>
  );
}
