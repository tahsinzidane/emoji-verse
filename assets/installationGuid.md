## 🐧 Full Installation Guide (Linux - AppImage)

If you want to make **Emoji-Verse feel like a real native app** on your Linux system — searchable from the launcher and pinned to your dock — follow this guide.

---

### 📦 1. Move the AppImage to a Permanent Location

```bash
mkdir -p ~/.local/bin
mv ~/Downloads/emoji.verse-2.0.1.AppImage ~/.local/bin/emoji-verse
chmod +x ~/.local/bin/emoji-verse
```

---

### 🖼 2. Add an App Icon (Optional but Recommended)

Save an icon file named `emoji-verse.png` in this location:

```bash
~/.local/share/icons/emoji-verse.png
```

---

### 📄 3. Create a `.desktop` File

```bash
nano ~/.local/share/applications/emoji-verse.desktop
```

Paste this into the file:

```ini
[Desktop Entry]
Name=Emoji Verse
Exec=/home/YOUR_USERNAME/.local/bin/emoji-verse
Icon=/home/YOUR_USERNAME/.local/share/icons/emoji-verse.png
Type=Application
Categories=Utility;
StartupNotify=true
Terminal=false
```

> 🛠️ Replace `YOUR_USERNAME` with your actual username or use full absolute paths.

---

### 🔁 4. Refresh App Database

```bash
update-desktop-database ~/.local/share/applications
kbuildsycoca5
```

---

### 📌 5. Pin to Dock (KDE)

* Open the application from your app launcher (search "Emoji Verse")
* Right-click the running icon in your dock
* Click **“Pin to Task Manager”** (or **“Keep in Dock”**)

---

### 🚀 (Optional) Launch on Startup

If you want the app to open automatically at login:

```bash
cp ~/.local/share/applications/emoji-verse.desktop ~/.config/autostart/
```

---

### ✅ That’s it!

Emoji-Verse now behaves like a fully installed Linux desktop app 🎉
