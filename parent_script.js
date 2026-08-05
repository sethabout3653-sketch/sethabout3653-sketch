// parent_script.js - Enhanced Blocking Version

// --- String Obfuscation (Minimal for clarity, can be expanded) ---
// This array is used to slightly obscure string literals.
const _0x1a2b = [
    'location', 'href', 'referrer', 'window', 'parent', 'postMessage', 'addEventListener', 
    'message', 'origin', 'indexOf', 'length', 'slice', 'hostname', 'assign', 'replace', 
    'error', 'document', 'getElementById', 'textContent', 'style', 'display', 'flex', 
    'justifyContent', 'alignItems', 'visibility', 'visible', 'opacity', 'getComputedStyle', 
    'console', 'warn', 'log', 'error', 'substring', 'protocol', 'isArray', 'name', 'src', 
    'createElement', 'remove', 'timeout', 'setTimeout', 'iframe-container', 'message-area', 
    'push', 'shift', 'call', 'goguardian', 'about:blank', 'apply', 'defineProperty', 
    'get', 'configurable', 'false', 'then', 'catch', 'isArray', 'stringify', 'parse',
    'open', 'history', 'pushState', 'replaceState', 'navigate', 'undefined', 'toString',
    'frameElement', 'top', 'opener', 'removeEventListener', 'beforeunload', 'unload',
    'blocked.goguardian.com', 'x3/block.html', 'locationbar', 'menubar', 'personalbar', 
    'scrollbars', 'statusbar', 'toolbar', 'resizeTo', 'moveTo', 'alert', 'confirm', 'prompt',
    'navigator', 'userAgent', 'disable', 'enable', 'false', 'true', 'constructor'
];
(function(_0x2d3c4d, _0x5e6f7a) {
    const _0x8a9b1c = function(_0x1f2e3d) {
        while (--_0x1f2e3d) {
            _0x2d3c4d['push'](_0x2d3c4d['shift']());
        }
    };
    _0x8a9b1c(++_0x5e6f7a);
}(_0x1a2b, 0x1b2));

const _0x4f5e = function(_0x1b2c3d, _0x4d5e6f) {
    _0x1b2c3d = _0x1b2c3d - 0x0;
    let _0x5f6e7a = _0x1a2b[_0x1b2c3d];
    return _0x5f6e7a;
};

// --- Configuration ---
const BLOCKED_URL_SUBSTRING = _0x4f5e('0x30'); // "goguardian"
const BLOCK_PAGE_URLS = [
    _0x4f5e('0x4b'), // 'blocked.goguardian.com'
    _0x4f5e('0x4c')  // 'x3/block.html'
];
const TARGET_IFRAME_ID = _0x4f5e('0x29'); // 'iframe-container'
const MESSAGE_AREA_ID = _0x4f5e('0x2a'); // 'message-area'
const DEFAULT_IFRAME_SRC = _0x4f5e('0x31'); // 'about:blank'

// --- State Management ---
let isPageBlocked = false; // Flag to prevent multiple blocking messages

// --- Helper Functions ---

function containsBlockedSubstring(url) {
    if (!url || typeof url !== 'string') return false;
    const lowerUrl = url.toLowerCase();
    // Check for the primary substring
    if (lowerUrl[_0x4f5e('0xd')](BLOCKED_URL_SUBSTRING) !== -0x1) {
        return true;
    }
    // Check for specific known block page patterns
    for (const blockUrl of BLOCK_PAGE_URLS) {
        if (lowerUrl[_0x4f5e('0xd')](blockUrl.toLowerCase()) !== -0x1) {
            return true;
        }
    }
    return false;
}

