const { MessageEmbed, DiscordAPIError, Discord } = require("discord.js")

module.exports = {
    name: "서버정보",
    category: "정보 명령어",
    description: "서버 정보를 출력합니다",
    run: async (bot, message, args) => {
        
            let inline = true
            let sicon = message.guild.iconURL;
            let serverembed = new MessageEmbed()
            .setColor("#0099ff")
            .setThumbnail(sicon)
            .setAuthor(message.guild.name)
            .addField("서버 이름", message.guild.name, inline)
            .addField("서버 ID", message.guild.id, inline)
            .addField("서버 주인", message.guild.owner, inline)
            .addField("서버 위치", message.guild.region, inline)
            .addField("멤버 수", `<:disocrd:742021671497629737> ${message.guild.memberCount}`, inline)
            .addField("역할 개수", message.guild.roles.cache.size, inline)
            .addField("채널 개수", message.guild.channels.cache.size, inline)
            .addField("가입하신 날", message.member.joinedAt)
            .setFooter(`생일:${message.guild.createdAt}`);
        
            message.channel.send(serverembed);
    }
}