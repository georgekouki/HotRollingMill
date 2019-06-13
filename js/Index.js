
  var canvas = document.getElementById('myCanvas');
  var newRow = "";
  var infoContainer = document.getElementById("info");
  var dbref = firebase.database().ref().child('persons');
  var ctx = canvas.getContext('2d');

  Draw_Map();

  setInterval(showTime, 1000);

  dbref.on('value',function(snapshot){
    var checkInCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Draw_Map();
    infoContainer.innerHTML = '';

    var data = snapshot.child('person').toJSON();
    for (var id in data){
      if(data[id].checkIn!==null && data[id].checkIn!==undefined){
        if(data[id].checkIn==true)
        {
            checkInCount = checkInCount +1;
            newRow = document.createElement("div");
            newRow.className = "row";
            var str = '<div class="col-xs-5"> ' + data[id].checkInTime + '</div>'
              + '<div class="col-xs-3">' + data[id].location.toLowerCase() + '</div>'
              +'<div class="col-xs-4">' + id + ' / ' + data[id].name + '</div>' ;
            newRow.innerHTML = str;
            infoContainer.appendChild(newRow);
            
              switch(data[id].location.toLowerCase()) {
                case "room1":
                  DrawCircleInRoom(25,120,10,id);
                  break;
                case "room2":
                DrawCircleInRoom(80,30,10,id);
                  break;
                case "room3":
                  DrawCircleInRoom(80,75,10,id);
                  break;
                case "room4":
                    DrawCircleInRoom(100,120,10,id);
                  break;
                case "room5":
                DrawCircleInRoom(140,15,10,id);
                  break;
                case "room6":
                DrawCircleInRoom(200,30,10,id);  
                  break;
                case "room7":
                DrawCircleInRoom(205,75,10,id);
                break;
                case "room8":
                  DrawCircleInRoom(235,75,10,id);
                    break;
                case "room9":
                  DrawCircleInRoom(250,120,10,id);
                break;
                case "room10":
                DrawCircleInRoom(260,30,10,id);      
                    break;
                case "room11":
                  DrawCircleInRoom(287,75,10,id);
                break;
                default:
                    break;
            }
          }
        }
      }
      document.getElementById("check-out-count").innerHTML = checkInCount + ' checked in';
   }); 

  function DrawCircleInRoom(x,y,radius,text){
    ctx.globalAlpha =0.5;

    ctx.fillStyle = "#536071"; 
    ctx.beginPath();
    ctx.arc(x,y,radius+10,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha =1;
    ctx.fillStyle = "#27625C"; 
    ctx.beginPath();
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth=1;
    ctx.fillStyle = "white";
    ctx.font="12px sans-serif";
    ctx.fillText(text, parseInt(x)-13, parseInt(y)+5);

  }

  function showTime() {
    var span = document.getElementById('time');
      var d = new Date();
      var s = d.getSeconds();
      var m = d.getMinutes();
      var h = d.getHours();
      span.textContent = h + ":" + m + ":" + s;
    }

    function Draw_Map()
    {
      ctx.globalCompositeOperation = "lighter";
      base_image = new Image();
      base_image.src = 'img/hotrollingmap.png';
      base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0, base_image.width,base_image.height, 0, 0,canvas.width,canvas.height);
      }
  }

