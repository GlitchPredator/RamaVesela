import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from '@/config/firebaseConfig';

initializeApp(firebaseConfig);
const auth = getAuth();

export default function Tab() {
  return (
    <View style={styles.container}>
        <LinearGradient
            colors={['#ff7e5f', '#feb47b']}
            style={styles.gradientContainer}
        >
            <View>
            <Text style={styles.userContainer}>Galerie</Text>
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
});