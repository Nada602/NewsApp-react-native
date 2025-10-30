import { ActivityIndicator,View, Text ,StyleSheet,Dimensions} from 'react-native'
import React from 'react'


const {height,width}=Dimensions.get("window")
export default function LoadingSpinner() {
  
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color="##5500dc" />
      <Text>Loading....</Text>
      <Text>PLEASE WAIT TO GET Articles</Text>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        height:height,
        width:width,
        flexDirection:"column",
        backgroundColor:"lightred",
        justifyContent:"center",
        alignItems:"center",textAlign:"center"
    }
})