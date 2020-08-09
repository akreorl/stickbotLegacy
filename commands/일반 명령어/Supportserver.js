module.exports = {
    name: "서포트",
    category: "정보 명령어",
    description: "막대기봇 서포트 서버 링크",
    run: async (client, message, args) => {
        const msg = await message.channel.send('https://discord.gg/Dek8Jc3 \n 막대기봇 서포트 서버에요!');
    }
}
