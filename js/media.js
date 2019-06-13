
  $(document).ready(function() { 
    var id = localStorage.getItem("id");
    var dbref = firebase.database().ref().child('reports');
    var imagesContainer = document.getElementById('images-container');
    var audioContainer = document.getElementById('audio-container');
    var sound = document.createElement('audio');
    dbref.on('value', function(snapshot) {

        var data = snapshot.child('report/' + id).toJSON();
        for(var key in data.images){
            $(".image-view").remove();
            if($("#audio-player") != undefined){
                $("#audio-player").remove();
            }
                var newDiv = document.createElement("div");
                newDiv.innerHTML= '<img src = ' + data.images[key].replace("dl=0", "dl=1") + ' class="centered image-view">';
            imagesContainer.appendChild(newDiv);
        }
        data.voiceRecord = data.voiceRecord.replace("dl=0", "dl=1");
            sound.id       = 'audio-player';
            sound.controls = 'controls';
            sound.src      = data.voiceRecord;
            sound.className = "centered ";
            audioContainer.appendChild(sound);
            
    }); 
});