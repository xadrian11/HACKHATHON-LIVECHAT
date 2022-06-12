export {};

chrome.runtime.sendMessage("get-domain-list", (response) => {
    messageHandler(response)
})

function messageHandler(message) {

    if (!message) return

    const anchorList = document.querySelectorAll("a");
    const domainList = JSON.parse(message.data);
  
    const foundAnchor = [...anchorList].find(anchor => {
      return domainList.some(domain => {
        return anchor.href.includes(domain.url)
      })
    })

    foundAnchor.style.border = "2px solid #c4141b";
    foundAnchor.style.borderRadius = "5px";
}


