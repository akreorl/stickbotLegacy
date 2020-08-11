const { RichEmbed, MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "킥",
    category: "관리 명령어",
    description: "멤버를 서버에서 강퇴(킥) 합니다",
    usage: "-킥 (킥하고 싶은 유저 멘션) (이유)",
    run: async (client, message, args) => {


        if (!args[0]) {
            return message.reply("<a:no:742569138764906628>킥할 사람을 멘션해 주세요")
                .then(m => m.delete(5000));
        }

        if (!args[1]) {
            return message.reply("<a:no:742569138764906628>킥 하는 이유를 적어주세요")
                .then(m => m.delete(5000));
        }

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("<a:no:742569138764906628> 당신은 유저 강퇴 권한이 없습니다")
                .then(m => m.delete(5000));
        }

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("<a:no:742569138764906628> 막대기봇이 강퇴 권한을 가지고 있지 않습니다")
                .then(m => m.delete(5000));
        }

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!toKick) {
            return message.reply("<a:no:742569138764906628>해당 멤버를 찾을수 없습니다, 다시 시도해 주세요")
                .then(m => m.delete(5000));
        }

        if (toKick.id === message.author.id) {
            return message.reply("<a:no:742569138764906628>자기 자신을 킥 할수 없습니다")
                .then(m => m.delete(5000));
        }

        if (!toKick.kickable) {
            return message.reply("<a:no:742569138764906628>역할 순위가 높아 강퇴할수 없습니다")
                .then(m => m.delete(5000));
        }
                
        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toKick.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**- Kicked member:** ${toKick} (${toKick.id})
            **- Kicked by:** ${message.member} (${message.member.id})
            **- Reason:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`30초가 지나면 무효가 됩니다`)
            .setDescription(` ${toKick} 을 킥하시겟습니까?`)

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["<a:yes:742568893351985303>", "<a:no:742569138764906628>"]);

            if (emoji === "<a:yes:742568893351985303>>") {

                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`킥이 되지 않습니다...오류 발생 ${err}`)
                    });

                logChannel.send(embed);
            } else if (emoji === "<a:no:742569138764906628>") {
                msg.delete();

                message.reply(`Kick canceled.`)
            }
        });
    }
};
