import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity,Alert} from 'react-native';
import {Link, Redirect} from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";
import {login} from "@/lib/appwrite"
import {useGlobalContext} from "@/lib/global-provider";

const SignIn = () => {

    const {refetch,loading,isLoggedIn} = useGlobalContext();

    if(!loading && isLoggedIn) return <Redirect href={'/'}/>

    const   handleLogin = async()=> {
       const result = await login();

       if(result){
           refetch();
           console.log('Login Successful');
       }
       else{
           Alert.alert('Error', 'Login Failed');
       }
    }

    return (
        <SafeAreaView className="bg-white h-full">
           <ScrollView contentContainerClassName="h-full" >
               <Image source={images.onboarding} className="w-full h-4/6" resizeMode="center"/>
               <View className={'px-10'}>
                   <Text className={'text-base text-center uppercase font-rubik text-black-200'}>
                       Welcome to ReStates
                   </Text>
                   <Text className={'text-3xl font-rubik-bold text-black-200 text-center mt-2'} >
                       Let's Get You Closer to {"\n"} <Text className={'text-primary-300'}>Your Ideal Home</Text>
                   </Text>
                   <Text>
                          <Link href={'/sign-in'} className={'text-primary-300 text-center'}>Create an Account</Link>
                   </Text>
                   <Text className={'text-lg font-rubik text-black-200 text-center mt-12'}>Login to ReState with Google</Text>
                   <TouchableOpacity onPress={handleLogin} className={'bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5'}>
                       <View className={'flex flex-row items-center justify-center'}>
                           <Image source={icons.google} className={'w-5 h-5'} resizeMode={'contain'}/>
                            <Text className={'text-lg font-rubik-medium text-black-300 ml-2'}>Sign in with Google</Text>
                       </View>
                   </TouchableOpacity>
               </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SignIn;