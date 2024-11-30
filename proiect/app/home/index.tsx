import { useEffect, useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError, initializeApp } from "firebase/app";
import { firebaseConfig } from '../../config/firebaseConfig';
import { router } from "expo-router";

export default function Page() {
    return (
    <View style={styles.container}>
        <LinearGradient
        colors={['#ff7e5f', '#feb47b']}
        style={styles.gradientContainer}
        >
        <KeyboardAvoidingView style={styles.innerContainer} behavior="padding">
            <View>
                <Image
                style={styles.image}
                source="https://i.ibb.co/hWphS3q/logo.png"
                contentFit="scale-down"
                transition={1000}
                />
            </View>
        </KeyboardAvoidingView>
        </LinearGradient>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    innerContainer: {
      width: '100%',
      maxWidth: 400,
      padding: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 6,
    },
    gradientContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    statusContainer: {
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      marginTop: 50,
      marginBottom: 50,
    },
    button: {
      height: 50,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 25,
      backgroundColor: '#ff7e5f',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      zIndex:1,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
      zIndex: 1
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ffb199',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: '#ffe8e1',
      fontSize: 16,
      color: '#5a2a0c',
    },
    image: {
      height: 200,
      width: '100%',
      resizeMode: 'cover'
    },
  });