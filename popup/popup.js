console.log("this is popup.js");
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");

btn1.onclick = async function (e) {
  let queryOptions = { active: true, currentWindow: true };
  let tab = await chrome.tabs.query(queryOptions);
  console.log("clicked 1");
  chrome.tabs.sendMessage(
    tab[0].id,
    { from: "nexus-image-downloader-popup", user_image: false },
    function (response) {
      console.log(response);
      chrome.runtime.sendMessage(response);
    }
  );
};

btn2.onclick = async function (e) {
  let queryOptions = { active: true, currentWindow: true };
  let tab = await chrome.tabs.query(queryOptions);

  chrome.tabs.sendMessage(
    tab[0].id,
    { from: "nexus-image-downloader-popup", user_image: true },
    function (response) {
      console.log(response);
      chrome.runtime.sendMessage(response);
    }
  );
};
