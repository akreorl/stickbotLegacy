module.exports = {
    name: "오픈소스",
    category: "일반 명령어",
    description: "깃허브 막대기봇 레포지토리 링크 출력",
    run: async (client, message, args) => {
        const msg = await message.channel.send('https://github.com/jeongtaek06/stickbot.V2 \n 코드 개더러워서 쓰는건 비추요 \n ~~스타나 눌러주ㅅ~~');
    }
}
