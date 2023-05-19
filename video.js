// What is the goal here ? plays the video.
// Do we have the data -> yes in LS.

import { navbar } from "./component/navbar.js";
let navbar_div = document.getElementById('navbar');
navbar_div.innerHTML = navbar();


let body=document.querySelector("body");
  body.onload=function(){
      showClickedVideo()
  }


const showClickedVideo = () => {

    let data = localStorage.getItem('clicked_video');

    let { videoId } = JSON.parse(data);
    
    // Embedding a video using iframe html element.
    
    let iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;

    iframe.width = '100%';
    iframe.height = '100%';
    iframe.setAttribute('allowfullscreen', true);

    let video_div = document.getElementById('video_details');
    video_div.append(iframe);
};


// recommendation videos code......

let arr = JSON.parse(localStorage.getItem('recommendation_videos'));
console.log(arr);

append(arr);

function append(data) {

    data.forEach(({videoId, name, title}) => {

        let div = document.createElement('div');

        let iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.width = '100%';
        let p_channel_name = document.createElement('p');
        p_channel_name.innerText = name;
        let p_title = document.createElement('p');
        p_title.innerText = title;

        div.append(iframe, p_channel_name, p_title);
        document.getElementById('recommendations').append(div);

    })
}


document.getElementById("icon").addEventListener("click",()=>{
    window.location.href="index.html"
})

