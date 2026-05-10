import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesContext } from '../context/FavoritesContext';
import { API_KEY, BASE_URL, IMG_PATH } from '../config/api';

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('popular'); 
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    fetchMovies();
  }, [filter]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchMovies(searchQuery);
    } else if (searchQuery.length === 0) {
      fetchMovies();
    }
  }, [searchQuery]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/movie/${filter}?api_key=${API_KEY}`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const renderMovie = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: `${IMG_PATH}${item.backdrop_path || item.poster_path}` }} style={styles.image} />
      <View style={styles.cardInfo}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Ionicons 
            name={isFavorite(item.id) ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite(item.id) ? "red" : "white"} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerControls}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterBtn} onPress={() => setFilter(filter === 'popular' ? 'top_rated' : 'popular')}>
          <Text style={styles.filterText}>{filter === 'popular' ? 'Popular' : 'Top Rated'}</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{marginTop: 50}} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', paddingHorizontal: 10 },
  headerControls: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  searchBar: { flex: 1, backgroundColor: '#333', color: '#fff', padding: 10, borderRadius: 8, marginRight: 10 },
  filterBtn: { backgroundColor: '#444', padding: 12, borderRadius: 8 },
  filterText: { color: '#fff', fontSize: 12 },
  card: { backgroundColor: '#222', borderRadius: 10, overflow: 'hidden', marginBottom: 15 },
  image: { width: '100%', height: 200, resizeMode: 'cover' },
  cardInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold', flex: 1 },
});

export default HomeScreen;