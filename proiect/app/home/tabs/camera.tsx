import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Button } from 'react-native';
import { CameraView, CameraType, useCameraPermissions, FlashMode} from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { useState } from 'react';
import { firebaseConfig } from '@/config/firebaseConfig';
import { CustomButton } from '@/app/customButton';

initializeApp(firebaseConfig);

const auth = getAuth();

export default function Tab() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermissions] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>();
  const [torch, setTorch] = useState<boolean>(false);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takeCameraPhoto = () => {
  }

  const changePhotoFrame = () => {
  }

  const turnFlashLightOn = () => {
    // setFlash(currentState => (currentState === 'on' ? 'off' : 'on'));
    setTorch(currentState => (currentState === true ? false : true));
  }

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <LinearGradient
      colors={['#ff7e5f', '#feb47b']}
      style={styles.gradientContainer}
      >
        <KeyboardAvoidingView style={styles.innerContainer} behavior="padding">
            <Text style={styles.title}>ATENȚIE! ⚠️</Text>
            <Text style={styles.text}>Pentru a putea folosi camera trebuie sa acorzi permisiunea aplicației la senzorul fotografic. 📸</Text>
            <CustomButton
              touchableStyle={styles.button}
              textStyle={styles.buttonText}
              onButtonPress={requestPermissions}
              buttonText='Acorda permisiunile'
            />
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} enableTorch={torch}>
        <View style={styles.buttonContainer}>
          <CustomButton // Revert camera
            touchableStyle={styles.cameraButton}
            textStyle={styles.cameraButtonText}
            onButtonPress={toggleCameraFacing}
            buttonText='↩'
          />
          <CustomButton // Take photo
            touchableStyle={[styles.cameraButton, {left:'35%'}]}
            textStyle={styles.cameraButtonText}
            onButtonPress={takeCameraPhoto}
            buttonText=' [◉] '
          />
          <CustomButton // Change Photo frame
            touchableStyle={[styles.cameraButton, {left:'-15%'}]}
            textStyle={styles.cameraButtonText}
            onButtonPress={changePhotoFrame}
            buttonText='🖼️'
          />
          <CustomButton // Flash light button
            touchableStyle={[styles.cameraButton, {left:'85%', top: '-7%'}]}
            textStyle={styles.cameraButtonText}
            onButtonPress={turnFlashLightOn}
            buttonText='💡'
          />
        </View>
      </CameraView>
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
    flex:1,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 90,
    backgroundColor: '#ff7e5f',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex:1,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    height: 50,
    width: 90, 
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff7e5f',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    left: '85%',
    top: '95%',
  },
  cameraButtonText: {
    color: '#ffffff',
    fontSize: 22, 
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,   
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
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
    textAlign: 'center'
  },
  highlight: {
    fontWeight: 'bold',
    color: '#ff7e5f'
  },
});