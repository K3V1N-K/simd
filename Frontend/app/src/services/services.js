const BACKEND_URL = 'http://localhost:8080';

export async function getGreeting() {
  try {
    const response = await fetch(`${BACKEND_URL}/hi`, {});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const plainTex2t = await response.headers;
    console.log(plainTex2t);
    const plainText = await response.text();
    return plainText;
  } catch (e) {
    console.error('Failed response');
    console.error(e);
    return 'error';
  }
}

export async function turnOffServer() {
  try {
    const response = await fetch(`${BACKEND_URL}/stopserver`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const plainText = await response.text();
    return plainText;
  } catch (e) {
    console.error('Failed response');
    console.error(e);
    return 'error';
  }
}

export async function getFileInPath(path) {
  try {
    const response = await fetch(`${BACKEND_URL}/ls?path=${path}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const csvResponse = await response.text();

    const filesArray = csvResponse.split(',');

    const folders = [];
    const files = [];

    filesArray.forEach((f) => {
      const pathElements = f.split('/');
      const name = pathElements[pathElements.length - 1];
      if (name.length === 0) return;
      if (name.includes('.')) files.push(name);
      else folders.push(name);
    });

    return [...folders, ...files];
  } catch (e) {
    console.error('Failed response');
    console.error(e);
    return 'error';
  }
}

export async function fetchFile(path) {
  try {
    const response = await fetch(`${BACKEND_URL}/video?path=${path}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    console.log('video fetching');
    console.log(response);

    let text = await response.text();
    let video = await response.video();

    console.log(text);
    console.log(video);
    return '';
  } catch (e) {
    console.error('Failed response');
    console.error(e);
    return 'error';
  }
}
