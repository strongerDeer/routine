// shared/lib/firebase/index.ts

import { initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";

// Firebase 구성 정보
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;
let database: Database;

// 클라이언트 사이드에서만 초기화
if (typeof window !== "undefined") {
  try {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    console.log("Firebase 초기화 성공");
  } catch (error) {
    console.error("Firebase 초기화 오류:", error);
  }
}

export { app, database };
