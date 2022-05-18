// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

console.log("foreground script loaded");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  if (request.from != "nexus-image-downloader-popup") {
    sendResponse({
      name: "from-foreground",
    });
    console.log("response sent");
    return true;
  }
  let imageList = [];
  if (request.user_image) {
    let list = document.querySelectorAll("#mod_images_list_2 li div a");
    list.forEach((item) => {
      imageList.push(item.href);
    });
  } else {
    let list = document.querySelectorAll("ul.thumbgallery.gallery.clearfix li");
    list.forEach((item) => {
      imageList.push(item.dataset.src);
    });
    // let list = document.querySelectorAll("#mod_images_list_1 li div a");
    // list.forEach((item) => {
    //   imageList.push(item.href);
    // });
  }
  console.log(imageList);

  let gameId = "UnknownGameId" + new Date().getUTCMilliseconds();
  let modId = "UnknownModId" + new Date().getUTCMilliseconds();
  let gameName = "UnknownGameName" + new Date().getUTCMilliseconds();
  let modName = "UnknownModName" + new Date().getUTCMilliseconds();

  let dataElement = document.querySelector("section#section.modpage");
  let titleDiv = document.querySelector(".game-name");
  let modNameDiv = document.querySelector("#pagetitle h1");

  gameName = titleDiv.textContent;
  modName = modNameDiv.textContent;
  console.log(dataElement.dataset);
  if (dataElement && dataElement.dataset) {
    if (dataElement.dataset.gameId) {
      gameId = dataElement.dataset.gameId;
    }
    if (dataElement.dataset.modId) {
      modId = dataElement.dataset.modId;
    }
  }

  sendResponse({
    from: "foreground",
    user_image: request.user_image,
    urlList: imageList,
    gameId: gameId,
    modId: modId,
    gameName: gameName,
    modName: modName,
  });
});
