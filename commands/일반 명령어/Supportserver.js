module.exports = {
    name: "서포트",
    category: "일반 명령어",
    description: "막대기봇 서포트 서버 링크",
    run: async (client, message, args) => {
        const msg = await message.channel.send('https://discord.gg/VYt9MT \n 막대기봇 서포트 서버에요! \n 가입하셔서 문의사항이나 봇이 더 발전할수 있도록 여려분의 의견을 부탁해요');
    }
}
