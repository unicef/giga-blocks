import jwtDecode from 'jwt-decode';

const storage = typeof window !== 'undefined' ? window.localStorage : null;

export const getCurrentUser = () => {
  let user = null;
  const data = storage ? storage.getItem('currentUser') : '';
  if (data) user = JSON.parse(data);
  return user;
};

export const saveCurrentUser = (userData) =>
  storage ? storage.setItem('currentUser', JSON.stringify(userData)) : undefined;

export const saveKey = (key) =>
  storage ? storage.setItem('key', JSON.stringify(key)) : undefined;

export const getKey = ()=>
  storage ? JSON.parse(storage.getItem('key') || 'null') : null;

export const getAccessToken = ()=>
  storage ? storage.getItem('accessToken') : null;

export const saveAccessToken = (accessToken) =>
  storage ? storage.setItem('accessToken', accessToken) : undefined;

export const deleteAccessToken = () =>
  storage ? storage.removeItem('accessToken') : undefined;

export const clearStorage = () => {
  if (storage) {
    storage.clear();
  }
};

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

export const saveConnectors = (connector)=>{
  storage ? storage.setItem('connector', connector) : undefined;
}

export const removeConnectors = ()=>{
  storage ? storage.removeItem('connector') : undefined;
}

export const getConnectors = ()=>{
  return storage ? storage.getItem('connector') : undefined;
}