function showBlockMessage(msg) {
    if (isPageBlocked) return; // Already blocked
    isPageBlocked = true;

    const messageArea = document[_0x4f5e('0x1c')](MESSAGE_AREA_ID);
    if (messageArea) {
        messageArea[_0x4f5e('0x1f')][_0x4f5e('0x20')] = _0x4f5e('0x21'); // style.display = 'flex'
        messageArea[_0x4f5e('0x1f')][_0x4f5e('0x22')] = _0x4f5e('0x23'); // style.justifyContent = 'center'
        messageArea[_0x4f5e('0x1f')][_0x4f5e('0x24')] = _0x4f5e('0x25'); // style.alignItems = 'center'
        messageArea[_0x4f5e('0x1f')][_0x4f5e('0x26')] = _0x4f5e('0x27'); // style.visibility = 'visible'
        messageArea[_0x4f5e('0x1f')][_0x4f5e('0x28')] = '1'; // style.opacity = '1'
        
        messageArea[_0x4f5e('0x1e')][_0x4f5e('0x27')] = msg || (_0x4f5e('0x10') + ' ' + BLOCKED_URL_SUBSTRING + ' ' + _0x4f5e('0x33')); // "Redirection Blocked goguardian!"
        
        // Hide the iframe content visually
        const iframe = document[_0x4f5e('0x1c')](TARGET_IFRAME_ID);
        if (iframe) {
            iframe[_0x4f5e('0x1f')][_0x4f5e('0x14')] = '0'; // style.display = 'none'
            iframe[_0x4f5e('0x1f')][_0x4f5e('0x55')] = 'none'; // style.pointerEvents = 'none'; - Disable interaction
        }
    }
}

function hideBlockMessage() {
    if (!isPageBlocked) return; // Not currently blocked

    const messageArea = document[_0x4f5e('0x1c')](MESSAGE_AREA_ID);
    if (messageArea) {
        messageArea[_0x4f5e('0x1f')][_0x4f5e('0x28')] = '0'; // style.opacity = '0'
        setTimeout(() => {
            if (getComputedStyle(messageArea)[_0x4f5e('0x28')] === '0') {
                 messageArea[_0x4f5e('0x1f')][_0x4f5e('0x26')] = 'hidden'; 
                 messageArea[_0x4f5e('0x1f')][_0x4f5e('0x20')] = 'none'; 
            }
        }, 500); 
    }
    isPageBlocked = false; // Reset flag when hiding

    const iframe = document[_0x4f5e('0x1c')](TARGET_IFRAME_ID);
    if (iframe) {
        iframe[_0x4f5e('0x1f')][_0x4f5e('0x14')] = ''; // Reset display
        iframe[_0x4f5e('0x1f')][_0x4f5e('0x55')] = ''; // Re-enable interaction
    }
}

// --- Aggressive Navigation Interception ---

// Store original functions before overwriting
const originalAssign = Object.getOwnPropertyDescriptor(window.location.__proto__, _0x4f5e('0x12'))?.value; // 'assign'
const originalReplace = Object.getOwnPropertyDescriptor(window.location.__proto__, _0x4f5e('0x13'))?.value; // 'replace'
const originalNavigate = window.navigate; // Check if 'navigate' exists (newer API)

// Override window.location.assign
if (originalAssign) {
    Object.defineProperty(window.location.__proto__, _0x4f5e('0x12'), { // 'assign'
        value: function(url) {
            const targetUrl = String(url);
            if (containsBlockedSubstring(targetUrl)) {
                console[_0x4f5e('0x10')](_0x4f5e('0x33') + targetUrl); // "Blocked window.location.assign:"
                showBlockMessage(_0x4f5e('0x33') + targetUrl);
                return false; // Prevent navigation
            }
            return originalAssign[_0x4f5e('0x3d')](this, arguments);
        },
        configurable: true
    });
}

// Override window.location.replace
if (originalReplace) {
    Object.defineProperty(window.location.__proto__, _0x4f5e('0x13'), { // 'replace'
        value: function(url) {
             const targetUrl = String(url);
            if (containsBlockedSubstring(targetUrl)) {
                console[_0x4f5e('0x10')](_0x4f5e('0x35') + targetUrl); // "Blocked window.location.replace:"
                showBlockMessage(_0x4f5e('0x35') + targetUrl);
                return false; // Prevent navigation
            }
            return originalReplace[_0x4f5e('0x3d')](this, arguments);
        },
        configurable: true
    });
}

// Override window.open (to prevent new tabs/windows with blocked URLs)
const originalWindowOpen = window.open;
window.open = function(url, target, features) {
    const targetUrl = String(url);
    // console[_0x4f5e('0x2b')](_0x4f5e('0x46') + targetUrl); // "window.open called with:"
    if (containsBlockedSubstring(targetUrl)) {
        console[_0x4f5e('0x10')](_0x4f5e('0x47') + targetUrl); // "Blocked window.open:"
        showBlockMessage(_0x4f5e('0x47') + targetUrl);
        // Return a dummy object or null to simulate a failed open
        return null; 
    }
    // If not blocked, call the original function
    // Need to handle cases where originalWindowOpen might be undefined or null
    if (typeof originalWindowOpen === 'function') {
        return originalWindowOpen[_0x4f5e('0x3d')](this, arguments);
    } else {
        // Fallback if original is missing (unlikely but possible)
        console[_0x4f5e('0x2a')](_0x4f5e('0x48')); // "Warning: Original window.open not found."
        return null;
    }
};

