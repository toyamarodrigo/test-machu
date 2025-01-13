require("dotenv").config();
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const https = require("https");

// Initialize Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Create axios instance with SSL verification disabled
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const ENDPOINTS = [
  "https://api-tuboleto.cultura.pe/reserva/consulta-fechas-disponibles?nidruta=11",
  "https://api-tuboleto.cultura.pe/reserva/consulta-fechas-disponibles?nidruta=12",
];

async function checkAvailability() {
  try {
    for (const endpoint of ENDPOINTS) {
      try {
        const response = await axiosInstance.get(endpoint);
        const dates = response.data;

        // Filter for February dates
        const februaryDates = dates.filter((date) => {
          const [day, month] = date.dfecha.split("-");
          return month === "02";
        });

        if (februaryDates.length > 0) {
          const routeNumber = endpoint.includes("nidruta=11") ? "11" : "12";
          const currentTime = new Date().toLocaleString("en-US", {
            timeZone: "America/Lima",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          const message = `🎯 Found February dates at ${currentTime} (Peru time)!\nRoute: ${routeNumber}\nDates: ${februaryDates
            .map((d) => d.dfecha)
            .join(", ")}`;
          await bot.sendMessage(CHAT_ID, message);
        }
      } catch (routeError) {
        console.error(`Error checking route: ${routeError.message}`);
      }
    }
  } catch (error) {
    console.error("Error in main check:", error.message);
  }
}

// Send initial test message
bot
  .sendMessage(
    CHAT_ID,
    "🟢 Machu Picchu checker is now running! You will only be notified when February dates become available."
  )
  .then(() => console.log("Test message sent successfully!"))
  .catch((error) =>
    console.error("Error sending test message:", error.message)
  );

// Run every minute
setInterval(checkAvailability, 60000);

// Initial check
checkAvailability();

console.log("Availability checker is running...");
