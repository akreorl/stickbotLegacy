const { RichEmbed, MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "밴",
    category: "관리 명령어",
    description: "멤버를 서버에서 차단(밴) 합니다",
    usage: "-밴 (밴하고 싶은 유저 멘션) (이유)",
    run: async (client, message, args) => {


        if (!args[0]) {
            return message.reply("밴할 사람을 멘션해 주세요")
                .then(m => m.delete(5000));
        }

        if (!args[1]) {
            return message.reply("밴 하는 이유를 적어주세요")
                .then(m => m.delete(5000));
        }

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ 당신은 유저 밴 권한이 없습니다")
                .then(m => m.delete(5000));
        
        }
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ 막대기봇이 밴 권한을 가지고 있지 않습니다")
                .then(m => m.delete(5000));
        }

        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!toBan) {
            return message.reply("해당 멤버를 찾을수 없습니다, 다시 시도해 주세요")
                .then(m => m.delete(5000));
        }

        if (toBan.id === message.author.id) {
            return message.reply("자기 자신을 밴 할수 없습니다")
                .then(m => m.delete(5000));
        }

        if (!toBan.bannable) {
            return message.reply("역할 순위가 높아 밴 할수 없습니다")
                .then(m => m.delete(5000));
        }
        
        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**- baned member:** ${toBan} (${toBan.id})
            **- baned by:** ${message.member} (${message.member.id})
            **- Reason:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`30초가 지나면 무효가 됩니다`)
            .setDescription(` ${toBan} 을 밴하시겟습니까?`)

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();

                toBan.ban(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`밴이 되지 않습니다... 오류 발생 ${err}`)
                    });

                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`ban canceled.`)
                    .then(m => m.delete(10000));
            }
        });
    }
};