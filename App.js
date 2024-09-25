
// JSX
// import { Component } from "react";
// import { StatusBar } from 'expo-status-bar';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs } from "firebase/firestore";
// import {db} from './config';

import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, { useState } from 'react';





import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { initializeApp} from 'firebase/app';



import { firebaseConfig } from './api/firebase-config.js';

import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSharedValue } from 'react-native-reanimated';



function HomeScreen({navigation}){
	return (
    <Text style={{fontSize:17, fontWeight:'400', color:'blue'}}>Home</Text>)
	
}

const height = useSharedValue(0);
  const activateAnimation = () => {
    height.value += 100;
  }

function Login({navigation}){
  
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  
  const app=initializeApp(firebaseConfig); // Crio a conexão com o firebase
  
  const auth=getAuth(app); // Acesso o recurso
  
  
  
  const handleCreateAccount=()=>{
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>
      {
        console.log ('Conta Criada!');
        const user=userCredential.user;
        console.log(user)
        Alert.alert('Cadastrado com Sucesso!')
      })
      .catch(error=>{
        console.log(error)
        Alert.alert(error.message)
      })
  }
  
  const handleSignIn=()=>{
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>
      {
        console.log ('Usuário Logado!');
        const user=userCredential.user;
        console.log (user)
        Alert.alert('LogIn efetuado com sucesso!');
        navigation.navigate('Home');
      })
      .catch(error=>{
        console.log(error)
        Alert.alert(error.message)
      })
  }
  return (
    <View style={[styles.container, {height}]}>
      
      <ScrollView contentContainerStyle={{
        flex:1,
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
      }}>
        
          <View style={styles.login}>
            
            <View>

              <TextInput style={styles.input} placeholder="E-Mail" onChangeText={(text)=>setEmail(text)}/>
            </View>
          <View>
          
            <TextInput style={styles.input} placeholder="Password" onChangeText={(text)=>setPassword(text)} secureTextEntry={true}/>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={{fontSize:17, fontWeight:'400', color:'white'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
            <Text style={{fontSize:17, fontWeight:'400', color:'white'}}>Criar Conta</Text>
          </TouchableOpacity>
          </View>
       
      </ScrollView>
    </View>
  );
}

//const Stack=createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App(){

  
	activateAnimation(); 
return (
//    <NavigationContainer>
//        <Stack.Navigator initialRouteName="Login">
//          <Stack.Screen name="Login" component={Login} />
//          <Stack.Screen name="Home" component={HomeScreen} />
//          
//        </Stack.Navigator>
//    </NavigationContainer>

<NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
</NavigationContainer>


);
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02183b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width:'100%',
    height:'100%',
    resizeMode:'cover',
  },
  login:{
    width:350,
    height:500,
    borderColor:'#fff',
    borderWidth:2,
    borderRadius:10,
    padding:10,
    alignItems:'center',
  },
  profilePicture:
  {
     width:100,
     height:100,
     borderRadius:50,
     borderColor:'#fff',
     borderWidth:1,
     marginVertical:30,
  },
  input: {
    width:250,
    height:40,
    borderColor:'#4d8aeb',
    borderWidth:3, 
    padding:10,
    marginVertival:10,
    backgroundColor:'#ffffff',
    marginBottom: 20,
  },
    button:{
      width:250,
      height:40,
      bordercolor:10,
      backgroundColor:'#00000090',
      alignItems:'center',
      justifyContent:'center',
      marginVertical:10,
      borderColor:'#fff',
      borderWidth:2,
    },
    blurContainer: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
textBoxes:
  {
    width:'90%',
    fontSize:18,
    padding:12,
    borderColor:'gray',
    borderWidth:0.2,
    borderRadius:10
  },
});

//export default App;

