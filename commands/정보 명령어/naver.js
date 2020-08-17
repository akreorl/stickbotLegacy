const Discord = require("discord.js")
const superagent = require('superagent')

module.exports = { 
  name: "네이버검색",
  category: "정보 명령어",
  description: "네이버에서 검색한 정보를 출력합니다",
  run: async (bot, message, args) => {
    if(args.length < 1) message.channel.send('<:naver:744779549090513017> 뭘 검색할지 입력해 주세요...')

    const cheerio = require('cheerio');

    superagent.get(`https://search.naver.com/search.naver?&query=${encodeURI(args.join(" "))}`).then((res) => {
      const $ = cheerio.load(res.text)
      if($("#web_layer_0 > dl > dt > a").eq(0).text() === "") return message.reply("<:naver:744779549090513017> 검색결과 없음.")
      
      let embed = new Discord.MessageEmbed()
      .setTitle(`<:naver:744779549090513017>  "${args.join(" ")}"에 대한 검색 결과입니다`)
      .setDescription(`[${$("#web_layer_0 > dl > dt > a").eq(0).text()}](${encodeURI($("#web_layer_0 > dl > dd:nth-child(2) > div > a").eq(0).text())})`)
      message.channel.send(embed)
    })

  } 
}