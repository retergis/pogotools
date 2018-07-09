// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config  = require("./config.json");
const poke_db = require("./gen_name_cp_iv_raidboss_egg_quest.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.
    
    // Also good practice to ignore any message that does not start with our prefix, 
    // which is set in the configuration file.
    if(message.content.indexOf(config.prefix) !== 0) return;
    
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if(message.author.bot) return;
    
    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(config.prefix.length).trim().toLowerCase().split(/ +/g);
    const command = args.shift();
    
    if (command === "iv") {
        poke_name = args[0].charAt(0).toUpperCase() + args[0].slice(1);
        if (poke_db[args[0]] === undefined) {
            message.channel.send('Pokemon not found');
        } else if (poke_db[args[0]] !== undefined && poke_db[args[0]][args[1]] === undefined) {
            if (Number(args[1]) > 0) {
                message.channel.send('Cannot found Raid/Egg/Quest ' + poke_name + ' with CP=' + args[1]);
            } else {
                message.channel.send('CP is not correct number');
            }
        } else if (poke_db[args[0]][args[1]] !== undefined) {
            var embed = new Discord.RichEmbed();
            embed.setColor(0x00AE86);
            poke_lvl  = poke_db[args[0]][args[1]];
            lvl_keys  = Object.keys(poke_lvl);
            if (lvl_keys.length == 1) {
                if (lvl_keys[0] === '15') {
                    embed.setTitle('Quest pokemon ' + poke_name + ' level 15, CP ' + args[1]);
                } else if (lvl_keys[0] === '20') {
                    embed.setTitle('Raid boss (no weather boost) ' + poke_name + ' level 20, CP ' + args[1]);
                } else if (lvl_keys[0] === '25') {
                    embed.setTitle('Raid boss (weather boost) ' + poke_name + ' level 25, CP ' + args[1]);
                }
                suffix = 0;
            } else { // Current database don't have this case
                embed.setTitle('Quest/Raid/Egg poke ' + poke_name + 'CP ' + args[1]);
                suffix = 1;
            }
            i = 0;
            for (lvl in poke_lvl) {
                stat_array = poke_lvl[lvl];
                no_stat    = stat_array.length;
                if (no_stat == 1 && suffix == 0) {
                    stat   = stat_array[0];
                    embed.addField('Unique Gotcha:',':point_right: IV=' + stat[0] + '% Atk=' + stat[1] + ' Def=' +  stat[2] + ' Stm=' + stat[3] + ' (HP=' + stat[4] + ')');
                } else {
                    for (j=0;j<no_stat;j++) {
                        i++;
                        stat = stat_array[j];
                        embed.addField('Gotcha ' + i + ':',':point_right: IV=' + stat[0] + '% Atk=' + stat[1] + ' Def=' +  stat[2] + ' Stm=' + stat[3] + ' (HP=' + stat[4] + (suffix ? ') (Lvl='+lvl : ')'));
                    }
                }
            }
            embed.setTimestamp(new Date());
            message.channel.send(embed);
        }
    }
});

client.login(config.token);
