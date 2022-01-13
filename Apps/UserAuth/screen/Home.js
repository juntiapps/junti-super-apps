import React from 'react'
import { View, Text, Button } from 'react-native'
import { AuthContext } from '../context/AuthContext'

export default function Home() {
    const {signOut,user} = React.useContext(AuthContext)
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Home Page, </Text>
            <Button title='LOGOUT' onPress={()=>signOut()}></Button>
        </View>
    )
}
