import React, { createContext, useState, useEffect, useContext } from 'react';
import IUser, { ILogin, Props } from '../../../types';
import usePost from '../../api/usePost';
import { useApi } from '../../hooks/useApi';
import _ from 'lodash';

interface AuthContextData {
  signed?: boolean;
  user: object | null;
  SignIn(user: object): Promise<void>;
  Logout(): void;
  isAuthenticated():  Promise<boolean>
  getUser(): Promise<any>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }: Props) => {
  const [user, setUser] = useState<object | null>(null);
  const { signin, setToken } = useApi();

  useEffect(() => {
    const storage = localStorage.getItem('@App:user')
    const token = localStorage.getItem('@App:token')
   
    if (storage && token){
      const parsedToken = JSON.parse(token)
      const parsedStorage = JSON.parse(storage)
      setUser(parsedStorage)
      setToken(parsedToken.access)
      // const data = validateToken(parsedToken.refresh)
      // localStorage.setItem('@App:token', JSON.stringify(data))
    }
  }, []); // Empty dependency array to run only once on mount

  async function getUser(){
    const storage = localStorage.getItem('@App:user');
    const token = localStorage.getItem('@App:token');
    let user = {}
    if (storage && token){
      const parsedToken = JSON.parse(token);
      const parsedStorage = JSON.parse(storage);
      setUser(parsedStorage);
      setToken(parsedToken.access);
      // const data = validateToken(parsedToken.refresh)
      // localStorage.setItem('@App:token', JSON.stringify(data))
      user = parsedStorage;
    }
    return user;
  }

  async function isAuthenticated (){
    const storage = localStorage.getItem('@App:user')
    const token = localStorage.getItem('@App:token')
    if (storage && token){
      const parsedStorage = JSON.parse(storage)
      const parsedToken = JSON.parse(token)
      // const data = validateToken(parsedToken.refresh)
      // localStorage.setItem('@App:token', JSON.stringify(data))
      await setUser(parsedStorage)
      await setToken(parsedToken.access)
      return !_.isEmpty(parsedStorage)
    }
    else{
      localStorage.removeItem('@App:user');
      localStorage.removeItem('@App:token');
    return false;
    }
    
  }
  
  async function SignIn({ username, password }: ILogin) {
    try {
      const data = await signin(username, password);
      if (data) {
        setUser(data.user);
        localStorage.setItem('@App:user', JSON.stringify(data.user));
        localStorage.setItem('@App:token', JSON.stringify({access: data.access, refresh: data.refresh }));
        await setToken(data.access)
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }

  function Logout() {
    try {
      // setUser(null);
      localStorage.removeItem('@App:user');
      localStorage.removeItem('@App:token');
      setToken('')
      setUser(null)
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, SignIn, Logout, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
