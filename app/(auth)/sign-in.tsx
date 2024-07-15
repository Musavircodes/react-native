import { ScrollView, StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from "../../components/CustomBtn"
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/globalProvider'
const SignIn = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  })


  const [isSubmitting, isSetSumitting] = useState(false)
const {setUser,setIsLogged} = useGlobalContext()
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    isSetSumitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser
      setUser(result)
      setIsLogged(true)
      router.replace('/home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    } finally {
      isSetSumitting(false);
    }
  };
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full min-h-[85vh] justify-center px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]' />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Log in to Aura</Text>
          <FormField title="Email" placeholder="email" value={form.email} handleChangeText={(e: any) => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email-address" />
          <FormField title="Password" placeholder="password" value={form.password} handleChangeText={(e: any) => setForm({ ...form, password: e })} otherStyles="mt-7" />
          <CustomButton title="Sign in" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default SignIn
