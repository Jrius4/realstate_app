import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import images from "@/constants/images";
import icons from "@/constants/icons";
import {Models} from "react-native-appwrite";


interface  CardProps {
    item:Models.Document;
    onPress?:()=>void;
}
export const FeaturedCard = ({onPress,item:{name,address,image,rating, price}}:CardProps) => {
    return (
        <TouchableOpacity onPress={onPress} className={'flex flec-col items-start w-60 h-80 relative'}>
           <Image source={{uri:image}} className={'size-full rounded-2xl'}/>
            <Image source={images.cardGradient} className={'size-full rounded-2xl absolute bottom-0'}/>
            <View className={'flex flex-row items-center bg-white/90 py-1.5 px-1.5 rounded-full absolute top-5 right-5'}>
                <Image source={icons.star} className={'size-3.5'}/>
                <Text className={'text-primary-300 ml-1 text-sm font-rubik-bold'}>{rating}</Text>
            </View>
            <View className={'flex flex-col items-start absolute bottom-5 inset-x-5'}>
                <Text className={'text-white text-xl font-rubik-extrabold'} numberOfLines={1}>{name}</Text>
                <Text className={'text-white text-base font-rubik'} numberOfLines={2}>{address }</Text>
                <View className={'flex flex-row items-center justify-between w-full mt-2'}>
                    <Text className={'text-white text-xl font-rubik-extrabold'}>${price}</Text>
                    <Image source={icons.heart} className={'size-5'}/>
                </View>
            </View>

        </TouchableOpacity>
    )
}

export const Card = ({onPress,item:{name,address,price,rating,image}}:CardProps)=>{''
    return (
        <TouchableOpacity onPress={onPress} className={'flex-1 w-full mt-4 px-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative'}>
            <View className={'flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50'}>
                <Image source={icons.star} className={'size-3.5'}/>
                <Text className={'text-primary-300 ml-0.5 text-sm font-rubik-bold'}>{rating}</Text>
            </View>
            <Image source={{uri:image}} className={'w-full h-40 rounded-lg'}/>
            <View className={'flex flex-col mt-2'}>
                <Text className={'text-black-300 text-base font-rubik-bold'} >{name}</Text>
                <Text className={'text-black-200 text-xs font-rubik'} >{address}</Text>
                <View className={'flex flex-row items-center justify-between  mt-2 mb-2'}>
                    <Text className={'text-primary-300 text-base font-rubik-bold'}>${price}</Text>
                    <Image source={icons.heart} className={'w-5 h-5 mr-2'} tintColor={'#191d31'}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

