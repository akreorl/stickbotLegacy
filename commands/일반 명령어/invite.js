const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "초대",
    category: "일반 명령어",
    description: "막대기봇 초대 링크",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('막대기봇 초대(클릭)', ' ', 'https://discord.com/api/oauth2/authorize?client_id=676070482189090826&permissions=1074097350&scope=bot')
        .setFooter('막대기봇을 이용해 주셔서 감사합니다', 'https://i.imgur.com/iNxjnfg.jpg')
        .setDescription('막대기봇이 정상 작동하기 위해 꼭 필요한 권한들이에요! \n 꼭 이 링크로 초대 부탁해요')
        message.channel.send(embed)
    }
}