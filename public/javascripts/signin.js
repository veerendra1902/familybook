var friendList;
var ids; 	
var myId;
var currentFriend;
var new_messages={};
var socket = io();
var symbols = ["::)",":)P",":)",";)",":D","B)",";P","<3)",":P",":/",":(",";3",":O"];
var symbols_map1 = ["blush1.jpg","lustt1.jpg","smile1.jpg","wink1.jpg","laugh1.jpg","stud1.jpg","toung1.jpg","dil1.jpg","fun1.jpg","huh1.jpg","sad1.jpg","kissi1.jpg","haww1.jpg"];
var symbols_map2 = ["blush2.jpg","lustt2.jpg","smile2.jpg","wink2.jpg","laugh2.jpg","stud2.jpg","toung2.jpg","dil2.jpg","fun2.jpg","huh3.jpg","sad2.jpg","kissi2.jpg","haww2.jpg"];

$(document).ready(function(){

	

	$("#signinForm").submit(function(){
	var uname=$('#user_name').val();
		var password=$('#user_password').val();
		var cred={user:uname,pass:password};

	socket.emit('credentials', cred);
	return false;
	});

	
	
	socket.on('credentials', function(data){

		if(data.error_flag==0){
			myId=data.myId;
	 		friendList=data.friends;
	 		ids=data.identifier;
	 		for(var j=0;j<friendList.length;j++){
	 			new_messages[friendList[j]]=0;
	 		}

	 		document.getElementById('SignIn').style.display='none';
			var main_box=d3.select("#main_box");
			var list_div=main_box.append("div")
            .attr("class","login-02")
            .attr("id",ids[myId]+"List")
            .attr("style","display:block");
            var list=list_div.append('div');
            var head = list.append('div').attr("class","two-login-head");
            head.append("h1").text("FamilyBook");
            head.append("h5").attr("style","color:white;").text("Powered By Veerendra Singh");

            var welcome = list.append('div').attr("class","two-login-head");
            welcome.append("h1").text("Welcome "+ids[myId]);

            list.append('br');
            list.append('br');
            list.append('br');

            for(var i = 0 ; i < friendList.length; i++){
            	var inputs=list.append('div').attr("class","submit two");
            	var inputs2=list.append('div').attr("class","submit three");

            	inputs.append('input').attr('id',ids[myId]+"List_"+ids[friendList[i]]+"1")
            	.attr("type","submit")
            	.attr("style","display:none;")
            	.attr("onclick","openlist("+friendList[i]+")")
            	.attr("value",ids[friendList[i]]+"    - Online");

            	inputs2.append('input').attr('id',ids[myId]+"List_"+ids[friendList[i]]+"2")
            	.attr("type","submit")
            	.attr("style","display:none;")
            	.attr("value",ids[friendList[i]]+"    - Offline");
            }

            list.append('br');
            list.append('br');
            list.append('br');
            list.append('br');
            list.append('br');
            list.append('br');
            list.append('br');
            list.append('br');
            

            for(var i = 0; i<friendList.length; i++){
            	var chat=main_box.append('div').attr("class","login-02")
            	.attr("id",ids[myId]+"_"+ids[friendList[i]])
            	.attr("style","display:none").append('div');

            	var head=chat.append('div').attr("class","two-login-head");
            	head.append("h1").text("FamilyBook");
        		head.append("h5").attr("style","color:white;").text("Powered By Veerendra Singh");

        		var welcome = chat.append('div').attr("class","two-login-head");
        		welcome.append("h1").attr("id",ids[myId]+"_"+ids[friendList[i]]+"_header");
        		chat.append('br');
        		chat.append('br');

        		chat.append('div').attr("id",ids[myId]+"_"+ids[friendList[i]]+"_messages");
        		chat.append('div').attr("id",ids[myId]+"_"+ids[friendList[i]]+"_seen").attr("style","color:white; text-align: right; margin-right:10px;");

        		chat.append('br');
        		chat.append('div').append('p').attr("id","typing_status_"+ids[myId]+"_"+ids[friendList[i]]).attr("style","color:red;");
        		chat.append('div').attr("class","login-02").append('div').attr("id","chat_form_"+ids[friendList[i]]);
				// .append('form').attr("id","form_message_"+ids[friendList[i]])
    //     		.append("li")
    //     		.append('input').attr("type","text")
    //     		.attr("id","form_message_input_"+ids[friendList[i]])
    //     		.attr("value","Enter Meesage")
    //     		.attr("onfocus","this.value = '';")
    //     		.attr("onblur","if (this.value == '') {this.value = 'Enter Message';}");
        		

        		chat.append('div').attr("class","submit two").append('input').attr("type","submit")
        		.attr("onclick","gotoList()")
        		.attr("value","Go back to friends list");

            }

		}
		else{
			document.getElementById('SignIn').style.display="block";
			$('#user_name').val('Try Again - User Name');
			$('#user_password').val('Password');
			
		}


	});

	
 	socket.on('state_changed',function(details){

		for(var i=0;i<friendList.length;i++){
			if(details.available[friendList[i]]==0){
				document.getElementById(ids[myId]+'List_'+ids[friendList[i]]+'1').style.display="none";
				document.getElementById(ids[myId]+'List_'+ids[friendList[i]]+'2').style.display="block";
				document.getElementById(ids[myId]+"_"+ids[friendList[i]]+'_header').innerHTML= ids[friendList[i]]+" is Offline";	
			}
			else{
				// console.log('SwatiList_'+details.identifier[details.friends[1][i]]+'1');
				document.getElementById(ids[myId]+'List_'+ids[friendList[i]]+'1').style.display="block";
				document.getElementById(ids[myId]+'List_'+ids[friendList[i]]+'2').style.display="none";
				document.getElementById(ids[myId]+"_"+ids[friendList[i]]+'_header').innerHTML= ids[friendList[i]]+" is Online";	

			}
		}

		

	});

	

	 $(document).on('submit','#form_message',function() {
        console.log("form_message_here");
        console.log($('#form_message_input').val());
		var out_msg={sender:myId,reciever:currentFriend,msg:$('#form_message_input').val()}
		socket.emit('chat_message',out_msg);
		$('#form_message_input').val('');
		return false;
    });


	socket.on('chat_message', function(msg){
		// console.log("form_message_incoming");
		var raw_msg = msg.message;
		

		if(msg.self==1){

				var position = 0;
				while(position< symbols.length ){
						var pos =raw_msg.indexOf(symbols[position]); 
						if(pos!= -1){
							raw_msg = raw_msg.substring(0,pos)+ '<img src=images/'+ symbols_map2[position]+' alt="Smiley face" width="30" height="30" align="middle"> '+raw_msg.substring(pos+3,raw_msg.length);
						}

						else{
							position = position+1;		
						}
				}		

			$("#"+ids[msg.sender]+"_"+ids[msg.reciever]+"_messages").append($('<div class="selected_self"> <p style="color:Green;"> <span style="font-weight: bold;">'+ ids[msg.sender]+": " +'</span> </p> <p>' + raw_msg +'</p> </div> <br>'));
			document.getElementById(ids[msg.sender]+"_"+ids[msg.reciever]+"_seen").innerHTML= "";


		}
		else{

			var position = 0;
			while(position< symbols.length ){
					var pos =raw_msg.indexOf(symbols[position]); 
					if(pos!= -1){
						raw_msg = raw_msg.substring(0,pos)+ '<img src=images/'+ symbols_map1[position]+' alt="Smiley face" width="30" height="30" align="middle"> '+raw_msg.substring(pos+3,raw_msg.length);
					}

					else{
						position = position+1;		
					}
			}		
			var vid = document.getElementById("myVideo");
			vid.autoplay = true;
		    vid.load();
			socket.emit('delivered',{sender:msg.reciever,reciever:msg.sender});
			new_messages[msg.sender]=1;
			document.getElementById(ids[msg.reciever]+"_"+ids[msg.sender]+"_seen").innerHTML= "";
			console.log(msg.sender);
			console.log(currentFriend);
			if(new_messages[msg.sender]==1 && currentFriend==msg.sender){
				console.log("emittt new");
				socket.emit('seen',{sender:msg.reciever,reciever:msg.sender});
			}

			$("#"+ids[msg.reciever]+"_"+ids[msg.sender]+"_messages").append($('<div class="selected_other" > <p style="color:blue;"> <span style="font-weight: bold;">'+ids[msg.sender]+": "+ '</span> </p> <p>' + raw_msg +' </p> </div> <br>'));

		}

	});

	var typing = 0;
	var timeout = undefined;

	function timeoutFunction() {  
	  typing= 0;
	  var info={sender:myId,reciever:currentFriend,val:0};
					console.log(" time emmited");

	  socket.emit("typing", info);
	}


		$(document).on('keypress','#form_message',function(e) {
				 console.log("key pressed");

			if (e.which !== 13) {
			    if (typing == 0) {
					typing = 1;
					var info={sender:myId,reciever:currentFriend,val:1};
					console.log("emmited");
					socket.emit("typing", info);	
			      
			    } 
			    else {
			      clearTimeout(timeout);
			      timeout= setTimeout(timeoutFunction, 2000);
			    }
			}
			else{
				clearTimeout(timeout);
				timeout = setTimeout(timeoutFunction, 0);
			}

		});

	socket.on('typing',function(msg){
		// console.log("typing...");
		// console.log("typing_status_"+ids[myId]+"_"+ids[msg.id]);
		if(msg.type_status==1){
			document.getElementById("typing_status_"+ids[myId]+"_"+ids[msg.id]).innerHTML= ids[msg.id]+" is Typing...";
		}
		else{
			document.getElementById("typing_status_"+ids[myId]+"_"+ids[msg.id]).innerHTML="";
		}

		
	});

	socket.on('delivered',function(msg){
		console.log("delivered yar");
		console.log(ids[myId]+"_"+ids[msg]+"_seen");
		document.getElementById(ids[myId]+"_"+ids[msg]+"_seen").innerHTML= "Message Delivered.  ";
		
	});

	socket.on('seen',function(msg){
		console.log("seeen yar");
		console.log(ids[myId]+"_"+ids[msg]+"_seen");
		document.getElementById(ids[myId]+"_"+ids[msg]+"_seen").innerHTML= "Seen By "+ids[msg]+"    ";
		
	});


	

	
});


