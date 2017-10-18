const twitchAPISTREAMS = 'https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/streams/';
const twitchAPICHANNELS = 'https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/channels/'
//dyrus (30080751), wingsofdeath (30171560), nightblue3, imaqtpie, 
//frogen, shiptur, biasfate, yassuo, tobiasfate

var pre_streams = ["ESL_SC2", "OgamingSC2", "trick2g", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var isOnline;
var noLogo = 'https://www.twitch.tv/p/assets/uploads/glitch_notcomboone_474x356.png';


$(document).on('keypress',function(e) {
    if(e.which == 13) {
        takeInput();
    }
});
function fetchDataStream(streamer){
    fetch(twitchAPISTREAMS+streamer,{
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(function(response){
        console.log(response.status);
        response.json().then(function(data){
            
            if(data.stream == null){
                console.log('offline');
                isOnline = false;
                fetchDataChannel(streamer);
            }else{
                console.log('online');
                isOnline = true;
                drawResult(data.stream.preview.medium,data.stream.channel.display_name,data.stream.stream_type,data.stream.game,data.stream.viewers,data.stream.average_fps,data.stream.channel.url);
            }
            console.log(data);
            

        }).catch(function(err){
            console.log(err);
        })
    })
}


//================================================================


function fetchDataChannel(streamer){
    fetch(twitchAPICHANNELS+streamer,{
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(function(response){
        console.log(response.status);
        response.json().then(function(data){
            console.log(data);
            if(data.error){
                alert('Unable to find that stream.')
            }else{
                drawResultC(data.profile_banner, data.display_name, data.status, data.updated_at, data.url);
                
            }

        }).catch(function(err){
            console.log(err);
        })
    })
    console.log('THIS IS DA CHANNELZ');
}
function drawResult(preview,name,status,playing,viewers,fps,channelURL){

    $('.responseBox').prepend(
        `
        <div id="${name}" class="card streams" style="width: 20rem;">
        <img class="card-img-top logo" src="${preview}" alt="Card image cap">
        <div class="card-block">
          <h4 class="card-title">${name}</h4>
          <p class="card-text">
          Channel is ${status}
          playing ${playing}
          <br>Viewers : ${viewers}
          <br>FPS: ${fps}
          <p>Status ${isOnline}</p
          </p>
          <div class="btn-group" role="group" aria-label="Basic example">
          <a href="${channelURL}" target="_blank"><button type="button" class="btn btn-primary">Go to Channel</button></a>
          <button type="button" id="savebtn" onclick="save('${name}')" class="btn btn-success">Save</button>
          <button type="button" id="deletebtn" onclick="deleteSaved('${name}')" class="btn btn-danger">Delete</button>
        </div>
        </div>
      </div>
        `
    )
    $('#goToBtn').on('click', function() {
        // window.open(channelURL);
    })
}

function drawResultC(banner,name,status,statusUpdateDate,channelURL){
    let image;
    if(banner == null){
        image = noLogo;
    }else{
        image = banner;
    }
        $('.responseBox').prepend(
            `
            <div id="${name}" class="card streams" style="width: 20rem;">
            <img class="card-img-top logo" src="${image}" alt="Card image cap">
            <div class="card-block">
              <h4 class="card-title">${name} </h4> 
              <p class="card-text">
              <i>is Offline</i>
              </p>
              <br><br><br><br>
              <div class="btn-group" role="group" aria-label="Basic example">
              <a href="${channelURL}" target="_blank"><button type="button" class="btn btn-primary">Go to Channel</button></a>
              <button type="button" id="savebtn" onclick="save('${name}')" class="btn btn-success">Save</button>
              <button type="button" id="deletebtn" onclick="deleteSaved('${name}')" class="btn btn-danger">Delete</button>
            </div>
              </div>
          </div>
            `
        )
        $('#goToBtn').on('click', function() {
            // window.open(channelURL);
        })
    }

    function takeInput(){
        var input = $('#streamer').val();
        console.log('clicked');
        fetchDataStream(input);
    }
function save(name){
    console.log('saved');
        let savedStreams = [];
        savedStreams = JSON.parse(localStorage.getItem('saved'));
        savedStreams.push(name);
        console.log(savedStreams);
        localStorage.setItem('saved', JSON.stringify(savedStreams));
}

function deleteSaved(name){
    let savedStreams = [];
    savedStreams = JSON.parse(localStorage.getItem('saved'));
    for(let i = 0; i<savedStreams.length; i++){
        if(savedStreams[i] === name){
            savedStreams.splice(i, 1);
            localStorage.setItem('saved', JSON.stringify(savedStreams));
            deleteElement(name);
        }
    }
}

function deleteElement(element){
    console.log(element + ' from delete function');
    $('#'+element).remove();
}

$(function(){
    // $('#srchBtn').on('click',takeInput);
    if (typeof(Storage) !== "undefined") {
        
        if(localStorage.getItem('saved') == null){
            let savedStreams = [];
            localStorage.setItem('saved', JSON.stringify(savedStreams));
        }else{
        let savedStreams = [];
        savedStreams = JSON.parse(localStorage.getItem('saved'));
        console.log('Type is:' + typeof savedStreams);
        
        console.log(savedStreams);
        savedStreams.forEach(function(name){
            fetchDataStream(name);

        })
        }
    } else {
        alert('Your browser does not support web storage which means that you will be not be able to save your favorite streamers... :(')
    }


})
