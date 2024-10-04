chrome.action.onClicked.addListener((tab) => {
    const youtubeUrl = tab.url;
    if (youtubeUrl.includes("youtube.com/watch")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: downloadYouTubeVideo
        });
    } else {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Error',
            message: 'Not a valid YouTube video URL'
        });
    }
});

function downloadYouTubeVideo() {
    const videoUrl = window.location.href;

    // Placeholder for backend API call to get download links
    fetch('YOUR_BACKEND_API_URL', {
        method: 'POST',
        body: JSON.stringify({ url: videoUrl }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Download link received:", data.link);
        // Trigger download if link is valid
        chrome.downloads.download({ url: data.link });
        
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Download Status',
            message: 'Download started'
        });
    })
    .catch(error => {
        console.error("Error fetching download link:", error);
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Error',
            message: 'Failed to start download'
        });
    });
}