const API_URL = 'http://localhost:3002/cakes';

export async function getCakes() {
    const res = await fetch(API_URL);
    return res.json();
  }