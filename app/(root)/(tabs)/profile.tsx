import {Alert, Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'

import {useAppwrite} from "@/lib/useAppwrite";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import {settings} from "@/constants/data";
import {useGlobalContext} from "@/lib/global-provider";
import {logout} from "@/lib/appwrite";

type SettingsItemProps = {
    icon: ImageSourcePropType;
    title: string;
    onPress?: () => void;
    textStyles?: string;
    showArrow?: boolean;
}

const SettingItem = ({icon,title,onPress,showArrow=true,textStyles}:SettingsItemProps)=>{
    return (
        <TouchableOpacity onPress={onPress}>
            <View className={'flex-row justify-between items-center align-middle py-5 '}>
                <View className={'flex flex-row justify-start gap-3 align-middle'}>
                    <Image source={icon} className={'size-7'}/>
                    <Text className={`text-lg font-rubik-medium text-black-300 ${textStyles}`}>{title}</Text>
                </View>
                {showArrow && <Image source={icons.rightArrow} className={'size-5'}/>}
            </View>
        </TouchableOpacity>
    )
}

const Profile = () => {
    const {user, refetch} = useGlobalContext();


    const handleLogout = async() => {
        const result = await logout();
        if (result) {
           Alert.alert('Success','You have been logged out successfully');
           refetch();
        }else{
            Alert.alert('Error','An error occurred while logging out');
            refetch();
        }
    };
    return (
        <SafeAreaView className={'h-full bg-white'}>
           <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName={'pb-32 px-7'}>
                <View className={'flex flex-row items-center justify-between py-7'}>
                    <Text className={'text-xl  font-rubik-bold'}>Profile</Text>
                   <Image source={icons.bell} className={'size-7'}/>
                </View>

               <View className={'flex-row justify-center flex mt-5'}>
                   <View className={'flex flex-col items-center'}>
                        <Image source={{uri:user?.avatar.toString()}} className={'size-44 relative rounded-full'}/>
                       <TouchableOpacity  className={'absolute bottom-20 right-10'}>
                           <Image source={icons.edit} className={'size-9'}/>
                       </TouchableOpacity>
                       <Text className={'text-2xl font-rubik-bold mt-2'}>{user?.name} {"\n"} Software Engineer</Text>
                   </View>
               </View>
               <View className={'flex flex-col mt-10'}>
                   <SettingItem title={'My Bookings'} icon={icons.calendar}/>
                   <SettingItem title={'Payments'} icon={icons.wallet}/>
               </View>
               <View className={'flex flex-col mt-5 border-t pt-5 border-primary-200'}>
                   {settings.slice(2).map((item,index)=>(
                       <SettingItem key={index} {...item}/>
                   ))}
               </View>
               <View className={'flex flex-col mt-5 border-t pt-5 border-primary-200'}>
                  <SettingItem icon={icons.logout} title={'Logout'} onPress={handleLogout} textStyles={'text-red-500'} showArrow={false}/>
               </View>

           </ScrollView>
        </SafeAreaView>
    )
}
export default Profile
const styles = StyleSheet.create({})
