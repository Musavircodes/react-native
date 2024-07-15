import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import CustomButton from './CustomBtn'
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle }: any) => {
    return (
        <View className='justify-center items-center px-4'>
            <Image source={images.empty} className='w-[270px] h-[215px]' resizeMode='contain' />
            <Text className='text-xl text-center mt-2 font-psemibold text-white'>{title}</Text>
            <Text className='font-pmedium text-sm text-gray-100'>{subtitle}</Text>
            <CustomButton
        title="Back to Explore"
        handlePress={() => router.push("/home")}
        containerStyles="w-full my-5"
      />
        </View>

    )
}

export default EmptyState

