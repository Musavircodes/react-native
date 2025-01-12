import { StatusBar } from "expo-status-bar";
import { Text,View,Image, ScrollView } from "react-native";
import { Link,router,Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "../components/CustomBtn";
import { useGlobalContext } from "@/context/globalProvider";

export default function App(){
  const {isLogged,loading} = useGlobalContext();
 
  if(!loading && isLogged) return <Redirect href="/home"/>
  return(
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{height:"100%"}}>
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
           
            <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain"/>
            <Image source={images.cards} className="max-w-[380px] h-[300px]" resizeMode="contain"/>
<View className="relative mt-5">
<Text className="text-3xl text-white font-bold text-center">Discover Endless Possibilities with 
  {' '}<Text className="text-secondary-200">Auro</Text>
</Text>
<Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-8" resizeMode="contain"/>
</View>
<Text className="font-pregular text-sm text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Auro</Text>
<CustomButton title="Continue with Email" containerStyles="w-full mt-7" handlePress={() => router.push("/sign-in")}/>
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light"/>
      </SafeAreaView>
  )
}