var openlist = function(v){
	console.log(ids[v]);
	document.getElementById(ids[myId]+'List').style.display="none";
	for(var i=0;i<friendList.length;i++){
		if(friendList[i]!=v){
			document.getElementById(ids[myId]+"_"+ids[friendList[i]]).style.display="none";
			document.getElementById("chat_form_"+ids[friendList[i]]).innerHTML="";
			// document.getElementById(ids[myId]+"_"+ids[friendList[i]]+"_seen").innerHTML= "";

		}
		else{
			document.getElementById(ids[myId]+"_"+ids[friendList[i]]).style.display="block";
			document.getElementById("chat_form_"+ids[friendList[i]]).innerHTML="";


   			currentFriend=v;


			if(new_messages[v]==1){
				socket.emit('seen',{sender:myId,reciever:v});
			}
			// else{
			// 	document.getElementById(ids[myId]+"_"+ids[friendList[i]]+"_seen").innerHTML= "";
			// }

			d3.select("#chat_form_"+ids[friendList[i]])
				.append('form').attr("id","form_message")
        		// .attr("action",)
        		.append("li")
        		.append('input').attr("type","text")
        		.attr("id","form_message_input")
        		.attr("value","Enter Meesage")
        		.attr("onfocus","this.value = '';")
        		.attr("onblur","if (this.value == '') {this.value = 'Enter Message';}");

		}
	}
}


var gotoList = function(){
	document.getElementById(ids[myId]+"List").style.display="block";
	currentFriend=-1;
	for(var i=0;i<friendList.length;i++){
 			document.getElementById(ids[myId]+"_"+ids[friendList[i]]).style.display="none";
 	}

}

function PlaySound(soundObj) {
  var sound = document.getElementById(soundObj);
  sound.Play();
}