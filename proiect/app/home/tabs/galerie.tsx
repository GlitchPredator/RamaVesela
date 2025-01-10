import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, useCallback } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { useFocusEffect } from '@react-navigation/native';

const happyRamaFolder = "Rama Vesela";

export default function Gallery() {
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [permission, setPermission] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const requestMediaLibraryPermissions = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    setPermission(granted);
  };

  const fetchPhotos = async () => {
    const album = await MediaLibrary.getAlbumAsync(happyRamaFolder);
    if (album) {
      const assets = await MediaLibrary.getAssetsAsync({
        album: album.id,
        first: 50,
        sortBy: [MediaLibrary.SortBy.creationTime],
      });
      setPhotos(assets.assets);
    }
  };

  const openImageModal = (uri: string, id: string) => {
    setSelectedImage(uri);
    setSelectedImageId(id);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedImageId(null);
    setModalVisible(false);
  };

  const deleteImage = async () => {
    if (selectedImageId) {
      try {
        await MediaLibrary.deleteAssetsAsync([selectedImageId]);
        Alert.alert('Imagine ștearsă', 'Imaginea a fost ștearsă cu succes.');
        closeImageModal();
        fetchPhotos();
      } catch (error) {
        Alert.alert('Eroare', 'Nu s-a putut șterge imaginea.');
      }
    }
  };

  useEffect(() => {
    requestMediaLibraryPermissions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (permission) {
        fetchPhotos();
      }
    }, [permission])
  );

  if (!permission) {
    return (
      <LinearGradient
        colors={['#ff7e5f', '#feb47b']}
        style={styles.gradientContainer}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>ATENȚIE! ⚠️</Text>
          <Text style={styles.text}>
            Pentru a putea accesa galeria trebuie să acorzi permisiunea aplicației.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={requestMediaLibraryPermissions}
          >
            <Text style={styles.buttonText}>Acordă permisiunile</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  if (photos.length === 0) {
    return (
      <LinearGradient
        colors={['#ff7e5f', '#feb47b']}
        style={styles.gradientContainer}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Galerie goală</Text>
          <Text style={styles.text}>
            Nu există imagini în albumul "{happyRamaFolder}".
          </Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openImageModal(item.uri, item.id)}>
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />
      {selectedImage && (
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeImageModal}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalClose} onPress={closeImageModal}>
              <Text style={styles.modalCloseText}>×</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.deleteButton} onPress={deleteImage}>
              <Text style={styles.deleteButtonText}>Șterge</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ...StyleSheet.flatten({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    image: {
      width: 100,
      height: 100,
      margin: 5,
      borderRadius: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalClose: {
      position: 'absolute',
      top: 50,
      right: 20,
      zIndex: 10,
    },
    modalCloseText: {
      fontSize: 32,
      color: '#fff',
      fontWeight: 'bold',
    },
    fullImage: {
      width: '90%',
      height: '70%',
      marginBottom: 20,
    },
    deleteButton: {
      backgroundColor: '#ff4d4d',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  }),
});
