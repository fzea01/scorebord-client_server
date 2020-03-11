let net = require('net');
let HOST = '127.0.0.1';
let PORT = 6969;
let server = net.createServer();
let question = Math.floor(Math.random() * 21);
console.log('Question :' + question );

//------------------------------------------------------------------------------
let name = '';
let ccon = '';
let answer = '';
//------------------------------------------------------------------------------

server.listen(PORT, HOST);
server.on('connection', (sock) => {
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    sock.write('OK');
    let count = 0;

    sock.on('data', (data) =>{
        console.log('DATA From ' + sock.remoteAddress + ': ' + data);
        if(count == 0){
            name = data;
        }
        if(count != 5){
            if(data == question){
                sock.write('BINGO');
                console.log('DATA From ' + sock.remoteAddress + ': ' + 'BINGO!!!');
                question = Math.floor(Math.random() * 21);
                console.log('New Question :' + question );
            }else{
                if(data<21){
                    sock.write('WRONG');
                    answer = data;
                }
                count += 1;
                ccon = 0;
            }
        }else{
            if(data == question){
                sock.write('BINGO');
            }
            
            sock.write('END');
            count = 0;
            ccon = 1;
        }

    });

    sock.on('error', (err) => {
        console.log(err);
    });

   sock.on('close', (data) => {
       console.log('CLOSED: ' + sock.remoteAddress +' : '+ sock.remotePort + '\n');
       console.log('Question :' + question );
   });

});
