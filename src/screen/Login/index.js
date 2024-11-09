import React, { useEffect, useState } from 'react';
import { View, TextInput, ActivityIndicator, Dimensions, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RNToasty } from 'react-native-toasty';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation, setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingIndicator, setLoadingIndicator] = useState(false);

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) navigation.navigate('Home');
    } catch (error) {
      console.error('Error token:', error);
    }
  };

  const handleLogin = async () => {
    setLoadingIndicator(true);

    if (email !== 'eve.holt@reqres.in' || password !== 'pistol') {
      RNToasty.Show({
        title: 'Invalid email or password',
        position: 'center',
      });
      setLoadingIndicator(false);
      return;
    }

    try {
      const response = await axios.post('https://reqres.in/api/login', { email, password });
      const token = response?.data?.token;

      if (token) {
        await AsyncStorage.setItem('userToken', token);
        setToken(true);
        navigation.navigate('Home');
        RNToasty.Show({
          title: 'Login Successfully',
          position: 'center',
        });
      } else {
        RNToasty.Show({
          title: 'Login Failed: Invalid credentials',
          position: 'center',
        });
      }
    } catch (error) {
      RNToasty.Error({
        title: error?.response?.data?.error || 'Login failed',
      });
    } finally {
      setLoadingIndicator(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../../assets/World_wide_web.png')} style={styles.image} />
      <Text style={styles.loginName}>Login</Text>

      <View style={styles.inputCont1}>
        <Entypo name="email" size={22} color="grey" />
        <TextInput
          placeholder="Email ID"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholderTextColor="gray"
          style={styles.emailInput}
        />
      </View>

      <View style={styles.inputCont2}>
        <MaterialCommunityIcons name="lock-outline" size={22} color="grey" />
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          placeholderTextColor="gray"
          style={styles.passwordInput}
        />
      </View>

      <TouchableOpacity style={styles.forgotpass}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginbox}
        onPress={handleLogin}
        disabled={loadingIndicator}
      >
        {loadingIndicator ? (
          <ActivityIndicator size={30} color="white" style={styles.loadingIndicator} />
        ) : (
          <Text style={styles.login}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={{ marginLeft: width * 0.47, color: 'gray', marginTop: height * 0.025, fontWeight: '400' }}>OR</Text>

      <TouchableOpacity style={styles.loginBox1}>
        <Image source={require('../../assets/google.png')} style={styles.googleimage} />
        <Text style={styles.googleText}>Login with Google</Text>
      </TouchableOpacity>

      <Text style={{ color: 'gray', marginLeft: width * 0.3, marginTop: height * 0.04 }}>
        New to Logistics?{' '}
        <Text style={{ color: 'blue' }}>Register</Text>
      </Text>
    </ScrollView>
  );
};

export default Login;
