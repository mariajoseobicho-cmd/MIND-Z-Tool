# Build matrix

## Web/PWA

```bash
npm install --no-audit --no-fund
npm run build
```

Output: `apps/studio/dist/`.

## Windows

Use a Windows runner or development machine with Rust and Tauri prerequisites.

```powershell
npm install --no-audit --no-fund
npm run build
npm run tauri -- build --bundles nsis
```

Expected installer: under `apps/studio/src-tauri/target/release/bundle/nsis/`.

## Linux

```bash
npm install --no-audit --no-fund
npm run build
npm run tauri -- build --bundles appimage
```

## macOS

```bash
npm install --no-audit --no-fund
npm run build
npm run tauri -- build --bundles dmg
```

## Android test APK

After installing Android SDK, Java 17, NDK and Rust Android targets:

```bash
npm install --no-audit --no-fund
npm run tauri -- android init
npm run tauri -- android build --debug --apk
```

The debug APK is intended for testing. Production Android distribution needs release signing and should not use debug keys.
