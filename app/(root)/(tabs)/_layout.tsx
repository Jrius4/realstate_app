import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import icons from "@/constants/icons";

const TabIcon = ({focused, icon,title}   :{focused:boolean;icon:any;title:string;}) => {
    return (
        <View className={'flex-1 mt-3 flex flex-col items-center'}>
            <Image className={'size-6'} source={icon} tintColor={focused?'#0061ff':'#666876'} resizeMode={'contain'}/>
            <Text className={`text-xs mt-1 text-center w-full ${focused?'text-primary-300 font-rubik-medium':'text-black-200 font-rubik'}`}>{title}</Text>
        </View>
    )
}

const TabsLayout = () => {
    return (
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#0061ff',
            tabBarInactiveTintColor: '#000000',
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#ffffff',
                position: 'absolute',
                borderTopColor:'#0061ff',
                borderTopWidth:1,
                minHeight:70,
            },
        }}
        >
            <Tabs.Screen name="index" options={{
                title: 'Home',
                headerShown:false,
                tabBarIcon:({focused})   => <TabIcon icon={icons.home} focused={focused} title={'Home'}/>
            }} />
            <Tabs.Screen name="explore" options={{
                title: 'Explore',
                headerShown:false,
                tabBarIcon:({focused})   => <TabIcon icon={icons.search} focused={focused} title={'Explore'}/>
            }} />
            <Tabs.Screen name="profile" options={{
                title: 'Profile',
                headerShown:false,
                tabBarIcon:({focused})   => <TabIcon icon={icons.person} focused={focused} title={'Profile '}/>
            }} />

        </Tabs>
    )
}
export default TabsLayout
const styles = StyleSheet.create({})
