const BACKEND_URL = 'http://localhost:8080';

export async function getGreeting() {
  try {
    const response = await fetch(`${BACKEND_URL}/hi`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const plainText = await response.text();
    return plainText;
  } catch (e) {
    console.error('Failed response');
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
    return 'error';
  }
}
