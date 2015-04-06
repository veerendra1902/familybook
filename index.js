// var express = require('express');
// var app = express();

// app.set('port', (process.env.PORT || 5000));
// app.use(express.static(__dirname + '/public'));

// // app.get('/', function(request, response) {
// //   response.send('Hello World!');
// // });

// app.get('/', function(req, res){
// 	console.log("yup there");	
//   res.sendFile(__dirname + '/front.html');

// });

// io.on('connection', function(socket){
// 	// console.log('message: ' + "none");
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//     io.emit('chat message', msg);
//   });
// });


// app.listen(app.get('port'), function() {
//   console.log("Node app is running at localhost:" + app.get('port'));
// });



var express =require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var data=[{user:"swati",pass:"sweetu"},{user:"veerendra",pass:"bestu"},{user:"ravindra",pass:"ravi"},{user:"dhruvi",pass:"moti"},{user:"yogesh",pass:"yogi"},{user:"sneha",pass:"singhi"},{user:"atul",pass:"maan"},{user:"shreya",pass:"shiro"},{user:"csingh",pass:"1512"},{user:"matraiyee",pass:"dabboo"},{user:"naman",pass:"nishu"},{user:"manphool",pass:"lambu"},{user:"rajat",pass:"somani"},{user:"hariom",pass:"harsh"}];
var ids={1:'Swati',2:'Veerendra',3:'Ravindra',4:'Dhruvi',5:'Yogesh',6:'Sneha',7:'Atul',8:'Shreya',9:'Chandan_Singh',10:'Matraiyee',11:'Naman',12:'Manphool',13:'Rajat',14:'Hariom'};
var friendList={1:[2,3,4,5,6,7,8,13],2:[1,3,4,5,6,7,8,9,10,11,12,13,14],3:[1,2,5,9,14],4:[1,2,6,8,13],5:[1,2,3,14],6:[1,2,4,7,8],7:[1,2,6],8:[1,2,4,6,13],9:[2,3],10:[2,11,12],11:[2,10,12,13],12:[2,10,11],13:[1,2,4,8,11],14:[2,3,5]};
var status=[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var users={};
var mappings={};
var reverse_map={};
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname+'/public'));


app.get('/', function(req, res){
	// console.log("yup there");	
  res.sendFile(__dirname + '/index.html');

});




io.on('connection', function(socket){
	// console.log('socket Id- : '+ socket.id);
	socket.on('disconnect', function(){
		// console.log('user disconnected');
		if(socket.id in reverse_map){
			status[reverse_map[socket.id]]=0;
			delete mappings[reverse_map[socket.id]];
			delete reverse_map[socket.id];
			var cred={};
	        cred['friends']=friendList;
	        cred['available']=status;
	        cred['identifier']=ids;
	        io.emit('state_changed',cred);
		}

	});
	socket.on('credentials', function(msg){
		// console.log("credentials");	
		
		var found=0;
		var cred={};
		for(var i=0; i<data.length; i++){
            if(msg.user==data[i].user && msg.pass==data[i].pass){
            	mappings[i+1]=socket;
    			reverse_map[socket.id]=i+1;
				found=1;
				cred['error_flag']=0;
				status[i+1]=1;
				cred['friends']=friendList[i+1];
   				cred['identifier']=ids;	
				cred['myId']=i+1;
				break;
            }
        }
        if(found==1){
        	socket.emit('credentials',cred);

			var cred1={};
			cred1['available']=status;
        	io.emit('state_changed',cred1);
        }
	    else{
	    	cred['error_flag']=1;
	    	socket.emit('credentials',cred);
	    }
	    
	    
  	});



	socket.on('chat_message',function(data){
		
		var msg1={sender:data.sender,reciever:data.reciever,message:data.msg,self:1}

		if(data.sender in mappings){
			mappings[data.sender].emit('chat_message',msg1);
		}
		if(data.reciever in mappings){
			msg1.self=0;
			mappings[data.reciever].emit('chat_message',msg1);
		}

	});

socket.on("typing",function(msg){
	// console.log("typing...");
	var msg1={type_status:0,id:msg.sender};	
	if(msg.val==1){
		msg1['type_status']=1;
	}
	if((msg.reciever in mappings)){

		mappings[msg.reciever].emit('typing',msg1);
	}

});

socket.on("delivered",function(msg){
	// console.log("delivered");
	if((msg.reciever in mappings)){

		mappings[msg.reciever].emit('delivered',msg.sender);
	}

});


socket.on("seen",function(msg){
	// console.log("seen");
	if((msg.reciever in mappings)){

		mappings[msg.reciever].emit('seen',msg.sender);
	}

});

  	
});

http.listen(app.get('port'));

