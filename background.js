async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
    currentWindow: true,
    active: true
  });

  return tabs[0];
}
console.log('bbb------');

chrome.tabs.onUpdated.addListener(async (tabId, tab) => {
  console.log('onUpdated', tab,);
  console.log('onUpdated tabIdtabId', tabId,);

  const activeTab = await getActiveTabURL();
  console.log(activeTab, 'activeTabactiveTabactiveTab');
  if (activeTab.url && activeTab.url.includes("youtube.com/watch")) {
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const activeTab = await getActiveTabURL();

  console.log(activeTab, 'onActivatedonActivated');
});
