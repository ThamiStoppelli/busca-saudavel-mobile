import React, { useState, useEffect, createContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import { ToastAndroid } from "react-native";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [initialToken, setInitialToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [config, setConfig] = useState({
    headers: { Authorization: `Bearer ${token}` },
  });
  const [produtos, setProdutos] = useState([]);
  const [recoveryEmail, setRecoveryEmail] = useState(null);

  useEffect(() => {
    const recoverData = async () => {
      try {
        const recoveredUser = await AsyncStorage.getItem("user");
        const recoveredToken = await AsyncStorage.getItem("token");
        const recoveredUserType = await AsyncStorage.getItem("userType");

        if (recoveredUser && recoveredToken && recoveredUserType) {
          setUser(JSON.parse(recoveredUser));
          setToken(recoveredToken);
          setUserType(recoveredUserType);
          setInitialToken(recoveredToken);
          setConfig({
            headers: { Authorization: `Bearer ${recoveredToken}` },
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error recovering data: ", error);
        setLoading(false);
      }
    };

    recoverData();
  }, []);

  useEffect(() => {
    setConfig({ headers: { Authorization: `Bearer ${token}` } });
  }, [token]);

  const handleTimeout = () => {
    setLoading(false);
    clearTimeout();
  };

  const handleLogin = async (email, password) => {
    if (email === "" || password === "") {
      ToastAndroid.show("Preencha os dados para realizar login", ToastAndroid.LONG);
      setLoading(false);
    } else {
      setLoading(true);

      setTimeout(handleTimeout, 5000);

      try {
        const response = await api.post("/auth/login", { email, password });

        AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        AsyncStorage.setItem("token", response.data.token);
        AsyncStorage.setItem("userType", response.data.user.user_type);

        setUser(response.data.user);
        setToken(response.data.token);
        setUserType(response.data.user.user_type);

        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        setLoading(false);
        navigation.navigate("Home");
      } catch (error) {
        console.error("Error during login: ", error);
        ToastAndroid.show("Não foi possível efetuar login. Verifique os dados e tente novamente.", ToastAndroid.LONG);
        setLoading(false);
      }
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userType");

      api.defaults.headers.Authorization = null;

      setUser(null);
      setToken(null);
      setUserType(null);

      navigation.navigate("Login");
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        setLoading,
        logout,
        token,
        setToken,
        initialToken,
        userType,
        handleLogin,
        config,
        setConfig,
        produtos,
        setProdutos,
        recoveryEmail,
        setRecoveryEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