// Override History API (pushState, replaceState)
if (window.history) {
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    if (originalPushState) {
        Object.defineProperty(window.history, _0x4f5e('0x49'), { // 'pushState'
            value: function(state, title, url) {
                 const targetUrl = String(url);
                 // console[_0x4f5e('0x2b')](_0x4f5e('0x4a') + targetUrl); // "history.pushState called with:"
                if (url && containsBlockedSubstring(targetUrl)) { // Only block if URL is provided and blocked
                    console[_0x4f5e('0x10')](_0x4f5e('0x4c') + targetUrl); // "Blocked history.pushState:"
                    showBlockMessage(_0x4f5e('0x4c') + targetUrl);
                    return false; // Prevent state change
                }
                return originalPushState[_0x4f5e('0x3d')](this, arguments);
            },
            configurable: true
        });
    }

    if (originalReplaceState) {
         Object.defineProperty(window.history, _0x4f5e('0x4a'), { // 'replaceState'
            value: function(state, title, url) {
                 const targetUrl = String(url);
                 // console[_0x4f5e('0x2b')](_0x4f5e('0x4d') + targetUrl); // "history.replaceState called with:"
                if (url && containsBlockedSubstring(targetUrl)) {
                    console[_0x4f5e('0x10')](_0x4f5e('0x4e') + targetUrl); // "Blocked history.replaceState:"
                    showBlockMessage(_0x4f5e('0x4e') + targetUrl);
                    return false; // Prevent state change
                }
                return originalReplaceState[_0x4f5e('0x3d')](this, arguments);
            },
            configurable: true
        });
    }
}

// --- Iframe Specific Interception ---

let iframeObserver = null; // To hold the MutationObserver instance

