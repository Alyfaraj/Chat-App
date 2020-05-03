import React from 'react'
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
const FriendListScreen = (props) => {
    const users = useSelector(state => state.usersOnline)
    const chat = (userId,username) => { props.navigation.navigate('Chat', { userId: userId ,username:username}) }
    const Item = (props) => (
        <TouchableOpacity
            onPress={() => chat(props.userId,props.username)}
            style={{
                flexDirection: 'row',
                flex: 1, padding: 10, alignItems: 'center',
                borderRadius: 22,
                borderColor: "#0084ff",
                margin: 4,
                borderWidth: 1
            }} >
            <Image
                style={{
                    width: Dimensions.get('window').width / 7,
                    height: Dimensions.get('window').width / 7,
                    borderRadius: 50,
                    borderWidth:2,
                    borderColor:'#0084ff'
                }}
                source={{ uri: props.uri }} />
            <Text style={{ fontWeight: 'bold', fontSize: 22, marginStart: 15 }} >{props.username}</Text>
        </TouchableOpacity>
    )
    return (
        <View style={{ flex: 1, padding: 5 }} >
            <FlatList
                data={users}
                renderItem={({ item }) => {
                    return <Item
                        username={item.username}
                        uri={item.avatar}
                        userId={item.userId}
                    />
                }
                }
            />
        </View>
    )
}
export default FriendListScreen