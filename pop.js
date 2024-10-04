document.getElementById('downloadBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const youtubeUrl = tabs[0].url;
        if (youtubeUrl.includes("youtube.com/watch")) {
            chrome.runtime.sendMessage({ action: 'download', url: youtubeUrl });
        } else {
            alert('Not a valid YouTube video URL');
        }
    });
});