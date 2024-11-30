import { useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        {isLoading ? (
          <ActivityIndicator size={'small'} color="#ffffff" style={{ margin: 28 }} />
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Inregistrare</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Autentificare</Text>
            </TouchableOpacity>
          </View>
        )}
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
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
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