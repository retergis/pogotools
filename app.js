// Do as guide from https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3#file-app-js
// Load up the discord.js library
const Discord = require("discord.js");
const Pfunc   = require("./pokemon_func.js");

const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
// config.token contains the bot's token
// config.prefix contains the message prefix.
const config  = require("./config.json");
//const poke_db = require("./gen_name_cp_iv_raidboss_egg_quest.json");
const poke_stats = require("./ivrose_stats.json");
const poke_db    = {};
const pokename_list = Object.keys(poke_stats);

Object.keys(poke_stats).forEach( p => {
    Pfunc.add_poke(poke_db,p,poke_stats[p]);
});


client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
    if(message.content.indexOf(config.prefix) !== 0) return;
    
    if(message.author.bot) return;
    
    const args = message.content.slice(config.prefix.length).trim().toLowerCase().split(/ +/g);
    const command = args.shift();
    
    if (command === "iv") {
        // Specific code of my own.
        if (args[0] == '<@240235446020472833>' | args[0] == 'rose' | args[0] == 'rose88' | args[0] == 'rose888') {
            message.channel.send('Top secret :joy:!!!');
            return;
        }
        // Specific code of my own - END
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
                embed.setTitle('Quest/Raid/Egg poke ' + poke_name + ', CP ' + args[1]);
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
                        embed.addField('Gotcha ' + i + ':',':point_right: IV=' + stat[0] + '% Atk=' + stat[1] + ' Def=' +  stat[2] + ' Stm=' + stat[3] + ' (HP=' + stat[4] + (suffix ? ') (Lvl=' + lvl : '') + ')');
                    }
                }
            }
            embed.setTimestamp(new Date());
            message.channel.send(embed);
        }
    }
});

client.on('error', console.error);
client.login(config.token);

