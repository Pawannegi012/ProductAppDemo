// import {
//     View,
//     Text,
//     TextInput,
//     Image,
//     Dimensions,
//     TouchableOpacity,
//     Alert,
//   } from 'react-native';
//   import React, {useState} from 'react';
//   import styles from './styles';
//   import AsyncStorage from '@react-native-async-storage/async-storage';
//   import ImagePicker from 'react-native-image-crop-picker';
//   import Feather from 'react-native-vector-icons/Feather';
//   import {RNToasty} from 'react-native-toasty';
  
//   const {width, height} = Dimensions.get('window');
  
//   const AddProduct = ({navigation}) => {
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [image, setImage] = useState(null);
  
//     const addProduct = async () => {
//       if (!name.trim || !price.trim()) {
//         // Alert.alert('Error', 'Please enter both product name and price.');
//         RNToasty.Show({
//           title: 'Please enter both product name and price.',
//           // fontFamily: 'Arial',
//           position: 'center',
//         });
//         return;
//       }
  
//       const newProduct = {
//         id: Date.now().toString(),
//         name: name.trim(),
//         price,
//         image,
//       };
  
//       const existingProducts =
//         JSON.parse(await AsyncStorage.getItem('products')) || [];
  
//       if (
//         existingProducts.some(
//           product => product.name.toLowerCase() === name.trim().toLowerCase(),
//         )
//       ) {
//         RNToasty.Show({
//           title: 'A product with this name already exists.',
//           // fontFamily: 'Arial',
//           position: 'center',
//         });
//         return;
//       }
  
//       const updatedProducts = [...existingProducts, newProduct];
//       await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
//       navigation.navigate('Home', {image: image ? image.path : null});
//     };
  
//     const handleImagePick = () => {
//       ImagePicker.openPicker({
//         width: width * 1,
//         height: height * 0.5,
//         cropping: true,
//       }).then(selectedImage => {
//         setImage(selectedImage);
//         setImage(`data:image/jpeg;base64,${base64String}`);
//       });
//     };
//     return (
//       <View style={styles.mainContainer}>
//         <Text style={styles.shopName}>Add Product</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             placeholder="Enter Product Name"
//             value={name}
//             onChangeText={setName}
//             placeholderTextColor="gray"
//             style={styles.emailInput}
//           />
//         </View>
  
//         <View style={styles.inputContainer}>
//           <TextInput
//             placeholder="Enter price"
//             value={price}
//             onChangeText={setPrice}
//             keyboardType="numeric"
//             placeholderTextColor="gray"
//             style={styles.emailInput}
//           />
//         </View>
//         {image && (
//           <View>
//             <Text style={styles.urlText}>
//               Image URL:{' '}
//               <Text style={{color: 'Componentgray'}}>{image.path}</Text>
//             </Text>
//           </View>
//         )}
//         <TouchableOpacity style={styles.imagePickerBox} onPress={handleImagePick}>
//           <Text style={styles.chooseText}>Add Image</Text>
//         </TouchableOpacity>
  
//         <TouchableOpacity style={styles.imagePickerBox1} onPress={addProduct}>
//           <Text style={styles.chooseText}>Add Product</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };
  
//   export default AddProduct;
  
import { 
    View,
    Text,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import { RNToasty } from 'react-native-toasty';

const { width, height } = Dimensions.get('window');

const AddProduct = ({ navigation }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const addProduct = async () => {
        if (!name.trim() || !price.trim()) {
            RNToasty.Show({
                title: 'Please enter both product name and price.',
                position: 'center',
            });
            return;
        }

        const newProduct = {
            id: Date.now().toString(),
            name: name.trim(),
            price,
            image,
        };

        const existingProducts = JSON.parse(await AsyncStorage.getItem('products')) || [];

        if (
            existingProducts.some(
                product => product.name.toLowerCase() === name.trim().toLowerCase(),
            )
        ) {
            RNToasty.Show({
                title: 'A product with this name already exists.',
                position: 'center',
            });
            return;
        }

        const updatedProducts = [...existingProducts, newProduct];
        await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
        navigation.navigate('Home', { image: image ? image.path : null });
    };

    const handleImagePick = () => {
        ImagePicker.openPicker({
            width: width,
            height: height * 0.5,
            cropping: true,
        }).then(selectedImage => {
            setImage(selectedImage);
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Add Product</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Enter Product Name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="gray"
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Enter Price"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        placeholderTextColor="gray"
                        style={styles.textInput}
                    />
                </View>

                {image && (
                    <View style={styles.imagePreviewContainer}>
                        <Image source={{ uri: image.path }} style={styles.imagePreview} />
                    </View>
                )}

                <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePick}>
                    <Feather name="image" size={18} color="white" />
                    <Text style={styles.buttonText}>Add Image</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton} onPress={addProduct}>
                    <Text style={styles.buttonText}>Add Product</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 20,
        marginTop:height*0.15
    },
    innerContainer: {
        width: '90%',
        borderRadius: 20,
        padding: 20,
        backgroundColor: 'white',
        elevation: 3,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 15,
        paddingVertical: height * 0.02,
    },
    textInput: {
        fontSize: 13,
        color: '#333',
        height:height*0.04
    },
    imagePreviewContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
    },
    imagePreview: {
        width: width * 0.8,
        height: height * 0.25,
        borderRadius: 10,
    },
    imagePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 10,
        paddingVertical: height * 0.02,
        width: '80%',
        justifyContent: 'center',
        marginBottom: 15,
    },
    addButton: {
        backgroundColor: 'darkblue',
        borderRadius: 10,
        paddingVertical: height * 0.02,
        width: '80%',
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default AddProduct;
