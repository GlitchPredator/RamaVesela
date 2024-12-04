import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { FirebaseError, initializeApp} from 'firebase/app';
import { firebaseConfig } from '../../../config/firebaseConfig';
import { router } from "expo-router";

initializeApp(firebaseConfig);
const auth = getAuth();

const signOut = async () => {
  try {
    auth.signOut();
    // @ts-ignore
    router.replace('/');
  }
  catch(error) {
    const infoMessage = error as FirebaseError;

    console.log('error: ', infoMessage);
  }
}

export default function Tab() {
  return (
    <View style={styles.container}>
        <LinearGradient
            colors={['#ff7e5f', '#feb47b']}
            style={styles.gradientContainer}
        >
          <KeyboardAvoidingView style={styles.innerContainer} behavior="padding">
          <Text style={styles.title}>Profil utilizator ☕</Text>
          <Text style={styles.text}>Utilizator: <Text style={styles.highlight}>{auth.currentUser?.email}</Text></Text>
          <Text style={styles.text}>Cont creat: <Text style={styles.highlight}>{auth.currentUser?.metadata.creationTime}</Text></Text>
          <Text style={styles.text}>
            Ultima accesare a contului: <Text style={styles.highlight}>
              {auth.currentUser?.metadata.lastSignInTime && new Date(auth.currentUser.metadata.lastSignInTime).toLocaleDateString("ro-RO", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </Text>
          </Text>
          </KeyboardAvoidingView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={signOut}>
                    <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer: {
    flex:1
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#ff7e5f'
  },
});