// State Management
let tabs = [];
let activeTabId = null;

const viewPort = document.getElementById('view-port');
const tabsWrapper = document.getElementById('tabs-wrapper');
const urlInput = document.getElementById('url-input');
const newTabBtn = document.getElementById('new-tab-btn');

// Initialize with a default setup
window.addEventListener('DOMContentLoaded', () => {
    createNewTab("https://www.wikipedia.org");
    
    newTabBtn.addEventListener('click', () => createNewTab("about:blank"));
    urlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            navigateTo(urlInput.value);
        }
    });

    document.getElementById('refresh-btn').addEventListener('click', refreshActiveTab);
});

function createNewTab(url) {
    const tabId = 'tab-' + Date.now();
    const cleanUrl = formatUrl(url);

    const tabState = {
        id: tabId,
        url: cleanUrl,
        title: "Loading...",
        history: [cleanUrl],
        historyIndex: 0
    };

    tabs.push(tabState);
    renderTabs();
    createViewportFrame(tabState);
    switchTab(tabId);
}

function formatUrl(url) {
    if (url === "about:blank") return url;
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }
    return url;
}

function renderTabs() {
    tabsWrapper.innerHTML = '';
    tabs.forEach(tab => {
        const tabEl = document.createElement('div');
        tabEl.className = `tab ${tab.id === activeTabId ? 'active' : ''}`;
        tabEl.setAttribute('data-id', tab.id);
        tabEl.innerHTML = `
            <span class="tab-title">${tab.title || 'New Tab'}</span>
            <button class="close-tab" onclick="closeTab(event, '${tab.id}')">×</button>
        `;
        tabEl.addEventListener('click', () => switchTab(tab.id));
        tabsWrapper.appendChild(tabEl);
    });
}

function createViewportFrame(tab) {
    const isFrameable = checkFrameAllowed(tab.url);

    if (isFrameable) {
        const iframe = document.createElement('iframe');
        iframe.className = 'web-frame';
        iframe.id = `frame-${tab.id}`;
        iframe.src = tab.url;
        iframe.addEventListener('load', () => {
            tab.title = tab.url.replace('https://www.', '').replace('https://', '').split('/')[0];
            renderTabs();
        });
        viewPort.appendChild(iframe);
    } else {
        const mockDiv = document.createElement('div');
        mockDiv.className = 'web-frame sandbox-error';
        mockDiv.id = `frame-${tab.id}`;
        mockDiv.innerHTML = `
            <h2>⚠️ Connection Sandbox Notice</h2>
            <p>Modern sites employ <code>X-Frame-Options</code> policies that block raw frame loading inside parent domains.</p>
            <p>Simulating sandbox response for:<br><span class="url-display">${tab.url}</span></p>
        `;
        tab.title = "Blocked App";
        viewPort.appendChild(mockDiv);
    }
}

function switchTab(tabId) {
    activeTabId = tabId;
    const tab = tabs.find(t => t.id === tabId);
    
    document.querySelectorAll('.web-frame').forEach(frame => frame.classList.remove('active'));
    const currentFrame = document.getElementById(`frame-${tabId}`);
    if (currentFrame) currentFrame.classList.add('active');

    urlInput.value = tab.url === "about:blank" ? "" : tab.url;
    renderTabs();
}

function closeTab(e, tabId) {
    e.stopPropagation();
    tabs = tabs.filter(t => t.id !== tabId);
    const frame = document.getElementById(`frame-${tabId}`);
    if (frame) frame.remove();

    if (activeTabId === tabId && tabs.length > 0) {
        switchTab(tabs[tabs.length - 1].id);
    } else if (tabs.length === 0) {
        createNewTab("about:blank");
    } else {
        renderTabs();
    }
}

function navigateTo(url) {
    if (!activeTabId) return;
    const tab = tabs.find(t => t.id === activeTabId);
    const targetUrl = formatUrl(url);

    tab.url = targetUrl;
    
    const frame = document.getElementById(`frame-${activeTabId}`);
    if (frame) frame.remove();

    createViewportFrame(tab);
    switchTab(activeTabId);
}

function refreshActiveTab() {
    if (!activeTabId) return;
    const tab = tabs.find(t => t.id === activeTabId);
    navigateTo(tab.url);
}

function checkFrameAllowed(url) {
    // Basic whitelist allowed in frames natively
    const allowed = ['wikipedia.org', 'archive.org', 'puter.com', 'about:blank'];
    return allowed.some(domain => url.includes(domain));
}
