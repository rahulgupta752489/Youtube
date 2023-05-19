//  https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=rrr&key=[AIzaSyCL3HTPlmqNvQ4Kqzov9iuQgCzyftf7NuY]

// I need to write function defination for searchVideos().
// 1. function defination for searchVideos.
// 2. make fetch call (api call).

import { navbar } from "./component/navbar.js";

let navbar_div = document.getElementById('navbar');
navbar_div.innerHTML = navbar(); 


document.getElementById("search").addEventListener("input", () =>{
    debounce()
  });
  document.querySelector("body").onload=function(){
    debounce()
  }

let loader=document.getElementById("loader");


let id;
let debounce= () =>{
  
        if(id){
          clearTimeout(id);
        }
        id= setTimeout(searchVideos,1000)

}



const searchVideos = async () => {

    try {
        loader.style.display = 'block';

    const API_KEY = 'AIzaSyCL3HTPlmqNvQ4Kqzov9iuQgCzyftf7NuY'

    let search_term = document.getElementById('search').value;

   let response =await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search_term}&key=${API_KEY}`);
   //console.log(response);
   let data = await response.json();
   //console.log('data:', data);
   let actual_data = data.items;
   loader.style.display = 'none';
   appendVideos(actual_data);
   console.log('actual_data', actual_data);
    }
    catch (error) {
        console.log('error:', error);
    }
    
};

const container = document.getElementById('container');

const appendVideos = (data) => {

    var arr = [];

    container.innerHTML = null;

    // let search_btn = document.getElementById('search_btn');
    // search_btn.onclick = () => {
    //     searchVideos();
    // }

    data.forEach(({ snippet, id : { videoId } }) => {

        let div = document.createElement('div');

        let p_title = document.createElement('p');
        p_title.innerText = snippet.title;

        let p_channel_name = document.createElement('p');
        p_channel_name = snippet.channelTitle;

        let thumbnail = document.createElement('img');
        thumbnail.src = snippet.thumbnails.high.url;

        div.append(thumbnail, p_title, p_channel_name);
        //console.log('div:', div)
        //document.getElementById('container').append(div);
        // add event handler to this div.
        // transfer data from, index.html to video.html.
        // data = the video that user clickd { snippet, videoId}
        div.onclick = () => {
           let data = {
            // if your key name and value are same then you can write it like below fashion.
            snippet,
            videoId,
           };

           data = JSON.stringify(data);
           localStorage.setItem('clicked_video', data);

           window.location.href = '/video.html';
        };

         container.append(div);
        let recommendation = {
            videoId: videoId,
            name: snippet.channelTitle,
            title: snippet.title,
        }
        arr.push(recommendation);
        console.log(arr);
        localStorage.setItem('recommendation_videos', JSON.stringify(arr));
    });
};

let signin = document.getElementById('signin');
signin.addEventListener('click', function() {
    window.location.href = "auth.html";
})
// youtube app day 2 

// Make the thumbnail clickable.
// How can i make something clickable -> by adding event listener
// where to add event listener -> jaha div ka janm ho rha hai.
// How youtube identifies a video.


