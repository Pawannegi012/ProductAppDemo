import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    FlatList,
    TextInput,
    BackHandler,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import Products from '../../components/Card';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  import styles from './styles';
  import {useFocusEffect} from '@react-navigation/native';
  import { RNToasty } from 'react-native-toasty';
  
  const {width, height} = Dimensions.get('window');
  
  const Home = ({navigation, setToken}) => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState('');
  
    useEffect(() => {
      loadProducts();
    });
  
    const handleLogout = async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        setToken(false);
        navigation.navigate('Login'); 
      } catch (e) {
        console.log(e);
      }
    };
  
    const loadProducts = async () => {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    };
  
    const handleDeleteProduct = id => {
      setProducts(prevProducts =>
        prevProducts.filter(product => product.id !== id),
        RNToasty.Show({
          title: 'Product Deleted!',
          position: 'center',
        })
      );
    };
  
    useFocusEffect(
      React.useCallback(() => {
        const onBackPress = () => {
          BackHandler.exitApp();
  
          return true;
        };
  
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }, []),
    );
    
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
          

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View></View>
        <ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="chevron-back-sharp" size={25} color="gray" />
            </TouchableOpacity>
  
            {!visible && (
              <TextInput
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchText}
                placeholderTextColor={'lightgray'}
              />
            )}  
  

  
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => setVisible(!visible)}>
              <FontAwesome name="search" size={17} color="gray" />
            </TouchableOpacity>
          </View>
          <Text style={styles.shop}>Hi-Fi Shop & Service</Text>
          <Text style={styles.heading1}>Audio shop on Rustaveli Ave 57</Text>
          <Text style={styles.heading2}>This shop offers both products and services</Text>
         
          <View style={styles.FirstBox}>
            <Text style={styles.products}> Products</Text>
              <Text style={styles.length}>{products.length}</Text>
            <TouchableOpacity>
              <Text style={styles.showAll}>Show all</Text>
            </TouchableOpacity>
          </View>
  
          {products.length > 0 ? (
            <FlatList
              data={filteredProducts}
              horizontal
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <Products
                  data={{
                    ...item,
                    image: item.image, 
                  }}
                  onDelete={handleDeleteProduct}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View style={{alignItems: 'center'}}>
              <Text style={styles.noProduct}>No Product Found</Text>
            </View>
          )}
  
          <View>
            <TouchableOpacity
              style={styles.addBox}
              onPress={() => navigation.navigate('AddProduct')}>
              <AntDesign name="pluscircle" size={70} color="#1e7df0" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };
  
  export default Home;
  