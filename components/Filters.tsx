import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {router, useLocalSearchParams} from "expo-router";
import {categories} from "@/constants/data";

const Filters = () => {
    const params = useLocalSearchParams<{filter?:string}>();
    const [selectedCategory,setSelectedCategory] = useState(params.filter || 'All');
    const handleCategory = (category:string) => {

        if(selectedCategory === category){
            setSelectedCategory('All');
            router.setParams({filter:'All'});
            return;
        }
        setSelectedCategory(category);
        router.setParams({filter:category});


    }
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className={'mt-3 mb-2'}>
            {categories.map((category: {title:string,category:string},index:number)=>(
                <TouchableOpacity onPress={()=>handleCategory(category.category)} key={index} className={`px-3 py-1.5 rounded-full ${selectedCategory === category.category ? 'bg-primary-300' : 'bg-primary-100 border border-primary-200'} mr-2`}>
                    <Text  className={`${selectedCategory === category.category ? 'text-white' : 'text-black-300'} font-rubik-medium text-sm`}>{category.title}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
export default Filters;
