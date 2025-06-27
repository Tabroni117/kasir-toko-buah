
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCeqHW_m9kru2vmEDVSoelZ3UWFD4k4Xqc",
    authDomain: "tokobuahkasir.firebaseapp.com",
    projectId: "tokobuahkasir",
    storageBucket: "tokobuahkasir.appspot.com",
    messagingSenderId: "731011133713",
    appId: "1:731011133713:web:4247ae627401a01b8c1cb0"
  });
}

const db = firebase.firestore();
let terakhirDitampilkan = "";

function tampilkanPopupPesanan(data) {
  const items = data.items || [];
  let isi = "";
  let total = 0;
  items.forEach(item => {
    const subtotal = item.harga * item.jumlah;
    total += subtotal;
    isi += `
      <div>
        <strong>${item.nama}</strong> (${item.jumlah} x Rp ${item.harga.toLocaleString()})<br>
        <small>${item.sambal}, ${item.ukuran}, ${item.bumbu}</small><br>
        <strong>Subtotal: Rp ${subtotal.toLocaleString()}</strong>
      </div><hr>`;
  });
  isi += `<strong>Total: Rp ${total.toLocaleString()}</strong><br><br>`;
  isi += `<button onclick="window.location.href='navigator-input.html'">Lihat Pesanan</button>`;
  document.getElementById("popupIsiPesanan").innerHTML = isi;
  document.getElementById("popupPesanan").style.display = "block";
}

function cekPesananBaru() {
  db.collection("pesanan")
    .orderBy("waktu", "desc")
    .limit(1)
    .get()
    .then(snapshot => {
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        const idPesanan = snapshot.docs[0].id;
        const waktuPesanan = data.waktu?.toDate?.() || new Date();
        const waktuBuka = new Date(localStorage.getItem("pesananSudahDibuka") || 0);
        const sound = document.getElementById("notifSound");

        if (waktuPesanan > waktuBuka) {
          sound.play();
          if (idPesanan !== terakhirDitampilkan) {
            tampilkanPopupPesanan(data);
            terakhirDitampilkan = idPesanan;
          }
        } else {
          sound.pause();
          sound.currentTime = 0;
        }
      }
    });
}

function tutupPopup() {
  document.getElementById("popupPesanan").style.display = "none";
  localStorage.setItem("pesananSudahDibuka", new Date().toISOString());
}

document.addEventListener("DOMContentLoaded", () => {
  cekPesananBaru();
  setInterval(cekPesananBaru, 5000);
});
