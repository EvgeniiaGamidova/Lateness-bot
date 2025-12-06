require('dotenv').config();
const { Bot, GrammyError, HttpError } = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY);

const phrases = [
  'Раньше выходить надо',
  'Удивительно',
  'Осуждаю',
  'х2 к штрафу',
  'Время — это просто рекомендация',
  'Никогда такого небыло',
];

const triggers = ['опаздываю', 'опоздаю', 'задержусь', 'задерживаюсь'];

bot.on('message:text', async (ctx) => {
  const text = ctx.message.text.toLowerCase();

  const matched = triggers.some((word) => text.includes(word));

  if (matched) {
    const random = phrases[Math.floor(Math.random() * phrases.length)];
    await ctx.reply(random);
  }
});

bot.start();
