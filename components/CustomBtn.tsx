import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'

const CustomButton = ({
    handlePress,title,containerStyles,textStyles,isLoading
}:any) => {
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading?"opacity-50":""}`} disabled={isLoading}>
      <Text className={`text-primary font-psemibold text-lg${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
