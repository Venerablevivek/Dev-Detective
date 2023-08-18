const userDarkTheme = document.querySelector("[data-userLightTab]");
const theme = document.querySelector(".theme-container");
const getuserName = document.querySelector("[data-getUserName]");
const btnText = document.querySelector(".theme");
const btnIcon = document.querySelector("[data-btnIcon]");
const root = document.documentElement.style;
const searchUser = document.querySelector(".search-container");
const btnSearch = document.querySelector(".btn");
let darkmode = false;
const searchForm = document.querySelector("[data-searchForm]");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const callUrl = "https://api.github.com/users/";
const noResult = document.querySelector(".no-results");
const userInfocontainer = document.querySelector(".user-info-container");
const mainInfo = document.querySelector(".user-extraInfo");

noResult.style.display="none";

userDarkTheme.addEventListener("click",function(){
    if(darkmode==false){
      darkModeProperties();
    }else{
        lightModeProperties();
    }
});

searchUser.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(getuserName.value==="") return;
    
    getUrl(callUrl+getuserName.value);
});

getuserName.addEventListener("keydown",function(e){
  if(!e){
    var e = window.event;
  }
  if(e.key=="Enter"){
    if(getuserName.value!==""){
      getUrl(callUrl+getuserName.value);
    }
  }
},false);

function getUrl(callUrl){
    fetch(callUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    setUserInfo(data);
  }).catch(function (error) {
    noResult.classList.add("active");
    console.log('request failed', error)
  });
}

getuserName.addEventListener("input", function () {
  noResult.style.display = "none";
  userInfocontainer.classList.remove("active");
  searchForm.classList.add("active");
});


function setUserInfo(gitUserInfo){
  if (gitUserInfo.message !== "Not Found"){
    noResult.style.display = "none";

  const userImage = document.querySelector("[data-userImage]");
  const setuserName = document.querySelector("[data-userName]");
  const userDate = gitUserInfo.created_at.split("T").shift().split("-");
  const userJoined = document.querySelector("[data-userJoined]");
  const usernameLink = document.querySelector("[data-userLink]");
  const userBio = document.querySelector("[data-userBio]");
  const userRepos = document.querySelector("[data-userRepos]");
  const userFollowers = document.querySelector("[data-userfollowers]");
  const userFollowing  = document.querySelector("[data-userfollowing]");
  const userLocation = document.querySelector("[data-userLocation]");
  const userWebsite = document.querySelector("[data-userwebsite]");
  const userTwitter = document.querySelector("[data-usertwitter]");
  const userCompany = document.querySelector("[data-usercompany]");

  userImage.src = gitUserInfo?.avatar_url;
  setuserName.innerText = gitUserInfo?.name;
  usernameLink.href = gitUserInfo?.html_url;
  usernameLink.innerText = '@'+gitUserInfo?.login;
  userJoined.innerText = `Joined ${userDate[2]} ${months[userDate[1] - 1]} ${userDate[0]}`;
  if(gitUserInfo?.bio!=null){
    userBio.innerText = gitUserInfo?.bio;
  }else{
    userBio.innerText = 'This Profile has no bio';
  }
  userRepos.innerText = gitUserInfo?.public_repos;
  userFollowers.innerText = gitUserInfo?.followers;
  userFollowing.innerText = gitUserInfo?.following;
  userLocation.innerText = gitUserInfo?.location;

  if(gitUserInfo?.blog!=''){
    userWebsite.innerText = gitUserInfo?.blog;
    userWebsite.href = gitUserInfo?.blog;
  }else{
    userWebsite.href = `#`;
    userWebsite.innerText = "Not Available";
  }
  
  if(gitUserInfo?.twitter_username!=null){
    userTwitter.href = `https://twitter.com/${gitUserInfo?.twitter_username.toLowerCase()}`;
    userTwitter.innerText = gitUserInfo?.twitter_username;
  }else{
    userTwitter.href = '#';
    userTwitter.innerText = 'Not Available';
  }
  
  if(gitUserInfo?.company!=null){
    userCompany.innerText = gitUserInfo?.company;
  }else{
    userCompany.innerText = 'Not Available';
  }

  searchForm.classList.toggle("active");
  userInfocontainer.classList.toggle("active");
  }else{
    noResult.style.display="block";
  }

};

const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

// Check if there is a value for "dark-mode" in the user's localStorage
if (localStorage.getItem("dark-mode") === null) {
  // If there is no value for "dark-mode" in localStorage, check the device preference
  if (prefersDarkMode) {
    // If the device preference is for dark mode, apply dark mode properties
    darkModeProperties();
  } else {
    // If the device preference is not for dark mode, apply light mode properties
    lightModeProperties();
  }
} else {
  // If there is a value for "dark-mode" in localStorage, use that value instead of device preference
  if (localStorage.getItem("dark-mode") === "true") {
    // If the value is "true", apply dark mode properties
    darkModeProperties();
  } else {
    // If the value is not "true", apply light mode properties
    lightModeProperties();
  }
}

function darkModeProperties() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  btnText.innerText = "LIGHT";
  btnIcon.src = "Assets/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkmode = true;
  localStorage.setItem("dark-mode", true);
}
function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  btnText.innerText = "DARK";
  btnIcon.src = "Assets/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkmode = false;
  localStorage.setItem("dark-mode", false);
}
userInfocontainer.classList.toggle("active");
searchForm.classList.toggle("active");
getUrl(callUrl + "venerablevivek");
