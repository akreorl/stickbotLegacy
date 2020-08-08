module.exports = {
    name: "클리어",
    aliases: ["purge", "nuke"],
    category: "관리 명령어",
    description: "채팅을 클리어(대량 삭제) 합니다",
    run: async (client, message, args) => {
    
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("클리어 명령어는 메시지 관리 권한이 있는 사람만 가능합니다").then(m => m.delete(5000));
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("!클리어 뒤에는 지우고 싶은 개수를 입력해 주세요").then(m => m.delete(5000));
        }

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("막대기봇에 메시지 관리 권한이 없습니다").then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(` \`${deleted.size}\` 개의 메시지 삭제 완료.`))
            .catch(err => message.reply(`Something went wrong... ${err}`));
    }
}