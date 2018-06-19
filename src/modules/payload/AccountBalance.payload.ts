import { auth } from '../../utility/auth';

export let getData = (file: any) => {
  return new Promise((resolve: any, reject: any) => {
    const readFile = file;
    resolve(readFile);
  });
};
export let getDataURL = (urlFile: any) => {
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${auth()}`
    },
  };
  return fetch(urlFile, requestOptions).then(handleResponse).then(readFile => {
            return readFile;
          });
};

function handleResponse(response: any) {
  if (response.status >= 404) {
    return alert('Error ' + response.status + '. Please try again or contact to Admin!');
  }
  if (!response.ok) {
    return Promise.reject(response.json());
  }
  return response.json();
}