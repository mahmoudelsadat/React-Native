import React, { useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesContext } from '../context/FavoritesContext';
import { IMG_PATH } from '../config/api';

const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.emptyText}>Your Favorite List is Empty</Text>
        <Text style={styles.emptySubText}>Pick up your Favorite Movies</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.favCard}>
            <Image source={{ uri: `${IMG_PATH}${item.poster_path}` }} style={styles.favImage} />
            <View style={styles.favInfo}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subText}>Release Date: {item.release_date}</Text>
              <Text style={styles.subText}>Rates: {item.vote_average}</Text>
              <TouchableOpacity style={styles.removeBtn} onPress={() => removeFavorite(item.id)}>
                <Ionicons name="trash-outline" size={16} color="white" />
                <Text style={styles.removeBtnText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', paddingHorizontal: 10 },
  favCard: { flexDirection: 'row', backgroundColor: '#222', borderRadius: 10, marginBottom: 10, overflow: 'hidden', padding: 10, marginTop: 10 },
  favImage: { width: 80, height: 120, borderRadius: 8 },
  favInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  subText: { color: '#aaa', fontSize: 12, marginTop: 4 },
  removeBtn: { flexDirection: 'row', backgroundColor: '#d9534f', padding: 8, borderRadius: 5, alignSelf: 'flex-start', marginTop: 10, alignItems: 'center' },
  removeBtnText: { color: '#fff', marginLeft: 5, fontSize: 12, fontWeight: 'bold' },
  emptyText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  emptySubText: { color: '#aaa', fontSize: 14, marginTop: 5 }
});

export default FavoritesScreen;