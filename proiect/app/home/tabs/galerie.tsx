import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, useCallback } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { useFocusEffect } from '@react-navigation/native';

const happyRamaFolder = "Rama Vesela";

export default function Gallery() {
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [permission, setPermission] = useState(false);

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
    } else {
      setPhotos([]); 
    }
  };

  const toggleSelectPhoto = (id: string) => {
    setSelectedPhotos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((photoId) => photoId !== id)
        : [...prevSelected, id]
    );
  };

  const openImageModal = (uri: string, id: string) => {
    setSelectedImage(uri); 
    setSelectedImageId(id); 
    setIsModalVisible(true); 
  };

  const closeImageModal = () => {
    setSelectedImage(null); 
    setSelectedImageId(null); 
    setIsModalVisible(false); 
  };

  const deleteSelectedImage = async () => {
    if (!selectedImageId) return;

    try {
      setPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo.id !== selectedImageId)
      );

      await MediaLibrary.deleteAssetsAsync([selectedImageId]);
      closeImageModal(); 
      fetchPhotos(); 
    } catch (error) {
      Alert.alert("Eroare", "Imaginea nu a putut fi stearsa!");
    }
  };

  const deleteSelectedPhotos = async () => {
    if (selectedPhotos.length === 0) {
      Alert.alert("Nicio selectie", "Selecteaza o imagine care sa o stergi");
      return;
    }

    try {
      setPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => !selectedPhotos.includes(photo.id))
      );

      await MediaLibrary.deleteAssetsAsync(selectedPhotos);
      setSelectedPhotos([]);
      fetchPhotos();
    } catch (error) {
      Alert.alert("Eroare", "Nu s-au putut sterge imaginile");
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
              style={[
                styles.image,
                selectedPhotos.includes(item.id) && styles.selectedImage,
              ]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />
      {selectedPhotos.length > 0 && (
        <TouchableOpacity style={styles.deleteButton} onPress={deleteSelectedPhotos}>
          <Text style={styles.deleteButtonText}>Șterge {selectedPhotos.length} imagini</Text>
        </TouchableOpacity>
      )}

      {/* Modal for Enlarged Image */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalClose} onPress={closeImageModal}>
            <Text style={styles.modalCloseText}>×</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
          <TouchableOpacity style={styles.modalDeleteButton} onPress={deleteSelectedImage}>
            <Text style={styles.modalDeleteButtonText}>Șterge această imagine</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  selectedImage: {
    borderWidth: 3,
    borderColor: '#ff7e5f',
  },
  deleteButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  modalCloseText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  fullImage: {
    width: '90%',
    height: '70%',
  },
  modalDeleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  modalDeleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
