# Auralicht – Germany/Salzburg Client Mobile App

Clean, modern full-stack mobile application for **Auralicht (Canan Kalman – Humanenergetik & Kinesiologie, Salzburg)**.

---

## 📁 Project Structure

### 1. `Auralicht-App.apk` (Final Android App)
- **Ready-to-install Android APK file** (~18.4 MB).
- Send this file to your Android phone via WhatsApp, USB cable, or Google Drive and click **Install**.
- Also copied to your **Desktop**: `C:\Users\hp\Desktop\Auralicht-App.apk`.

### 2. `client/` (Mobile App Frontend)
- Modern mobile app built with **React 18 + Vite**.
- Includes 5 native bottom tabs:
  - 🏠 **Home**: Daily wellness card, quick action buttons, Canan spotlight, popular methods, and FAQs.
  - 🌿 **Methoden**: Interactive therapy cards with iOS slide-up bottom sheets.
  - ✨ **Für Dich (Quiz)**: Interactive symptom & goals assessment test.
  - 📅 **Buchen**: Native mobile appointment booking wizard.
  - 👤 **Profil**: Canan's biography, verified certificates, diplomas screenshot, and practice gallery.
- **Android Studio Project**: Located at `client/android/`.

### 3. `server/` (Backend & Database)
- **Node.js Express REST API** (`/api/inquiries`, `/api/auth`, `/api/stats`).
- **SQLite Database** located at `server/data/inquiries.db`.
- Saves booking inquiries and contact requests.
- Admin dashboard credentials: `admin` / `auralicht2026`.

---

## 🚀 How to Run Locally

### Start Backend:
```powershell
cd server
npm start
```
Runs at: `http://localhost:5000`

### Start Mobile App:
```powershell
cd client
npm run dev
```
Runs at: `http://localhost:5173` (Desktop) or `http://192.168.1.11:5173` (Mobile phone on same Wi-Fi)
