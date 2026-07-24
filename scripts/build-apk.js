import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { ensureAndroidSdk } from './setup-sdk.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
}

function parseArgs() {
  const args = process.argv.slice(2);
  let ipArg = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--ip' && args[i + 1]) {
      ipArg = args[i + 1];
      i++;
    } else if (args[i].startsWith('--ip=')) {
      ipArg = args[i].split('=')[1];
    }
  }
  return ipArg;
}

async function buildApk() {
  console.log('\n🚀 Starting DentiBuddy Android APK Build Process...\n');

  // 1. Determine Backend API URL
  const detectedIp = getLocalIp();
  const customIp = parseArgs();
  const targetHost = customIp || `${detectedIp}:3001`;
  
  let apiUrl = targetHost;
  if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
    apiUrl = `http://${apiUrl}`;
  }
  if (!apiUrl.endsWith('/api')) {
    apiUrl = `${apiUrl.replace(/\/+$/, '')}/api`;
  }

  console.log(`📡 Configured Backend Server API URL: ${apiUrl}`);
  if (!customIp) {
    console.log(`💡 (Auto-detected LAN IP address. To override, run: node scripts/build-apk.js --ip <YOUR_IP:PORT>)\n`);
  }

  // 2. Set environment variable for build
  process.env.VITE_API_URL = apiUrl;

  // Update .env file to persist default API URL
  const envPath = path.join(rootDir, '.env');
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('VITE_API_URL=')) {
      envContent = envContent.replace(/VITE_API_URL=.*/g, `VITE_API_URL="${apiUrl}"`);
    } else {
      envContent += `\nVITE_API_URL="${apiUrl}"\n`;
    }
    fs.writeFileSync(envPath, envContent, 'utf8');
  }

  // 3. Build Web Bundle
  console.log('📦 Step 1/4: Building Vite & TanStack Router Web Bundle...');
  execSync('npm run build', { cwd: rootDir, stdio: 'inherit', env: { ...process.env, VITE_API_URL: apiUrl } });

  // 4. Ensure index.html exists for Capacitor
  const shellHtml = path.join(rootDir, 'dist', 'client', '_shell.html');
  const indexHtml = path.join(rootDir, 'dist', 'client', 'index.html');
  if (fs.existsSync(shellHtml) && !fs.existsSync(indexHtml)) {
    fs.copyFileSync(shellHtml, indexHtml);
  }

  // 5. Capacitor Sync
  console.log('\n📱 Step 2/4: Syncing web assets into Capacitor Android project...');
  execSync('npx cap sync android', { cwd: rootDir, stdio: 'inherit' });

  // 6. Ensure Android SDK & local.properties exist
  console.log('\n🔧 Verifying Android SDK environment...');
  ensureAndroidSdk();

  // 7. Build Gradle APK
  console.log('\n🔨 Step 3/4: Compiling Android APK via Gradle...');
  const isWindows = process.platform === 'win32';
  const gradlewCmd = isWindows ? 'gradlew.bat assembleDebug' : './gradlew assembleDebug';
  const androidDir = path.join(rootDir, 'android');
  execSync(gradlewCmd, { cwd: androidDir, stdio: 'inherit' });

  // 7. Copy output APK to root directory
  console.log('\n✨ Step 4/4: Finalizing APK artifacts...');
  const gradleApkPath = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
  const outputApkPath = path.join(rootDir, 'DentiBuddy-release.apk');

  if (fs.existsSync(gradleApkPath)) {
    fs.copyFileSync(gradleApkPath, outputApkPath);
    const stats = fs.statSync(outputApkPath);
    const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

    console.log('\n======================================================');
    console.log('🎉 SUCCESS! Android APK built successfully!');
    console.log(`📦 Output File: ${outputApkPath}`);
    console.log(`📊 APK Size: ${sizeMb} MB`);
    console.log(`📡 Pre-configured Server API: ${apiUrl}`);
    console.log('======================================================\n');
    console.log('📲 How to Install & Test on Android Device:');
    console.log('  1. Transfer DentiBuddy-release.apk to your phone (via USB / WhatsApp / Google Drive).');
    console.log('  2. Tap the APK on your phone and press "Install".');
    console.log(`  3. Ensure your phone is connected to the same Wi-Fi network (${detectedIp}).`);
    console.log('  4. Launch DentiBuddy on your phone — it will connect directly to your backend API!\n');
  } else {
    console.error('❌ Could not find output APK at expected path:', gradleApkPath);
    process.exit(1);
  }
}

buildApk().catch((err) => {
  console.error('❌ APK Build Failed:', err.message);
  process.exit(1);
});
