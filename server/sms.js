const qrcode = require('qrcode-terminal');
const { Client, RemoteAuth } = require('whatsapp-web.js');
const fetch = require('cross-fetch');
// Require database
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config()

const sms = (a) => {
  // Load the session data
  mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@whatsapp.z2pxmvv.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log("connected")
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
      authStrategy: new RemoteAuth({
        store: store,
        backupSyncIntervalMs: 300000
      })
    });
    client.on('remote_session_saved', () => {
      console.log('WHATSAPP WEB => Authenticated');
    });
    client.on('ready', () => {
      console.log("WHATSAPP WEB => Ready");
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      a.map((e) => {
        const names = e.names;
        const number = "91" + e.numbers + "@c.us";
        const [uday, umonth, uyear] = e.dates[2] == '/' ? e.dates.split("/") : e.dates.split("-");
        if(uday==day && umonth==month){
          client.sendMessage(number, names);
        }
      })
      console.log("sms send sucessfully");
    });
    client.initialize();
    client.on('message', message => {
      if (message.body === '!ping') {
        client.sendMessage(message.from, 'pong');
      }
    });
  });
}


module.exports = sms;