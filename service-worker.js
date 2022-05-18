// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.

console.log(
  "This prints to the console of the service worker (background script)"
);

// Importing and using functionality from external files is also possible.
importScripts("service-worker-utils.js");

let gameId = "UnknownGameId";
let modId = "UnknownModId";
let gameName = "UnknownGameName";
let modName = "UnknownModName";

function handleDownload(list, index, user_image) {
  if (list.length < index) {
    return;
  }
  let url = list[index];
  let filename = url.substr(url.lastIndexOf("/") + 1);
  let filepath = `Nexus Image Downloader`;
  if (user_image) {
    filepath = `Nexus Image Downloader/${gameId}_${gameName}/${modId}_${modName}/Users Images/${filename}`;
  } else {
    filepath = `Nexus Image Downloader/${gameId}_${gameName}/${modId}_${modName}/${filename}`;
  }
  chrome.downloads.download(
    {
      url: url,
      filename: filepath,
    },
    () => {
      handleDownload(list, index + 1, user_image);
    }
  );
}

chrome.runtime.onMessage.addListener((message, callback) => {
  console.log(message);
  if (!message || !message.from || message.from != "foreground") {
    return;
  }
  gameId = message.gameId;
  modId = message.modId;
  gameName = message.gameName;
  modName = message.modName;
  handleDownload(message.urlList, 0, message.user_image);
});

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.