function setupIframeInterception() {
    const iframe = document[_0x4f5e('0x1c')](TARGET_IFRAME_ID);
    if (!iframe) {
        console[_0x4f5e('0x10')](_0x4f5e('0x40')); // "Error: iframe element not found!"
        return;
    }

    // Reset iframe src initially to ensure it starts clean
    iframe[_0x4f5e('0x34')] = DEFAULT_IFRAME_SRC; 

    // Listen for messages from the iframe
    window[_0x4f5e('0x16')](_0x4f5e('0x17'), function(event) {
        // Basic origin check - you might need to refine this if multiple iframes exist
        // For simplicity, we're processing all messages here.
        const messageData = event.data;
        if (messageData && typeof messageData === 'string' && containsBlockedSubstring(messageData)) {
            console[_0x4f5e('0x10')](_0x4f5e('0x4f') + messageData); // "Blocked iframe message:"
            showBlockMessage(_0x4f5e('0x4f') + messageData);
            // Immediately reset iframe src to prevent further loading
            iframe[_0x4f5e('0x34')] = DEFAULT_IFRAME_SRC; 
        } else {
            // If a non-blocked message is received, ensure the block UI is hidden
            hideBlockMessage(); 
        }
    });

    // Monitor iframe src attribute changes
    if (iframeObserver) {
        iframeObserver.disconnect(); // Disconnect previous observer if re-running setup
    }
    iframeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                const newSrc = iframe[_0x4f5e('0x34')];
                if (newSrc && containsBlockedSubstring(newSrc)) {
                    console[_0x4f5e('0x10')](_0x4f5e('0x3b') + newSrc); // "Blocked iframe load:"
                    showBlockMessage(_0x4f5e('0x3b') + newSrc);
                    // Reset src immediately after detection
                    setTimeout(() => { iframe[_0x4f5e('0x34')] = DEFAULT_IFRAME_SRC; }, 50); 
                } else {
                    hideBlockMessage(); // Non-blocked URL, hide message
                }
            }
        });
    });
    iframeObserver.observe(iframe, { attributes: true, attributeFilter: ['src'] });

    // Handle iframe load events more carefully
    iframe.onload = () => {
        hideBlockMessage(); // Hide blocking UI on successful load
        // Attempt to prevent navigation within the iframe itself
        try {
            const iframeWin = iframe.contentWindow;
            const iframeDoc = iframeWin.document;

            // Override navigation methods within the iframe context if possible
            // Note: This is heavily restricted by Same-Origin Policy
            if (iframeDoc.location && !iframeDoc.location.href.startsWith(DEFAULT_IFRAME_SRC)) {
                // If the iframe loaded something potentially problematic but not yet blocked
                if (containsBlockedSubstring(iframeDoc.location.href)) {
                     console[_0x4f5e('0x10')](_0x4f5e('0x50') + iframeDoc.location.href); // "Blocked iframe internal navigation:"
                     showBlockMessage(_0x4f5e('0x50') + iframeDoc.location.href);
                     iframe.src = DEFAULT_IFRAME_SRC; // Reset
                     return; // Stop further processing for this load
                }
                // Re-apply the same overrides within the iframe context if same-origin
                Object.defineProperty(iframeDoc.location.__proto__, _0x4f5e('0x12'), { // 'assign'
                    value: function(url) { 
                        const targetUrl = String(url);
                        if (containsBlockedSubstring(targetUrl)) {
                            console[_0x4f5e('0x10')](_0x4f5e('0x51') + targetUrl); // "Blocked iframe assign:"
                            showBlockMessage(_0x4f5e('0x51') + targetUrl);
                            // Cannot directly reset iframe.src from here easily without crossing origins
                        } else {
                            // This call might still fail due to parent policies or GoGuardian
                            return originalAssign[_0x4f5e('0x3d')](this, arguments);
                        }
                    }, configurable: true
                });
                 Object.defineProperty(iframeDoc.location.__proto__, _0x4f5e('0x13'), { // 'replace'
                    value: function(url) { 
                        const targetUrl = String(url);
                        if (containsBlockedSubstring(targetUrl)) {
                            console[_0x4f5e('0x10')](_0x4f5e('0x52') + targetUrl); // "Blocked iframe replace:"
                            showBlockMessage(_0x4f5e('0x52') + targetUrl);
                        } else {
                            return originalReplace[_0x4f5e('0x3d')](this, arguments);
                        }
                    }, configurable: true
                });
            }
        } catch (e) {
            // Likely cross-origin, can't modify iframe internals. Rely on parent script.
             // console[_0x4f5e('0x2a')](_0x4f5e('0x53'), e); // "Could not modify iframe internals (cross-origin)."
        }
    };
    iframe.onerror = () => {
        console[_0x4f5e('0x10')](_0x4f5e('0x3f')); // "Iframe failed to load."
        // If error occurs, maybe reset src again to prevent stuck states
        setTimeout(() => { iframe[_0x4f5e('0x34')] = DEFAULT_IFRAME_SRC; }, 100);
    };
}

// --- Aggressive Stealth Techniques ---

// Attempt to disable common browser UI elements that might be manipulated
// This is highly unlikely to work consistently due to browser security
function disableBrowserUI() {
    try {
        // Attempt to hide toolbars etc. (mostly ineffective)
        window.locationbar[_0x4f5e('0x54')] = window.locationbar[_0x4f5e('0x55')] = window.menubar[_0x4f5e('0x54')] = window.menubar[_0x4f5e('0x55')] = window.personalbar[_0x4f5e('0x54')] = window.personalbar[_0x4f5e('0x55')] = window.statusbar[_0x4f5e('0x54')] = window.statusbar[_0x4f5e('0x55')] = window.toolbar[_0x4f5e('0x54')] = window.toolbar[_0x4f5e('0x55')] = false;
        // Attempt to prevent resizing/moving
        window.resizeTo(screen.availWidth, screen.availHeight); // Try to maximize
        window.moveTo(0, 0);
    } catch(e) {
         // console[_0x4f5e('0x2a')](_0x4f5e('0x56'), e); // "Failed to manipulate browser UI elements."
    }
}

// Overwrite alert, confirm, prompt (often used for simple blocks or notifications)
window.alert = function(msg) { console[_0x4f5e('0x10')]("Alert blocked: " + msg); return true; };
window.confirm = function(msg) { console[_0x4f5e('0x10')]("Confirm blocked: " + msg); return true; };
window.prompt = function(msg, def) { console[_0x4f5e('0x10')]("Prompt blocked: " + msg); return def || ""; };

