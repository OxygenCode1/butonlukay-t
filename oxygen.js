const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express");
const moment = require("moment");
const disbut = require('discord-buttons')
disbut(client);
const app = express();
const db = require('quick.db');
const fs = require("fs");
// Oxygen Youtube Kanalına ait KAYIT bot altyapısı
//Uptime için__________________________________________________________________
app.get("/", (req, res) => {
  res.send("Oxygen Discord Bot Altyapısı");
});
app.listen(process.env.PORT);

//KOMUT Algılayıcı______________________________________________________________
client.commands = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./komutlar/${file}`);
    let cmdFileName = file.split(".")[0];
    console.log(`Komut Yükleme Çalışıyor: ${cmdFileName}`);
    client.commands.set(cmd.help.name, cmd);
  });
});
// Oxygen Youtube Kanalına ait KAYIT bot altyapısı
//EVENTS Yükleyici_______________________________________________________________
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.on('ready', () => {
	console.log(`[INFO]: Ready on client (${client.user.tag})`);
	client.user.setActivity('Oxygen :D?', { type: 'WATCHING' });
  client.user.setStatus("online")
});

client.login(process.env.TOKEN);
// Oxygen Youtube Kanalına ait KAYIT bot altyapısı



  let erkek = "910224605749334037" // ERKEK ROL ID
  let kız = "910224639941300295" // KIZ ROL ID
  let kayıtsız = "910535262038261822" // SUNUCUYA GELENE OTO VERILECEK ROL ID
  let sunucu = "910223090007547986" // SUNUCU ID
  let hosgeldin = "910536860093255690" // HOŞGELDİN KANAL ID 
  
//------------------OTOMESAJ
client.on('guildMemberAdd', async member  => {
  if(member.guild.id!= sunucu) return false;
 let member2 = member.user 
 let zaman = new Date().getTime() - member2.createdAt.getTime()
 var user = member2 
 var ardademrzaman = [];
 if(zaman < 172800000) {
 ardademrzaman = `Hesap Yeni Açılmış`
 } else {
 ardademrzaman = `Hesap Yeni Açılmamış`}require("moment-duration-format");
   let zaman1 = new Date().getTime() - user.createdAt.getTime()
   const gecen = moment.duration(zaman1).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    const ardademrembed = new Discord.MessageEmbed()
    .setColor('#efff00')
     .setDescription(`**Hoş Geldin:** ${member}\n**Discord'a Kayıt Olma Süresi:** ${gecen}\n**Hesap Yeni Mi?:** ${ardademrzaman}`)
 client.channels.cache.get(hosgeldin).send(ardademrembed)
   
           });


//------------------OTOROL
client.on('guildMemberAdd', member => {
var role = member.guild.roles.cache.find(role => role.id == kayıtsız)
member.roles.add(role);
});
// Oxygen Youtube Kanalına ait KAYIT bot altyapısı

  
client.on('clickButton', (button) => {
  
  if (button.id === 'erkek') {
    db.add(`erkek_kayıt`,1)
     button.clicker.member.roles.add(erkek); 
    button.clicker.member.roles.remove(kayıtsız);
    button.clicker.member.roles.remove(kız);
  }
    if (button.id === 'kız') {
    db.add(`kız_kayıt`,1)
     button.clicker.member.roles.add(kız); 
    button.clicker.member.roles.remove(kayıtsız); 
       button.clicker.member.roles.remove(erkek); 
  }
})


client.on("ready",(button)=>{
  client.ws.on('INTERACTION_CREATE', async interaction => {
  
     if(interaction.data.custom_id=="erkek"){
     client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
          type: 4,
          data: {
              content: `Seni sunucumuza Erkek Üye olarak kayıt ettim. İyi eğlenceler.`,    
              flags: "64"
            }
        }
    }); 

   };
   
      if(interaction.data.custom_id=="kız"){
     client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
          type: 4,
          data: {
              content: `Seni sunucumuza Kız Üye olarak kayıt ettim. İyi eğlenceler.`,    
              flags: "64"
            }
        }
    }); 
   };
    });
  });