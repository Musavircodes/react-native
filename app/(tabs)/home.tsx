import { FlatList, StyleSheet, Text, View, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '@/context/globalProvider';
import { images } from "../../constants"
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { getAllposts, getTrending } from '@/lib/appwrite';
import useAppwrite from "@/lib/useAppwrite"
import VideoCard from '@/components/VideoCard';

const Home = () => {

  const [refreshing, setRefreshing] = useState(false)
  const { data: posts, refetchData } = useAppwrite(getAllposts)
  const {data:trending} =useAppwrite(getTrending)
  const { user } = useGlobalContext();
  const onRefresh = async () => {
    setRefreshing(true)
    await refetchData()
    setRefreshing(false)
  }
 
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
<VideoCard video ={item}/>        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>Welcome Back</Text>
                {user && <Text className="text-2xl font-psemibold text-white">
                  {user.username}
                </Text>}
              </View>
              <View className='mt-1.5'>
                <Image source={images.logoSmall} resizeMode='contain' className='w-9 h-10' />
              </View>
            </View>
            <SearchInput />
            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>Latest Videos</Text>
              <Trending posts={trending ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found"
            subtitle="Be the first one to upload a video" />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home

