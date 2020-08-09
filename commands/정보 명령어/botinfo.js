const { MessageEmbed, DiscordAPIError, Discord, bot } = require("discord.js")

module.exports = {
    name: "봇정보",
    category: "정보 명령어",
    description: "봇의 정보를 출력합니다",
    run: async (bot, message, args) => {
        let inline = true
        let bicon = bot.user.displayAvatarURL()
        let usersize = bot.users.cache.size
        let chansize = bot.channels.cache.size
        let uptime = bot.uptime 
        let servsize = bot.guilds.cache.size
        let ME  = new MessageEmbed()
        .setColor("#0099ff")
        .setThumbnail(bicon)
        .addField("봇 이름", `<:stickbot:742014638337687622> ${bot.user.username}`, inline)
        .addField("봇 주인", "<:stick:742013956801167431> <@457403818913693696>", inline )
        .addField("서버 개수", `🛡 ${servsize}`, inline)
        .addField("채널 수", `📁 ${chansize}`, inline)
        .addField("유저 수", `<:discord:742021671497629737> ${usersize}`, inline)
        .addField("봇 언어", "<:Discordjs:742015427579740251> Discord.js", inline)
        .addField("생일", bot.user.createdAt)
        .setFooter(`${bot.user.username} 정보`)
        .setTimestamp()
        message.channel.send(ME);
    
    }
}