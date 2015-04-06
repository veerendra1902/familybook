    // var data=[{user:"swati",pass:"sweetu"},{user:"veerendra",pass:"bestu"}];
    // // var signin = function(){
    // //     console.log("entered");
    // //     var uname=$('#user_name').val();
    // //     var password=$('#user_password').val();
    // //     console.log(uname);
    // //     console.log(password);
    // //     console.log(data[0]);
    // //     // $("form").submit(1);
    // //     for(var i=0; i<data.length; i++){
    // //         if(uname==data[i].user && password==data[i].pass){
    // //              document.getElementById('SignIn').style.display="none";
    // //              document.getElementById('swatiList').style.display="block";

    // //         }
    // //     }
        
    // // }


     var openlist = function(str){
        console.log(str);
        if(str=="swatiVeerendra"){  
            // console.log("yeah ub ");
            document.getElementById('SignIn').style.display="none";
            document.getElementById('swatiList').style.display="none";
            document.getElementById('veerendraList').style.display="none";
            document.getElementById('ravindraList').style.display="none";
            document.getElementById('swati_veerendra').style.display="block";
            if($("#my_id").val()=="swati"){
                 document.getElementById('swati_veerendra_header').innerHTML="Veerendra is Online"
            }
            else{
                 document.getElementById('swati_veerendra_header').innerHTML="Swati is Online"

            }
           
        }

        else if(str=="dhruviVeerendra"){  
            // console.log("yeah ub ");
            document.getElementById('SignIn').style.display="none";
            document.getElementById('dhruviList').style.display="none";
            document.getElementById('veerendraList').style.display="none";
            document.getElementById('swatiList').style.display="none";
            document.getElementById('dhruvi_veerendra').style.display="block";
            if($("#my_id").val()=="dhruvi"){
                 document.getElementById('dhruvi_veerendra_header').innerHTML="Veerendra is Online"
            }
            else{
                 document.getElementById('dhruvi_veerendra_header').innerHTML="Dhruvi is Online"

            }
           
        }

        else if(str=="swatiDhruvi"){  
            // console.log("yeah ub ");
            document.getElementById('SignIn').style.display="none";
            document.getElementById('swatiList').style.display="none";
            document.getElementById('veerendraList').style.display="none";
            document.getElementById('dhruviList').style.display="none";
            document.getElementById('swati_dhruvi').style.display="block";
            if($("#my_id").val()=="swati"){
                 document.getElementById('swati_dhruvi_header').innerHTML="Dhruvi is Online"
            }
            else{
                 document.getElementById('swati_dhruvi_header').innerHTML="Swati is Online"

            }
           
        }

        else if(str=="swatiRavindra"){  
            // console.log("yeah ub ");
            document.getElementById('SignIn').style.display="none";
            document.getElementById('swatiList').style.display="none";
            document.getElementById('ravindraList').style.display="none";
            document.getElementById('veerendraList').style.display="none";

            document.getElementById('swati_ravindra').style.display="block";
            if($("#my_id").val()=="swati"){
                 document.getElementById('swati_ravindra_header').innerHTML="Ravindra is Online"
            }
            else{
                 document.getElementById('swati_ravindra_header').innerHTML="Swati is Online"

            }
        }
        else if(str=="veerendraRavindra"){  
            // console.log("yeah ub ");
            document.getElementById('SignIn').style.display="none";
            document.getElementById('veerendraList').style.display="none";
            document.getElementById('ravindraList').style.display="none";
            document.getElementById('swatiList').style.display="none";

            document.getElementById('veerendra_ravindra').style.display="block";
            if($("#my_id").val()=="veerendra"){
                 document.getElementById('veerendra_ravindra_header').innerHTML="Ravindra is Online"
            }
            else{
                 document.getElementById('veerendra_ravindra_header').innerHTML="Veerendra is Online"


            }
        }
     }

     var gotoList = function(){
        if($("#my_id").val()=="swati"){
            document.getElementById('SignIn').style.display="none";
            document.getElementById('swatiList').style.display="block";
            document.getElementById('swati_veerendra').style.display="none";
            document.getElementById('swati_ravindra').style.display="none";
            document.getElementById('swati_dhruvi').style.display="none";



        }
        else if($("#my_id").val()=="veerendra"){
            document.getElementById('SignIn').style.display="none";
            document.getElementById('veerendraList').style.display="block";
            document.getElementById('swati_veerendra').style.display="none";
            document.getElementById('veerendra_ravindra').style.display="none";
            document.getElementById('dhruvi_veerendra').style.display="none";



        }
        else if($("#my_id").val()=="ravindra"){
            document.getElementById('SignIn').style.display="none";
            document.getElementById('ravindraList').style.display="block";
            document.getElementById('swati_ravindra').style.display="none";
            document.getElementById('veerendra_ravindra').style.display="none";


        }

        else if($("#my_id").val()=="dhruvi"){
            document.getElementById('SignIn').style.display="none";
            document.getElementById('dhruviList').style.display="block";
            document.getElementById('dhruvi_veerendra').style.display="none";
            document.getElementById('swati_dhruvi').style.display="none";
            


        }
     }




