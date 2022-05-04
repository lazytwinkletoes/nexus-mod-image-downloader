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

function handleDownload(list, index) {
  if (list.length < index) {
    return;
  }
  let url = list[index];
  let filename = url.substr(url.lastIndexOf("/") + 1);
  chrome.downloads.download(
    {
      url: url,
      filename: `Nexus Image Downloader/${gameId}_${gameName}/${modId}_${modName}/${filename}`,
    },
    () => {
      handleDownload(list, index + 1);
    }
  );
}

chrome.runtime.onMessage.addListener((message, callback) => {
  console.log(message);
  gameId = message.gameId;
  modId = message.modId;
  gameName = message.gameName;
  modName = message.modName;
  handleDownload(message.urlList, 0);
});

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.
