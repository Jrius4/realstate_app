import {Account, Avatars, Client, Databases, OAuthProvider, Query} from "react-native-appwrite";
import * as Linking from "expo-linking";
import {openAuthSessionAsync} from "expo-web-browser";

export const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: 'com.juliuskazibwe.restate',
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID
}

export const client = new Client();
client.setEndpoint(config.endpoint!).setProject(config.project!).setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

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

export async function getAgents(){
    try {
        const response = await databases.listDocuments(config.databaseId!,config.agentsCollectionId!);
        return response.documents;
    }catch (e) {
        console.error(e);
        return [];
    }
}
export async function getPropertyById({ id }: { id: string }) {
    try {
        const result = await databases.getDocument(
            config.databaseId!,
            config.propertiesCollectionId!,
            id
        );
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export async function getLatestProperties(){
    try {
        const response = await databases.listDocuments(config.databaseId!,config.propertiesCollectionId!,[Query.orderAsc('$createdAt'),Query.limit(5)]);
        return response.documents;
    }catch (e) {
        console.error(e);
        return [];
    }
}
export async function getProperties({filter,query,limit}:{
    filter?:string,
    query?:string,
    limit?:number
}){
    try {
        const buildQuery = [Query.orderAsc('$createdAt'),];
        if(filter && filter !== 'All'){
            buildQuery.push(Query.equal('type',filter));
        }
        if(query){
            buildQuery.push(
                Query.or(
                   [ Query.search('name',query),
                    Query.search('address',query),
                    Query.search('type',query)]
                )
            );
        }

        if(limit){
            buildQuery.push(Query.limit(limit));
        }
        const response = await databases.listDocuments(config.databaseId!,config.propertiesCollectionId!,buildQuery);
        return response.documents;
    }catch (e) {
        console.error(e);
        return [];
    }
}