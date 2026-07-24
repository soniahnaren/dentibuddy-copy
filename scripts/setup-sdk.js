import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export function ensureAndroidSdk() {
  const homeDir = os.homedir();
  const sdkDir = process.env.ANDROID_HOME || path.join(homeDir, 'android-sdk');
  const androidProjDir = path.join(rootDir, 'android');
  const localPropsPath = path.join(androidProjDir, 'local.properties');

  console.log(`🔍 Checking Android SDK location...`);

  // Normalize path for Windows local.properties (forward slashes or double backslashes)
  const formattedSdkDir = sdkDir.replace(/\\/g, '/');

  // Check if ANDROID_HOME or local.properties is already valid
  const sdkManagerPath = path.join(sdkDir, 'cmdline-tools', 'latest', 'bin', 'sdkmanager.bat');
  const buildToolsPath = path.join(sdkDir, 'build-tools');

  if (fs.existsSync(sdkManagerPath) && fs.existsSync(buildToolsPath)) {
    console.log(`✅ Android SDK found at: ${sdkDir}`);
    fs.mkdirSync(androidProjDir, { recursive: true });
    fs.writeFileSync(localPropsPath, `sdk.dir=${formattedSdkDir}\n`, 'utf8');
    return sdkDir;
  }

  console.log(`📥 Setting up Android SDK command-line tools at: ${sdkDir}...`);
  fs.mkdirSync(sdkDir, { recursive: true });

  const tempZipPath = path.join(sdkDir, 'cmdline-tools.zip');
  const tempExtractDir = path.join(sdkDir, 'temp_extract');
  const latestDir = path.join(sdkDir, 'cmdline-tools', 'latest');

  if (!fs.existsSync(sdkManagerPath)) {
    const zipUrl = 'https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip';
    console.log(`   Downloading ${zipUrl}...`);

    // Download using PowerShell Invoke-WebRequest
    const psDownload = `powershell -Command "Invoke-WebRequest -Uri '${zipUrl}' -OutFile '${tempZipPath}'"`;
    execSync(psDownload, { stdio: 'inherit' });

    console.log(`   Extracting Android SDK tools...`);
    const psExtract = `powershell -Command "Expand-Archive -Path '${tempZipPath}' -DestinationPath '${tempExtractDir}' -Force"`;
    execSync(psExtract, { stdio: 'inherit' });

    // Clean up zip
    if (fs.existsSync(tempZipPath)) fs.unlinkSync(tempZipPath);

    // Structure must be: sdkDir/cmdline-tools/latest/...
    fs.mkdirSync(latestDir, { recursive: true });
    const innerCmdline = path.join(tempExtractDir, 'cmdline-tools');

    const files = fs.readdirSync(innerCmdline);
    for (const file of files) {
      const src = path.join(innerCmdline, file);
      const dest = path.join(latestDir, file);
      fs.renameSync(src, dest);
    }

    // Clean up temp dir
    fs.rmSync(tempExtractDir, { recursive: true, force: true });
    console.log(`✅ Command-line tools extracted to: ${latestDir}`);
  }

  // Auto-accept licenses and install required platforms and build-tools
  console.log(`📦 Installing Android SDK platforms (android-34) and build-tools (34.0.0)...`);
  const sdkManagerBin = path.join(latestDir, 'bin', 'sdkmanager.bat');

  try {
    // Accept all licenses automatically
    const licenseCmd = `(for /L %i in (1,1,15) do @echo y) | "${sdkManagerBin}" --licenses --sdk_root="${formattedSdkDir}"`;
    execSync(licenseCmd, { stdio: 'inherit', shell: 'cmd.exe' });

    // Install build-tools and platform
    const installCmd = `"${sdkManagerBin}" "platforms;android-34" "build-tools;34.0.0" "platform-tools" --sdk_root="${formattedSdkDir}"`;
    execSync(installCmd, { stdio: 'inherit', shell: 'cmd.exe' });

    console.log(`✅ Android SDK platform packages installed successfully!`);
  } catch (err) {
    console.warn(`⚠️ Warning during sdkmanager execution: ${err.message}`);
  }

  // Create local.properties in android directory
  fs.mkdirSync(androidProjDir, { recursive: true });
  fs.writeFileSync(localPropsPath, `sdk.dir=${formattedSdkDir}\n`, 'utf8');
  console.log(`📝 Updated android/local.properties with sdk.dir=${formattedSdkDir}`);

  return sdkDir;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  ensureAndroidSdk();
}
