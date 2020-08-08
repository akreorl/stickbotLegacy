module.exports = {
    name: "핑",
    category: "정보 명령어",
    description: "클라이언트 핑을 알려줍니다",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`${client.ws.ping}ms`);
    }
}