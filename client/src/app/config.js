/* eslint-disable import/prefer-default-export */

const isProd = (process.env.NODE_ENV === 'production');

export const config = {
  apiEndpoint: getApiEndpoint(),
  isFirebase: false,
  firebaseEndpoint: 'https://meetapp-firebase-default-rtdb.europe-west1.firebasedatabase.app/',
};

function getApiEndpoint() {
  return isProd ? 'http://192.144.14.101/api/' : 'http://localhost:8080/api/';
}
