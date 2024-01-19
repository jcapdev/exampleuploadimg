const firebaseConfig = {
    apiKey: "AIzaSyDJ5zi2ne_uXhEcJVJ7-8wUkhZICMWXePY",
    authDomain: "planeta-beta-f8361.firebaseapp.com",
    projectId: "planeta-beta-f8361",
    storageBucket: "planeta-beta-f8361.appspot.com",
    messagingSenderId: "227630890898",
    appId: "1:227630890898:web:d1464fc7b7bf2cc1c0cb4b"
  };

firebase.initializeApp(firebaseConfig)  


var fileText = document.querySelector(".fileText");
var uploadPercentage = document.querySelector(".uploadPercentage")
var progress = document.querySelector(".progress")
var percentVal;
var fileItem;
var fileName;
var img = document.querySelector(".img");

function getFile(e){
    fileItem = e.target.files[0];
    
    fileName = fileItem.name;
    fileText.innerHTML = fileName;
}


function uploadImage(){
    let storageRef = firebase.storage().ref("images/"+fileName);
    let uploadTask = storageRef.put(fileItem);

    uploadTask.on("state_changed",(snapshot)=>{
         console.log(snapshot);
         percentVal = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
         console.log(percentVal);
         uploadPercentage.innerHTML = percentVal+"%";
         progress.style.width=percentVal+"%";
    },(error)=>{
        console.log("error is", error)
    },()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log("URL",url);
            if(url != null){
                  img.setAttribute("src",url);
                  img.style.display = "block";
            }
        })
    })

}