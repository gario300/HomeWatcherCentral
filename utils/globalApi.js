import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';

const getToken = async() => {
  return await AsyncStorage.getItem('token')
}

const url =  Constants.manifest.extra.server_url
const api = axios.create({
  url,
  headers: {'Content-Type': 'application/json'},
});

api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api

