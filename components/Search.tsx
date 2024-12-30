import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {usePathname, useLocalSearchParams, router} from "expo-router";
import icons from "@/constants/icons";
import {useDebouncedCallback} from "use-debounce";

const Search = () => {
    const path = usePathname();
    const params = useLocalSearchParams();
    const [search, setSearch] = useState(params.query || '');

    const debouncedSearch = useDebouncedCallback((text:string)=>{
        router.setParams({query:text});
    }, 500);

    const handleSearch = (text:string) => {
        setSearch(text);
        debouncedSearch(text);
    }
    return (
        <View className={'flex flex-row items-center justify-between w-full px-4 py-2 rounded-full bg-accent-100 border border-primary-100 mt-5'}>
            <View className={'flex-1 flex flex-row gap-3 items-center justify-start z-50'}>
                <Image source={icons.search} className={'size-6'}/>
                <TextInput onChangeText={handleSearch} value={search.toString()} placeholder={'Search for Apartments..'}
                className={'flex-1 ml-2 text-sm font-rubik text-black-300'}
                />
            </View>
            <TouchableOpacity>
                <Image source={icons.filter} className={'size-6'}/>
            </TouchableOpacity>

        </View>
    )
}
export default Search
const styles = StyleSheet.create({})
