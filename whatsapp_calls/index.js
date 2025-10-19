const fetch = require("node-fetch");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const { Client, LocalAuth } = require("whatsapp-web.js");

const PUSHOVER_USER_KEY = "ujv5npn7wp65zbfctzkjda37z26xow";
const PUSHOVER_API_TOKEN = "afxjwti2ffehnvj74cedkud7c1a833";

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "bohdan-client" // можна декілька інстансів
    }),
    puppeteer: { headless: false } // можна headless: false для відображення браузера
});

client.on("qr", (qr) => {
    console.log("📱 Відскануй цей QR у WhatsApp Web:");
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("✅ WhatsApp підключено!");
});

client.on("call", async (call) => {
    try {
        const contact = await client.getContactById(call.from);
        const name = contact.pushname || call.from;
        console.log("📞 Вхідний дзвінок від:", name);

        await fetch("https://api.pushover.net/1/messages.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: PUSHOVER_API_TOKEN,
                user: PUSHOVER_USER_KEY,
                title: "WhatsApp дзвінок",
                message: `📞 ${name}`,
                priority: 1,
            }),
        });
    } catch (err) {
        console.error("Помилка при отриманні контакту:", err);
    }
});

client.initialize();
