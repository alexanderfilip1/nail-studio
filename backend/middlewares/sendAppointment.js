const sendAppointment = async (message) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    const data = await response.json();

    console.log("Telegram API Response:", data);

    if (!response.ok) {
      throw new Error(`Telegram API Error: ${data.description}`);
    }

    return data;
  } catch (err) {
    console.error("Error sending Telegram message:", err);
    throw err;
  }
};

module.exports = sendAppointment;
