console.log("viewer.js running on this page");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction, onDisconnect } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

document.addEventListener("DOMContentLoaded", () => {

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

  // 開いたら +1
  runTransaction(countRef, (current) => (current || 0) + 1);

  // 閉じたら -1
  onDisconnect(countRef).runTransaction(
    (current) => Math.max((current || 1) - 1, 0)
  );

  // 表示更新
  onValue(countRef, (snapshot) => {
    const el = document.getElementById("viewerCount");
    if (el) {
      el.textContent = snapshot.val() ?? 0;
    }
  });

});