// Attempt to clear history to prevent back navigation to blocked pages (use with caution)
// This might interfere with legitimate browser history use.
// window.history.clear ? window.history.clear() : null; // Doesn't exist natively

// Attempt to disable specific navigation events
window.addEventListener(_0x4f5e('0x57'), function(event) { // 'beforeunload'
    if (isPageBlocked) {
        event.preventDefault();
        event.returnValue = ''; // Required for Chrome
    }
}, true);
window.addEventListener(_0x4f5e('0x58'), function(event) { // 'unload'
     // Less control here, but logging might be possible.
}, true);

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // disableBrowserUI(); // Uncomment if you want to try UI manipulation aggressively

    const iframe = document.getElementById(TARGET_IFRAME_ID);
    if (!iframe) {
        console[_0x4f5e('0x10')](_0x4f5e('0x40')); // "Error: iframe element not found!"
        return;
    }
    
    setupIframeInterception(); // Setup all iframe related listeners and observers

    // Initial check for blocked referrer
    if (document.referrer && containsBlockedSubstring(document.referrer)) {
        console[_0x4f5e('0x10')](_0x4f5e('0x41') + document.referrer); // "Initial page load via blocked referrer:"
        showBlockMessage(_0x4f5e('0x41') + document.referrer);
        // Make iframe non-interactive immediately
        iframe[_0x4f5e('0x1f')][_0x4f5e('0x55')] = 'none'; // pointerEvents = 'none'
    } else {
        // If not blocked initially, ensure the block message is hidden
        hideBlockMessage();
    }
});


// --- Final Aggressive Stealth & Redirection Prevention ---

// Override the navigator object's userAgent (very unlikely to work, mostly for show)
try {
    Object.defineProperty(navigator, _0x4f5e('0x59'), { // 'userAgent'
        get: function() { 
            // Return a generic or modified user agent string if needed
            return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        },
        configurable: true
    });
} catch(e) {
     // console[_0x4f5e('0x2a')](_0x4f5e('0x5a'), e); // "Failed to override userAgent."
}

// Prevent the page from being navigated away by external scripts if possible.
// This attempts to block attempts to navigate the top-level window.
function blockExternalNavigation() {
    // Override top.location assignment
    try {
        Object.defineProperty(window.top, _0x4f5e('0x15'), { // 'location'
            get: function() { return window[_0x4f5e('0x15')]; }, // Point to current window's location
            set: function(url) { 
                const targetUrl = String(url);
                if (containsBlockedSubstring(targetUrl)) {
                    console[_0x4f5e('0x10')](_0x4f5e('0x5b') + targetUrl); // "Blocked top.location assignment:"
                    showBlockMessage(_0x4f5e('0x5b') + targetUrl);
                    // Don't actually navigate
                } else {
                    // Allow navigation if not blocked, but use the internal location setter
                    window.location.assign(targetUrl); 
                }
            },
            configurable: true
        });
    } catch(e) {
        // console[_0x4f5e('0x2a')](_0x4f5e('0x5c'), e); // "Failed to override top.location."
    }
}
blockExternalNavigation(); // Execute immediately

// Final check to ensure iframe is reset if it somehow loads something before DOMContentLoaded
if (document.readyState === 'loading') {
    const iframe = document.getElementById(TARGET_IFRAME_ID);
    if (iframe) {
        iframe.src = DEFAULT_IFRAME_SRC;
    }
}

// Add a fallback in case some navigation happens before the script fully initializes
// This uses a very short timeout to catch any potential race conditions.
setTimeout(() => {
    if (isPageBlocked) return; // If already blocked, do nothing more

    const iframe = document.getElementById(TARGET_IFRAME_ID);
    if (iframe && iframe.contentWindow && iframe.contentWindow.location) {
        const currentIframeUrl = iframe.contentWindow.location.href;
        if (containsBlockedSubstring(currentIframeUrl)) {
            console[_0x4f5e('0x10')](_0x4f5e('0x5d') + currentIframeUrl); // "Fallback: Blocked iframe URL detected:"
            showBlockMessage(_0x4f5e('0x5d') + currentIframeUrl);
            iframe.src = DEFAULT_IFRAME_SRC;
        }
    }
}, 100); // 100ms delay
