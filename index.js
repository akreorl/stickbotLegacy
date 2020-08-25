const API = require("discord.js")
const config = require("./config.json");
const fs = require("fs");

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
    client.user.setActivity(config.defaultStatus, {
      type: 'WATCHING'
    });
});

client.on("message", async message => {
    let prefix = config.prefix;
	
    if (message.mentions.users.some(x => x.id == client.user.id ) &&  !message.author.bot) {
        const embed = new API.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('막대기봇이에요!<a:congratulations:742569193232138250>')
        .setThumbnail('https://i.imgur.com/iNxjnfg.jpg')
        .setDescription(message.author.tag + '님! \n 저를 부르셧나요? \n 접두사는 **-** 입니다 \n **-도움** 을 해보세요! \n 봇 제작: <@457403818913693696> \n 도움주신 분들: <@403025222921486338>')
        .setFooter('막대기봇을 이용해 주셔서 감사합니다')
        .setTimestamp()
        message.channel.send(embed)
    }

    if (message.content === '-도움') {
        const embed = new API.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('명령어')
	    .setAuthor('막대기봇 초대(클릭)', 'https://i.imgur.com/iNxjnfg.jpg', 'https://discord.com/api/oauth2/authorize?client_id=676070482189090826&permissions=1074097350&scope=bot')
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
        .setAuthor('막대기봇 초대(클릭)', 'https://i.imgur.com/iNxjnfg.jpg', 'https://discord.com/api/oauth2/authorize?client_id=676070482189090826&permissions=1074097350&scope=bot')
        .setDescription(' ')
        .addField('유저 밴(차단) 명령어', '사용방법: **-밴 (밴하고 싶은 유저) (밴 하는 이유)** \n 해당 유저를 서버에서 밴(차단) 합니다', false)
        .addField('유저 킥(강퇴) 명령어', '사용방법: **-킥 (킥하고 싶은 유저) (킥 하는 이유)** \n 해당 유저를 서버애서 킥(강퇴) 합니다', false)
        .addField('메시지 클리어(대량 삭제) 명령어', '사용방법: **-클리어 (지우고 싶은 갯수)** \n 해당 갯수많큼 메시지를 삭제합니다(한번에 최대 100개까지 삭제 가능)', false)
        .setTimestamp()
        .setFooter('막대기봇을 이용해 주셔서 감사합니다','https://i.imgur.com/iNxjnfg.jpg');
        message.channel.send(embed)
    }

    if (message.content === '-도움 일반') {
        const embed = new API.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('일반 명령어')
        .setAuthor('막대기봇 초대(클릭)', 'https://i.imgur.com/iNxjnfg.jpg', 'https://discord.com/api/oauth2/authorize?client_id=676070482189090826&permissions=1074097350&scope=bot')
        .setDescription(' ')
        .addField('밈 명령어', '사용방법: **-밈** \n 레딧에서 가져온 밈을 출력합니다', false)
	    .addField('유저, 봇 정보 명령어', '사용방법: **-정보, -정보 (멘션)** \n 멘션을 하지 않았을시 자신의 정보, 멘션한 유저의 정보를 출력합니다', false)
	    .addField('막대기봇 정보 명령어', '사용방법: **-봇정보** \n 막대기봇의 정보를 출력합니다', false)
	    .addField('서버 정보 명령어', '사용방법: **-서버정보** \n 서버 정보를 출력합니다', false)
	    .addField('막대기봇 초대 명령어', '사용방법: **-초대** \n 막대기봇에 딱 맞는 초대링크를 드립니다', false)
        .addField('막대기봇 서포트 서버 명령어', '사용방법: **-서포트** \n 막대기봇의 건의와 문의를 받는 서포트 서버 링크를 드립니다', false)
        .addField('가위바위보 명령어', '사용방법: **-가위바위보 후 이모지 3개중 원하는 것을 고르세요** \n 봇과 가위바위보 를 합니다 ~~(주의, 많이 띠껍습니다)~~', false)
        .addField('핑 명령어', '사용방법: **-핑** \n 클라이언트 핑을 알려줍니다', false)
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

client.login(config.token);
