import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Tab() {
  return (
    <View style={styles.container}>
        <LinearGradient
            colors={['#ff7e5f', '#feb47b']}
            style={styles.gradientContainer}
        >
            <View>
            <Text style={styles.userContainer}>Camera</Text>
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