import AsyncStorage from "@react-native-async-storage/async-storage"
import Reactotron from "reactotron-react-native"
Reactotron
  .configure() // controls connection & communication settings
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage for React Native
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!