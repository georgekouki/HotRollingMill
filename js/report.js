

var dbref = firebase.database().ref().child('reports');
  dbref.on('value',function(snapshot){
    var highRiskCount=0;
    var mediumRiskCount = 0;
    var lowRiskCount = 0;
    var data = snapshot.child('report').toJSON();
    clearHtmlData();
    for(var id in data){

        switch(data[id].risk.toLowerCase()){
            case "high":
            highRiskCount = highRiskCount + 1;
            showReportInformation("high", highRiskCount, data[id].location, data[id].date, data[id].time, id, data[id].name)
            break;
            case "medium":
            mediumRiskCount = mediumRiskCount + 1;
            showReportInformation("medium", mediumRiskCount, data[id].location, data[id].date, data[id].time, id, data[id].name)
            break;
            case "low":
            lowRiskCount = lowRiskCount + 1;
            showReportInformation("low", lowRiskCount, data[id].location, data[id].date, data[id].time, id, data[id].name)
            break;
        }
    }

    var highCountElement = document.getElementById("high-risk-count");
    highCountElement.innerHTML = '</br></br>' + highRiskCount;
    var mediumCountElement = document.getElementById("medium-risk-count");
    mediumCountElement.innerHTML = '</br></br>' + mediumRiskCount;
    var lowCountElement = document.getElementById("low-risk-count");
    lowCountElement.innerHTML= '</br></br>' +lowRiskCount;
  });

function showReportInformation(riskLevel, count, location, date, time, id, name){
    var riskDiv = document.getElementById(riskLevel+"-risk");
    newDiv = document.createElement("div");
    newDiv.className="reprot-line";
    var str = count + '. Hot rolling mill / '+ location +' / Risk Reported '+ date + ' ' + time + ' / ' + id + ' - ' + name + ' / ' + 
    '<a href="Media.html" class="media-link" onclick="saveId(' + id + ')"> Pictures and Voice record</a></p>';
    newDiv.innerHTML = str;
    riskDiv.appendChild(newDiv);

}
function clearHtmlData(){
    $('.reprot-line').remove();
    $('#high-risk-count').empty();
    $('#medium-risk-count').empty();
    $('#low-risk-count').empty();

}
function saveId(id){
    localStorage.setItem("id",id);
}
