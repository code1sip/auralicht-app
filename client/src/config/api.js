// Centralized API Base URL configuration for both local web and Android APK

export const getApiBaseUrl = () => {
  // If running inside Capacitor native app on Android
  if (typeof window !== 'undefined' && window.Capacitor) {
    return 'http://10.30.209.94:5000';
  }
  // If accessing from phone via Wi-Fi IP in browser
  if (typeof window !== 'undefined' && window.location.hostname && window.location.hostname !== 'localhost') {
    return `http://${window.location.hostname}:5000`;
  }
  // Default for local laptop browser
  return 'http://localhost:5000';
};
