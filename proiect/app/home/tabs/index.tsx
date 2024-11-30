import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { router } from "expo-router";


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
            <View>
                <Text style={styles.userContainer}>Profil</Text>
            </View>
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
});