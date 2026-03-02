import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  get,
  runTransaction,
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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const countRef = ref(db, "viewerCount");

// 🔹 初回表示（必ず表示される）
get(countRef).then((snapshot) => {
  const el = document.getElementById("viewerCount");
  if (el) el.textContent = snapshot.val() ?? 0;
});

// 🔹 リアルタイム更新
onValue(countRef, (snapshot) => {
  const el = document.getElementById("viewerCount");
  if (el) el.textContent = snapshot.val() ?? 0;
});

// 🔹 開いたら +1
runTransaction(countRef, (current) => (current || 0) + 1);

// 🔹 切断時は「フラグ」を立てる（安全）
const disconnectRef = ref(db, `disconnect/${Date.now()}_${Math.random()}`);
onDisconnect(disconnectRef).set(true);