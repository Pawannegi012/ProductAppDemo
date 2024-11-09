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

        if (!image) {
            RNToasty.Show({
                title: 'Please add your product image.',
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
        marginTop: height * 0.15,
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
        height: height * 0.04,
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
