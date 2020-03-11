
//------------------------------------------------

let net = require('net')
let HOST = 'localhost'
let PORT = 6969
let client = new net.Socket()

let username = '5835512005'   // ชื่อที่ใช้ส่งครั้งแรก

client.connect(PORT, HOST,  () => {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT)
    console.log('Client Write :'+ username)
    client.write(username)
})

client.on('data', (data) => {
    console.log('Server Reply : ' + data)

    if(data == 'BINGO' || data == 'END'){
        client.destroy()
    }else{
        let answer = Math.floor(Math.random() * 21)
        answer = parseInt(answer)
        console.log('\n' + 'Write to server : '+ answer)
        client.write(answer.toString())  
    }


})

client.on('error', (err) => {
    console.log(err)
})

client.on('close', () =>{
    console.log('Connection closed')
})



