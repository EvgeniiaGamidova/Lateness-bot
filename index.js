require('dotenv').config();
const { Bot, GrammyError, HttpError } = require('grammy');

const bot = new Bot(process.env.BOT_TOKEN);

bot.api.setMyCommands([
  {
    command: 'start',
    description: 'что я делаю',
  },
  {
    command: 'hello',
    description: 'ну привет',
  },
]);
bot.command('start', async (ctx) => {
  await ctx.reply('реагирую на опоздания и слегка осуждаю');
});
bot.command('hello', async (ctx) => {
  await ctx.reply('дарова, не опаздывай');
});
const phrases = [
  'Раньше выходить надо',
  'Удивительно',
  'Осуждаю',
  'х2 к штрафу',
  'Время — это просто рекомендация',
  'Никогда такого небыло',
  'цццц',
  'A что случилось?',
  'Плохо, очень плохо',
  'Раньше спать ложись',
  '300 раз тебе говорили — выходи раньше',
  'Тебе повезо, +5 минут бесплатно',
  'Скинь гео',
];

const triggers = [
  'опаздываю',
  'опоздаю',
  'задержусь',
  'задерживаюсь',
  'проспал',
  'проспала',
];

bot.on('message:text', async (ctx) => {
  const text = ctx.message.text.toLowerCase();

  const matched = triggers.some((word) => text.includes(word));

  if (matched) {
    ctx.react('👀');
    const random = phrases[Math.floor(Math.random() * phrases.length)];
    await ctx.reply(random);
  }
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;

  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Could not contact Telegram:', e);
  } else {
    console.error('Unknown error:', e);
  }
});

bot.start();
