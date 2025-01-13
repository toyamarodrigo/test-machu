# Machu Picchu Availability Checker

This script checks for available February dates for Machu Picchu tickets and sends notifications via Telegram.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure your `.env` file:

- Get your Telegram Bot Token from [@BotFather](https://t.me/botfather)
- Get your Chat ID by sending a message to [@userinfobot](https://t.me/userinfobot)
- Update the `.env` file with your tokens:

  ```env
  TELEGRAM_BOT_TOKEN=your_bot_token_here
  TELEGRAM_CHAT_ID=your_chat_id_here
  ```

## Usage

Run the script:

```bash
npm start
```

The script will check both endpoints every minute and send you a Telegram message when February dates become available.
# test-machu
