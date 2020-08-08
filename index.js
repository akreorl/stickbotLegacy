const API = require("discord.js")
const config = require("./config.json");
const fs = require("fs");
let emotechat = false

const client = new API.Client({
    disableEveryone: true
});

client.commands = new API.Collection();
client.aliases = new API.Collection();


client.categories = fs.readdirSync("./commands/");


["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

  

client.on("ready", () => {
    console.log(`${client.user.tag} 에 로그인됨`);
    client.user.setActivity("-도움", {
      type: 'WATCHING'
    });
});

client.on("message", async message => {
    let prefix = "-";

    if (message.content === '-돋보기') {
        if (message.author.id !== "457403818913693696") {
            return message.reply("현재 한시적으로 돋보기 기능을 이용할수 없습니다").then(m => m.delete(5000));
        }
        if (emotechat === true) {
            emotechat = false
            message.reply('돋보기를 비활성화했습니다')
        } else {
            emotechat = true
            message.reply('돋보기를 활성화했습니다')
        }
    }
    if (emotechat !== false) {
        if (message.content.startsWith('<:')) {
            message.delete();
            let data = message.content.split(':')
            const embed = new API.MessageEmbed()
            .setImage(`https://cdn.discordapp.com/emojis/${data[2].replace(/>/gi, '')}.png?v=1`)
            .setColor('#0099ff')
            .setTimestamp()
            .setAuthor('막대기봇', 'https://i.imgur.com/iNxjnfg.jpg', 'https://discord.com/oauth2/authorize?client_id=676070482189090826&permissions=8&scope=bot');
            message.channel.send(embed)
        }
    }

    if (message.content === '-도움') {
        const embed = new API.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('명령어')
	    .setAuthor('막대기봇 초대(클릭)', 'https://i.imgur.com/iNxjnfg.jpg', 'https://discord.com/oauth2/authorize?client_id=676070482189090826&permissions=8&scope=bot')
        .setDescription('막대기봇 사용을 위한 명령어 정리입니다.\n 명령어는 앞으로도 많이 추가될 예정입니다.')
	    .addFields(
		{ name: '접두사', value: '"-"(막대기)', inline: false},
		{ name: '관리 명령어는?', value: '-도움 관리', inline: true },
	    )
	    .addField('일반 명령어는?', '-도움 일반', true)
        .setTimestamp()
        .setFooter('막대기봇을 이용해 주셔서 감사합니다','https://i.imgur.com/iNxjnfg.jpg');
        message.channel.send(embed)
    }

    if (message.content === '-도움 관리') {
        const embed = new API.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('관리 명령어')
        .setAuthor('막대기봇 초대(클릭)', 'https://i.imgur.com/iNxjnfg.jpg', 'https://discord.com/oauth2/authorize?client_id=676070482189090826&permissions=8&scope=bot')
        .setDescription(' ')
        .addField('유저 밴(차단) 명령어', '사용방법: -밴 (밴하고 싶은 유저) (밴 하는 이유) \n 해당 유저를 서버에서 밴(차단) 합니다', false)
        .addField('유저 킥(강퇴) 명령어', '사용방법: -킥 (킥하고 싶은 유저) (킥 하는 이유) \n 해당 유저를 서버애서 킥(강퇴) 합니다', false)
        .addField('돋보기(이모지 확대 기능)', '사용방법: -돋보기(처음은 꺼진 상태, on/off 형식) \n 활성화 되있을시 서버 이모지를 임베드로 확대시켜줍니다 \n 현재 일시적으로 돋보기 사용이 불가능합니다', false)
        .addField('메시지 클리어(대량 삭제) 명령어', '사용방법: -클리어 (지우고 싶은 갯수) \n 해당 갯수많큼 메시지를 삭제합니다(한번에 최대 100개까지 삭제 가능)', false)
        .setTimestamp()
        .setFooter('막대기봇을 이용해 주셔서 감사합니다','https://i.imgur.com/iNxjnfg.jpg');
        message.channel.send(embed)
    }

    if (message.content === '-도움 일반') {
        const embed = new API.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('일반 명령어')
        .setAuthor('막대기봇 초대(클릭)', 'https://i.imgur.com/iNxjnfg.jpg', 'https://discord.com/oauth2/authorize?client_id=676070482189090826&permissions=8&scope=bot')
        .setDescription(' ')
        .addField('가위바위보 명령어', '사용방법: -가위바위보 후 이모지 3개중 원하는 것을 고르세요 \n 봇과 가위바위보 를 합니다', false)
        .addField('핑 명령어', '사용방법: -핑 \n 클라이언트 핑을 알려줍니다', false)
        .setTimestamp()
        .setFooter('막대기봇을 이용해 주셔서 감사합니다','https://i.imgur.com/iNxjnfg.jpg');
        message.channel.send(embed)
    }

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        command.run(client, message, args);
    }
});

client.login(BOT_TOKEN);
