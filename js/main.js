const twtchAPI = 'https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/streams/';


$('#srchBtn').on('click',takeInput);
$(document).on('keypress',function(e) {
    if(e.which == 13) {
        takeInput();
    }
});
function fetchData(streamer){
    fetch(twtchAPI+streamer,{
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(function(response){
        console.log(response.status);
        response.json().then(function(data){
            console.log(data);
            drawResult(data.stream.preview.medium,data.stream.channel.display_name,data.stream.stream_type,data.stream.game,data.stream.viewers,data.stream.average_fps);
        }).catch(function(err){
            console.log(err);
        })
    })
}
function drawResult(preview,name,status,playing,viewers,fps){

    $('.responseBox').append(
        `
        <img src="${preview}">
        <h4>Streamer: </h4><h5>${name}</h5>
        <h4>Channel is </h4><h5>${status}</h5>
        <h4>Playing: </h4><h5>${playing}</h5>
        <h4>Viewers: </h4><h5>${viewers}</h5>
        <h4>FPS: </h4><h5>${fps}</h5>
        
        `
    )
}
function takeInput(){
    var name = $('#streamer').val();
    console.log(name);
    if (name == '') {
        alert(`Please don't leave me empty... :(`)
    } else {
        fetchData(name);
    }

}