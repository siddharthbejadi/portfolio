import { initializeApp, getApps, getApp, type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// This is the recommended way to initialize the admin SDK.
// It ensures that the app is only initialized once.
const serverApp: App = !getApps().length
  ? initializeApp()
  : getApp();

const db = getFirestore(serverApp);

export { db, serverApp };
