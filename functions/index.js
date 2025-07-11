const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.buatQRIS = functions.https.onRequest(async (req, res) => {
  const apiKey = "DEV-WOUvJMLGzGNpjo9ycYMLr1d2pIXBZ1CbpiI4VNh2";
  const merchantRef = "INV-" + Date.now();
  const amount = 18000;

  const payload = {
    method: "QRIS",
    merchant_ref: merchantRef,
    amount: amount,
    customer_name: "Pembeli Rujak",
    order_items: [
      {
        sku: "RUJAK01",
        name: "Rujak Buah Uji Coba",
        price: amount,
        quantity: 1
      }
    ],
    callback_url: "https://example.com/callback",
    return_url: "https://example.com/thankyou"
  };

  try {
    const response = await fetch("https://tripay.co.id/api-sandbox/transaction/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Gagal membuat QRIS:", error);
    res.status(500).json({ success: false, message: "Gagal membuat QRIS" });
  }
});
