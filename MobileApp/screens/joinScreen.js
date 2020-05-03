import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';


const joinScreen = (props) => {
    const [userName, setUserName] = useState('')
    const dispatch = useDispatch()
    return (
        <View style={styles.minCon}>
            <View style={styles.TextInp} >
                <TextInput
                    style={{ textAlign: 'center' }}
                    placeholder="Enter UserName" 
                    value={userName}
                    onChangeText={val => setUserName(val)} />
            </View>
            <View style={{ width: "50%", marginTop: 10 }} >
                <Button
                    type="outline"
                    title="Join" onPress={() => {
                        dispatch({ type: "server/join", data: userName });
                        props.navigation.navigate('Main')

                    }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    minCon: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    TextInp: {
        borderColor: "#000",
        borderWidth: .4,
        width: "60%",
        alignItems: 'center',

    }
})

export default joinScreen;