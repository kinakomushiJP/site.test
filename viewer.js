import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  push,
  onDisconnect
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

console.log("viewer.js running");

const firebaseConfig = {
  apiKey: "AIzaSyAlaNJCHVPr_DGZctrhs5srYVT6NoKBq_k",
  authDomain: "discord-25cfe.firebaseapp.com",
  databaseURL: "https://discord-25cfe-default-rtdb.firebaseio.com",
  projectId: "discord-25cfe",
  storageBucket: "discord-25cfe.firebasestorage.app",
  messagingSenderId: "700961783585",
  appId: "1:700961783585:web:4fc421ab985a8f8f09c860"
};

// Firebase 初期化
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 接続管理ノード
const connectionsRef = ref(db, "connections");

// 自分の接続を追加
const myConnectionRef = push(connectionsRef);

// 切断時に自分を削除
onDisconnect(myConnectionRef).remove();

// 接続数を監視して表示
onValue(connectionsRef, (snapshot) => {
  const count = snapshot.exists()
    ? Object.keys(snapshot.val()).length
    : 0;

  const el = document.getElementById("viewerCount");
  if (el) el.textContent = count;
});