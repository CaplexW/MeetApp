/* eslint-disable import/prefer-default-export */

const isProd = (process.env.NODE_ENV === 'production');

export const config = {
  apiEndpoint: getApiEndpoint(),
  isFirebase: false,
  firebaseEndpoint: 'https://meetapp-firebase-default-rtdb.europe-west1.firebasedatabase.app/',
};

function getApiEndpoint() {
  const url = isProd ? '192.144.14.101' : 'localhost:8080';
  return `http://${url}/api/`;
}
// function getApiEndpoint() {
//   const url = isProd ? 'localhost' : 'localhost:8080';
//   return `http://${url}/api/`;
// }
