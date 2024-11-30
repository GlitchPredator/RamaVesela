import { useEffect, useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError, initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebaseConfig';
import { router } from "expo-router";

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [successColor, setSuccessColor] = useState('#ff7e5f');

  initializeApp(firebaseConfig);
  const auth = getAuth();

  const signUp = async () => {
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setInfoMessage('✅ Contul a fost creat cu succes!\nApasa pe \'Autentificare\' pentru a continua.');
      setSuccessColor('#24ed71');
    }
    catch(error) {
      const infoMessage = error as FirebaseError;
      setSuccessColor('#ff7e5f');

      switch(infoMessage.code) {
        case 'auth/invalid-email':
          setInfoMessage('❌ Adresa de email este invalidă!')
          break;
        case 'auth/email-already-in-use':
          setInfoMessage('❌ Adresa de email este deja utilizată!');
          break;
        case 'auth/weak-password':
          setInfoMessage('ℹ️ Folosește o parola mai puternică.\n(Minim 8 caractere: cifre, litere si caractere speciale)');
          break;
        case 'auth/missing-password':
          setInfoMessage('ℹ️ Trebuie sa introduci o parolă');
          break;
        case 'undefined':
          setInfoMessage('');
          break;
        default:
          setInfoMessage('❓A aparut o eroare: ' + infoMessage.code);
          break;
      }
    }
    finally {
      setIsLoading(false);
    }
  }

  const signIn = async () => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email ,password);
      setInfoMessage('✅ Ai fost autentificat cu succes!');
    }
    catch (error) {
      const infoMessage = error as FirebaseError;
      
      switch(infoMessage.code) {
        case 'auth/invalid-email':
        case 'auth/invalid-credential':
          setInfoMessage('ℹ️ Contul introdus nu a fost găsit, date incorecte.')
          break;
        default:
          setInfoMessage('❓A aparut o eroare: ' + infoMessage.code);
          break;
      }
    }
    finally {
      setIsLoading(false);
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      //@ts-ignore
      router.replace('/home');
    }
    else {
    }
  });

  useEffect(() => {
    if (infoMessage) {
      setDisplayText(infoMessage);
    } else {
      setDisplayText('');
    }
  }, [infoMessage]);

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
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Parola"
          secureTextEntry
        />
        <View style={styles.statusContainer}>
          {isLoading ? <ActivityIndicator size={'small'} color="#348ceb" /> : <Text>{displayText}</Text>}
        </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={signUp}>
              <Text style={styles.buttonText}>Inregistrare</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: successColor}]} onPress={signIn}>
              <Text style={styles.buttonText}>Autentificare</Text>
            </TouchableOpacity>
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