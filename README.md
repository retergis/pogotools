# pogotools
    Collection of tools for Pokemon Go (in Developing)
# Setup
- Install Nodejs and related package ('discord.js')
- Update config.json before run.
```json
{ 
    "token"  : "YOUR_TOKEN_HERE",
    "prefix" : "."
}
```
- Run command
```
    node app.js
```

# Usage
 $ Check iv of Raid/Egg/Quest pokemon:
```
    iv <pokemon> <cp>
```

 $ To add pokemon to database, edit example_add_poke.js
```
    Pfunc.add_poke(poke_db,"Deoxys",[345,115,100]);
```
    In this example: add pokemon name "Deoxys" with Base stats: att=345,def=115,sta=100
    You can add multiple line if need.

 $  To edit base stats of Pokemon:
```
    Pfunc.change_stat(poke_db,"Lapras",[165,180,260]);
```

 $  To delete a Pokemon:
```
    Pfunc.del_poke(poke_db,"Deoxys");
```
