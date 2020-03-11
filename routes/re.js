var express = require('express')
var router = express.Router()

//-----------------------------------------------------
let net = require('net')
let HOST = 'localhost'
let PORT = 6969
let server = net.createServer()

//สุ่มตัวเลขครั้งแรก
let question = Math.floor(Math.random() * 21)
console.log('Question :' + question )

//------------------------------------------------------------------------------

let DataNameConnect = [0]     //ชื่อ user ที่เคยส่งทั้งหมด
let DataNameWin = []    //ชื่อ user ที่ชนะ

//------------------------------------------------------------------------------

server.listen(PORT, HOST)
server.on('connection', (sock) => {
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort)
    sock.write('OK')
    let count = 0
    let NameConnect = ''
    let ResultName = ""
    sock.on('data', (data) =>{
        console.log('DATA From ' + sock.remoteAddress + ': ' + data)
        //เก็บชื่อที่เชื่อมต่อเข้ามาครั้งแรก
        if(count == 0){
          NameConnect = data
        }
        //รับข้อมูล 5 ครั้ง เข้ามาเช็คคำตอบ
        if(count != 5){
            if(data == question){
                sock.write('BINGO');
                console.log('DATA From ' + sock.remoteAddress + ': ' + 'BINGO!!!')
                question = Math.floor(Math.random() * 21)
                console.log('New Question :' + question )
                ResultName = NameConnect
            }else{
                if(data<21){
                    sock.write('WRONG')
                    
                }
                count += 1
                
            }
        }else{
            if(data == question){
                sock.write('BINGO')
                ResultName = NameConnect
                
            }
            
            count = 0
            sock.write('END')
            sock.end()      
        }

    })

    sock.on('error', (err) => {
        console.log(err)
    })


   sock.on('close', (data) => {

//-----------------------------------------------------------------
       //เก็บรายชื่อที่มีการเชื่อมต่อเข้ามาทั้งหมด
       DataNameConnect.push(NameConnect)
       console.log('Connect All Data Name : '+ DataNameConnect)

      //เก็บรายชื่อที่ตอบถูกทั้งหมดทั้งหมด
       let tick = 0
       for(i in DataNameWin){
        if(DataNameWin[i].toString() == ResultName.toString()){
          tick = 1
        }
      }
       if(tick == 1){
        tick = 0
       }else{
        DataNameWin.push(ResultName)
       }
       console.log('Winner All Data Name  : '+ DataNameWin)
//-----------------------------------------------------------------

       console.log('CLOSED: ' + sock.remoteAddress +' : '+ sock.remotePort + '\n')
       console.log('Question :' + question )
   })

})

//-----------------------------------------------------

/* GET users listing. */
router.get('/', function(req, res, next) {
    
  res.json({ userwin: DataNameWin.toString(),dataname: DataNameConnect.toString() })

})

module.exports = router
