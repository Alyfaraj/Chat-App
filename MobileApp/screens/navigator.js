import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import ChatScreen from './ChatScreen';
import JoinScreen from './joinScreen';
import FriendListScreen from './FriendListScreen'



const LoadingStack = createStackNavigator();
const MainStack = createStackNavigator();

const Main=()=>{
    return(
        <MainStack.Navigator   
        screenOptions={{
            gestureEnabled:true,
            headerStyle:{
                backgroundColor:"#0084ff",          
            },
            headerTintColor:"#fff",
            headerTitleAlign:"center",
        }} >
        <LoadingStack.Screen name="Friends" component={FriendListScreen} options={{title:'Users'}} />
        <LoadingStack.Screen name="Chat" component={ChatScreen} 
                options={({ route }) => ({title: route.params.username })}

        />
    </MainStack.Navigator>
    )
}
const AppNav = () => {

    return (
        <NavigationContainer>
            <LoadingStack.Navigator headerMode='none'>
                <LoadingStack.Screen name="Join" component={JoinScreen}  />
                <LoadingStack.Screen name="Main" component={Main} />
            </LoadingStack.Navigator>
        
        </NavigationContainer>
    )
}


export default AppNav;