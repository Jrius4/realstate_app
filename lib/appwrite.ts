import {Account, Avatars, Client, OAuthProvider} from "react-native-appwrite";
import * as Linking from "expo-linking";
import {openAuthSessionAsync} from "expo-web-browser";

export const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: 'com.juliuskazibwe.restate'
}

export const client = new Client();
client.setEndpoint(config.endpoint!).setProject(config.project!).setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login(){
   try {

       const redirectUrl = Linking.createURL('/');
       const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUrl);
       if(!response){
           throw new Error('Failed to login');
       };
       const browserResult = await openAuthSessionAsync(response.toString(),redirectUrl);
         if(browserResult.type !== 'success'){
             throw new Error('Failed to login');
         }
         const url = new URL(browserResult.url);
         const secret = url.searchParams.get('secret')?.toString();
         const userId = url.searchParams.get('userId')?.toString();
            if(!secret || !userId){
                throw new Error('Failed to login');
            }
            const session = await account.createSession(userId,secret);
            if(!session){
                throw new Error('Failed to create session');
            }
            return true;
   }catch (e) {
       console.error(e);
       return false;
   }
}

export async function logout(){
    try {
        await account.deleteSession('current');
        return true;
    }catch (e) {
        console.error(e);
        return false;
    }
}

export async function getCurrentUser(){
    try {
        const response = await account.get();
        if(response.$id){
            const userAvatar = await avatar.getInitials(response.name);
           return {
                ...response,
                avatar: userAvatar
           }
        }
        return response;
    }catch (e) {
        console.error(e);
        return null;
    }
}