// Do as guide from https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3#file-app-js
// Load up the discord.js library
const Discord = require("discord.js");

const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
// config.token contains the bot's token
// config.prefix contains the message prefix.
const config  = require("./config.json");
const poke_db = require("./gen_name_cp_iv_raidboss_egg_quest.json");

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

client.on('error', console.error);
client.login(config.token);

// BELOW CODE ARE UNDER DEVELOPING
var list_cpm   = [0.094000000, 0.135137432, 0.166397870, 0.192650919, 0.215732470, 0.236572661, 0.255720050, 0.273530381, 0.290249880, 0.306057377, 0.321087600, 0.335445036, 0.349212680, 0.362457751, 0.375235590, 0.387592406, 0.399567280, 0.411193551, 0.422500010, 0.432926419, 0.443107550, 0.453059958, 0.462798390, 0.472336083, 0.481684950, 0.490855800, 0.499858440, 0.508701765, 0.517393950, 0.525942511, 0.534354330, 0.542635767, 0.550792690, 0.558830576, 0.566754520, 0.574569153, 0.582278910, 0.589887917, 0.597400010, 0.604818814, 0.612157290, 0.619399365, 0.626567130, 0.633644533, 0.640652950, 0.647576426, 0.654435630, 0.661214806, 0.667934000, 0.674577537, 0.681164920, 0.687680648, 0.694143650, 0.700538673, 0.706884210, 0.713164996, 0.719399090, 0.725571552, 0.731700000, 0.734741009, 0.737769480, 0.740785574, 0.743789430, 0.746781211, 0.749761040, 0.752729087, 0.755685510, 0.758630378, 0.761563840, 0.764486065, 0.767397170, 0.770297266, 0.773186500, 0.776064962, 0.778932750, 0.781790055, 0.784636970, 0.787473578, 0.790300010, 0.79311]; // from matlab: lvl1 -> 40.5
var list_candy = [1,   1,   1,   1,   1,   1,   1,   1,   1,    1,    2,    2,    2,    2,    2,    2,    2,    2,    2,    2,    3,    3,    3,    3,    3,    4,    4,    4,    4,    4,    6,    6,    8,    8,    10,   10,   12,   12,   15,    15];
var list_dust  = [200, 200, 400, 400, 600, 600, 800, 800, 1000, 1000, 1300, 1300, 1600, 1600, 1900, 1900, 2200, 2200, 2500, 2500, 3000, 3000, 3500, 3500, 4000, 4000, 4500, 4500, 5000, 5000, 6000, 6000, 7000, 7000, 8000, 8000, 9000, 9000, 10000, 10000];

// lvl : 2->80
// stats : [att, def, sta]
function calcp(stats, iv, lvl) {
    cpm = list_cpm[lvl - 2];
    //cp = max(10,floor(att*sqrt(def)*sqrt(sta)*ecpm*ecpm/10));
    return Math.max(10, Math.floor((stats[0] + iv[0]) * Math.pow((stats[1] + iv[1]), 0.5) * Math.pow((stats[2] + iv[2]), 0.5) * cpm * cpm * 0.1));
}

function calhp(stats, iv, lvl) {
    cpm = list_cpm[lvl - 2];
    //hp = max(10,floor(sta*ecpm));
    return Math.max(10, Math.floor((stats[2] + iv[2]) * cpm));
}

function candy_lvl(lvl) {
    if (lvl > 80) lvl = 80;
    if (lvl < 2) lvl = 2;
    return list_candy[Math.floor(lvl / 2 - 1)];
}

function dust_lvl(lvl) {
    if (lvl > 80) lvl = 80;
    if (lvl < 2) lvl = 2;
    return list_dust[Math.floor(lvl / 2 - 1)];
}
