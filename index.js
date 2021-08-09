let axios = require('axios');

const getUrlIp = async () => {
    let res = await axios.get('https://github.com.ipaddress.com/')
    let val = res.data.match(/(?<=\.com\/ipv4\/)[\d\.]+/g)
    return [val[0], 'github.com']
}

// 2. 获取github域名查询
const getDomainIp = async () => {
    let res = await axios.get('https://fastly.net.ipaddress.com/github.global.ssl.fastly.net')
    let val = res.data.match(/(?<=\.com\/ipv4\/)[\d\.]+/g)
    return [val[0], 'github.global.ssl.fastly.net']
}
// 3. 获取github静态资源ip
const getStaticIp = async () => {
    let res = await axios.get('https://github.com.ipaddress.com/assets-cdn.github.com')
    let val = res.data.match(/(?<=\.com\/ipv4\/)[\d\.]+/g)
    return [...new Set(val)].map((item) => {
        return [item, 'assets-cdn.github.com']
    })
}

// 4. 生成内容
Promise.all([getUrlIp(), getDomainIp(), getStaticIp()]).then((res) => {
    let val = [res[0], res[1], ...res[2]]
    let str = copyHost(val)
    console.log(str)
})

// 5. 拼接
const copyHost = (val) => {
    let str = ''
    val.forEach((item) => {
        str += item[0] + ' ' + item[1] + '\n'
    })
    return str
}