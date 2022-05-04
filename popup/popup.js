console.log("this is popup.js");
const sendMessageButton = document.querySelector("button");

sendMessageButton.onclick = async function (e) {
  let queryOptions = { active: true, currentWindow: true };
  let tab = await chrome.tabs.query(queryOptions);

  chrome.tabs.sendMessage(
    tab[0].id,
    { name: "nexus-image-downloader" },
    function (response) {
      console.log(response);
      chrome.runtime.sendMessage(response);
    }
  );
};
