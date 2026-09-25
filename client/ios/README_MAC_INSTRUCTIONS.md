# Auralicht App – iOS / Mac Setup Instructions
**Canan Kalman – Humanenergetik & Kinesiologie, Salzburg**

---

### Prerequisites
- macOS running on Mac (MacBook, iMac, Mac Mini, etc.)
- **Xcode** (free download from Mac App Store)

---

### Method 1: Instant Test on Mac (iOS Simulator) — No cable needed
1. Unzip `Auralicht-iOS-Xcode.zip`.
2. Double-click to open:
   `ios/App/App.xcodeproj`
   in Xcode.
3. In the top toolbar, select any device simulator (e.g. **iPhone 16 Pro** or **iPhone 15**).
4. Click the **Play button (▶️)** in the top-left corner.
5. Xcode will build and launch the authentic Auralicht app in the iPhone simulator window on Mac.

---

### Method 2: Direct Install on Physical iPhone via USB Cable
1. Connect your iPhone to your Mac using a USB/Lightning/USB-C cable.
2. Open `ios/App/App.xcodeproj` in Xcode.
3. In the top toolbar device selector, choose your connected iPhone (e.g. **"Canan's iPhone"**).
4. In Xcode's left sidebar, click on **App** (top-level blue project icon).
5. Go to the **Signing & Capabilities** tab.
6. Under **Signing**:
   - Check "Automatically manage signing".
   - Under **Team**, select your Apple ID (a free personal Apple ID works, no paid developer account required for direct USB install).
   - If your Apple ID isn't added yet, click *Add Account...* and sign in.
7. Click the **Play button (▶️)**.
8. Xcode will compile and install the **Auralicht** app directly onto your iPhone home screen!
9. *First-time security check on iPhone:*
   - On your iPhone, open **Settings > General > VPN & Device Management**.
   - Tap on your Apple ID email under "Developer App".
   - Tap **"Trust [Your Email]"**.
   - Tap the Auralicht icon on your home screen to launch!

---

### Method 3: Distribute via Apple TestFlight (Optional – for Team / Clients)
*Requires an active Apple Developer Program membership ($99/yr).*
1. In Xcode, select menu: **Product > Destination > Any iOS Device (arm64)**.
2. Select menu: **Product > Archive**.
3. When the Organizer window appears, click **Distribute App**.
4. Choose **TestFlight & App Store** and click Next through the wizard.
5. Once uploaded, invite testers via email from your [App Store Connect](https://appstoreconnect.apple.com/) dashboard.
