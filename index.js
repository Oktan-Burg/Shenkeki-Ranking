const Discord = require("discord.js");
const database = require("@replit/database");
const db = new database();
const noblox = require('noblox.js')
const { Intents, Permissions } = require("discord.js")
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const keepAlive = require("./server");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
// Functions start
//////
async function login (msg,name) { 
  //await will yield the code until a value is returned.
  const userId = await noblox.getIdFromUsername(name).catch(function(error) {
    console.log("There was an error getting the id!", error)  
  }); //Handle the rejection accordingly.
	
  if (!userId) return console.log("No id was returned.");
  let randomValue = [
    "cookie cookie tasty cat",
    "cat watch grow",
    "cake cake huge meal",
    "food pizza tasty place",
    "fast fox fox fast fast",
    "pizza pizza tasty food cookie",
    "cat fart watch",
    "animal cute lion epic pro",
    "happy sun grass water",
    "sad sand glass lava"
  ]
  var phrase = randomValue[Math.floor(Math.random() * randomValue.length)];
  msg.reply('For verification change your about me to the phrase `' + phrase + '`')
  
  noblox.onBlurbChange(userId).on("data", function(data) {
    console.log("User's blurb changed!", data)
    if (data.toLowerCase() === phrase) {
      console.log("Login successful!")
      msg.reply("You're account was logged in you may change your about me anytime.")
      db.set(msg.author.id, userId)
    }
  })
  console.log()
}
async function myinfo (msg, ID) {
  let info = await noblox.getPlayerInfo({userId: parseInt(ID)})
  console.log(info)
}
//////
// Functions end

client.on("messageCreate", msg => {
  // if (msg.content.toLowerCase().startsWith('')) {}
  if (msg.content.toLowerCase().startsWith('$verify ')) {
    let userSTR = msg.content.slice(8)
    function falseuser () {
      msg.reply("ERROR: The user you provided was blank.")
      return;
    }
    if (!userSTR) falseuser();
    if (userSTR === " ") falseuser();
    if (userSTR === "") falseuser();
    noblox.setCookie(process.env.COOKIE).then(login(msg, userSTR))
  }
  if (msg.content.toLowerCase().startsWith('$myinfo')) {
    let userid = db.get(msg.author.id, { raw: false }).then(console.log);
    if (userid === null) return;
    noblox.setCookie(process.env.COOKIE).then(myinfo(msg, userid))
    
  }
})
keepAlive();
client.login(process.env.TOKEN)