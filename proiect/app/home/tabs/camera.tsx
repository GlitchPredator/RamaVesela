import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useRef, useState } from 'react';
import { firebaseConfig } from '@/config/firebaseConfig';
import { CustomButton } from '@/app/customButton';

import * as MediaLibrary from 'expo-media-library';

initializeApp(firebaseConfig);

const auth = getAuth();

export default function Tab() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermissions] = useCameraPermissions();
  const [torch, setTorch] = useState<boolean>(false);
  const [showFrame, setShowFrame] = useState<boolean>(false); // State to toggle the frame
  const cameraRef = useRef<CameraView>(null);

  const happyRamaFolder = "Rama Vesela";

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const takeCameraPhoto = async () => {
    const camRef = cameraRef.current;

    if (camRef) {
      const photo = await cameraRef.current.takePictureAsync();
      const photoUri = photo?.uri ?? '';
      const album = await MediaLibrary.getAlbumAsync(happyRamaFolder);

      const asset = await MediaLibrary.createAssetAsync(photoUri);
      if (album === null) {
        await MediaLibrary.createAlbumAsync(happyRamaFolder, asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
      }
    }
  };

  const changePhotoFrame = () => {
    setShowFrame((prev) => !prev); // Toggle the frame visibility
  };

  const turnFlashLight = () => {
    setTorch((currentState) => !currentState);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.gradientContainer}>
        <KeyboardAvoidingView style={styles.innerContainer} behavior="padding">
          <Text style={styles.title}>ATENȚIE! ⚠️</Text>
          <Text style={styles.text}>
            Pentru a putea folosi camera trebuie sa acorzi permisiunea aplicației la senzorul fotografic. 📸
          </Text>
          <CustomButton
            touchableStyle={styles.button}
            textStyle={styles.buttonText}
            onButtonPress={requestPermissions}
            buttonText="Acorda permisiunile"
          />
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} enableTorch={torch}>
        {/* Frame overlay */}
        {showFrame && (
          <View style={[styles.frameOverlay, { pointerEvents: 'none' }]}>
            <Text style={styles.frameText}>LA MULTI ANI</Text>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <CustomButton
            touchableStyle={[styles.cameraButton, styles.toggleCameraButton]}
            textStyle={styles.cameraButtonText}
            onButtonPress={toggleCameraFacing}
            buttonText="↩"
          />
          <CustomButton
            touchableStyle={[styles.cameraButton, styles.captureButton]}
            textStyle={styles.cameraButtonText}
            onButtonPress={takeCameraPhoto}
            buttonText="[◉]"
          />
          <CustomButton
            touchableStyle={[styles.cameraButton, styles.frameButton]}
            textStyle={styles.cameraButtonText}
            onButtonPress={changePhotoFrame}
            buttonText="🖼️"
          />
          <CustomButton
            touchableStyle={[styles.cameraButton, styles.flashButton]}
            textStyle={styles.cameraButtonText}
            onButtonPress={turnFlashLight}
            buttonText="💡"
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
  camera: {
    flex: 1,
    width: '100%',
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    textAlign: 'center',
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
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cameraButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff7e5f',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cameraButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toggleCameraButton: {
    alignSelf: 'flex-start',
  },
  captureButton: {
    alignSelf: 'center',
  },
  frameButton: {
    alignSelf: 'center',
  },
  flashButton: {
    alignSelf: 'flex-end',
  },
  frameOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 10,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  frameText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'red',
  },
});
