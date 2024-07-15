import { useState,useEffect } from "react"
import {Alert} from "react-native"
const useAppwrite = (fn) => {
    
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fn();
      setData(response)
    } catch (error) {
       {
        Alert.alert('Error', error.message);
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
   
    fetchData()
  }, [])

  const refetchData = () => fetchData()
return {data,loading,refetchData}
}

export default useAppwrite