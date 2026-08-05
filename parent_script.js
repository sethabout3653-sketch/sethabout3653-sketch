// parent_script.js

// --- String Obfuscation ---
const _0x1a2b = ['location', 'href', 'referrer', 'window', 'parent', 'postMessage', 'addEventListener', 'message', 'origin', 'indexOf', 'length', 'slice', 'hostname', 'assign', 'replace', 'error', 'document', 'getElementById', 'textContent', 'style', 'display', 'flex', 'justifyContent', 'alignItems', 'visibility', 'visible', 'opacity', 'getComputedStyle', 'console', 'warn', 'log', 'error', 'substring', 'protocol', 'isArray', 'name', 'src', 'createElement', 'remove', 'timeout', 'setTimeout', 'iframe-container', 'message-area', 'push', 'shift', 'call'];
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
const BLOCKED_DOMAINS = ['goguardian.com', 'goguardian.org']; // Domains to block redirection from
const TARGET_IFRAME_ID = _0x4f5e('0x29'); // 'iframe-container'
const MESSAGE_AREA_ID = _0x4f5e('0x2a'); // 'message-area'
let iframeLoaded = false; // Flag to ensure we only act after iframe is ready

// --- Helper Functions ---

// Function to check if a URL is on a blocked domain
function isBlockedUrl(url) {
    if (!url) return false;
    try {
        const hostname = new URL(url)[_0x4f5e('0x11')]; // hostname
        for (const domain of BLOCKED_DOMAINS) {
            if (hostname === domain || hostname[_0x4f5e('0xd')](domain) !== -0x1) {
                // Check for specific blocking patterns as well
                if (url[_0x4f5e('0xd')](_0x4f5e('0x3')) !== -0x1 || url[_0x4f5e('0xd')](_0x4f5e('0x4')) !== -0x1) {
                    return true;
                }
            }
        }
    } catch (_0x1f2e3d) {
        console[_0x4f5e('0x24')](_0x4f5e('0x26'), _0x1f2e3d); // 'Error parsing URL'
    }
    return false;
}

// Function to display the blocking message
function showBlockMessage(msg) {
    const messageArea = document[_0x4f5e('0x1c')](MESSAGE_AREA_ID); // 'message-area'
    if (messageArea) {
        messageArea[_0x4f5e('0x1f')][_0x4f5e('0x20')] = _0x4f5e('0x21'); // style.display = 'flex'
        messageArea[_0x4f5e('0x1f')][_0x4f5e('0x22')] = _0x4f5e('0x23'); // style.justifyContent = 'center'
        messageArea[_0x4f5e('0x1f')][_0x4f5e('0x24')] = _0x4f5e('0x25'); // style.alignItems = 'center'
        messageArea[_0x4f5e('0x1f')][_0x4f5e('0x26')] = _0x4f5e('0x27'); // style.visibility = 'visible'
        messageArea[_0x4f5e('0x1f')][_0x4f5e('0x28')] = '1'; // style.opacity = '1'
        
        if (msg) {
            messageArea[_0x4f5e('0x1e')][_0x4f5e('0x27')] = msg; // textContent = msg
        }
        
        // Optionally, hide the iframe content or remove it
        const iframe = document[_0x4f5e('0x1c')](TARGET_IFRAME_ID);
        if (iframe) {
            iframe[_0x4f5e('0x1f')][_0x4f5e('0x14')] = '0'; // style.display = 'none'
        }
    }
}

// Function to hide the blocking message
function hideBlockMessage() {
    const messageArea = document[_0x4f5e('0x1c')](MESSAGE_AREA_ID);
    if (messageArea) {
        messageArea[_0x4f5e('0x1f')][_0x4f5e('0x28')] = '0'; // style.opacity = '0'
        // Optionally use a timeout to completely remove it after fading
        setTimeout(() => {
            if (getComputedStyle(messageArea)[_0x4f5e('0x28')] === '0') { // if opacity is still 0
                 messageArea[_0x4f5e('0x1f')][_0x4f5e('0x26')] = 'hidden'; // style.visibility = 'hidden'
                 messageArea[_0x4f5e('0x1f')][_0x4f5e('0x20')] = 'none'; // style.display = 'none'
            }
        }, 500); // Match transition duration
    }
     // Ensure iframe is visible if blocking message is hidden
    const iframe = document[_0x4f5e('0x1c')](TARGET_IFRAME_ID);
    if (iframe) {
        iframe[_0x4f5e('0x1f')][_0x4f5e('0x14')] = ''; // Reset display to default (or 'block')
    }
}


// --- Event Listeners ---

// Listen for messages from the iframe
window[_0x4f5e('0x16')](_0x4f5e('0x17'), function(_0x3f4e5d) { // 'message'
    // Check if the message came from our iframe's origin (if applicable and known)
    // IMPORTANT: Replace 'ALLOWED_IFRAME_ORIGIN' with the actual origin if known and restricted.
    // If the iframe source is dynamic or unknown, this check might be omitted, but it reduces security.
    // const ALLOWED_IFRAME_ORIGIN = "http://localhost:8000"; // Example
    // if (_0x3f4e5d[_0x4f5e('0x18')] !== ALLOWED_IFRAME_ORIGIN) {
    //     console[_0x4f5e('0x2a')](_0x4f5e('0x2b')); // "Message from untrusted origin, ignoring."
    //     return;
    // }

    const messageData = _0x3f4e5d.data;
    console[_0x4f5e('0x2b')](_0x4f5e('0x2c'), messageData); // "Received message:"

    if (messageData && typeof messageData === 'string') {
        // Check if the message indicates a redirection attempt
        if (messageData[_0x4f5e('0xd')](_0x4f5e('0x3')) !== -0x1 || messageData[_0x4f5e('0xd')](_0x4f5e('0x4')) !== -0x1) {
            console[_0x4f5e('0x1c')](_0x4f5e('0x10')); // 'REDirection detected in iframe message!'
            showBlockMessage(_0x4f5e('0x10') + " " + messageData); // Show block message
            // Optionally, try to prevent the iframe from navigating itself further
            try {
                const iframe = document[_0x4f5e('0x1c')](TARGET_IFRAME_ID);
                if (iframe && iframe.contentWindow) {
                    // Attempt to stop navigation within the iframe
                    // This is difficult and often impossible due to Same-Origin Policy
                    // console.warn("Attempted to stop iframe navigation.");
                    // iframe.src = "about:blank"; // May not work or be allowed
                }
            } catch (_0x4f5e6f) {
                console[_0x4f5e('0x1c')](_0x4f5e('0x1a'), _0x4f5e6f); // 'Error trying to control iframe'
            }
        }
    }
});

// Intercept navigation attempts on the *parent* window
// This prevents the entire page from being redirected away
const originalAssign = Object.getOwnPropertyDescriptor(window.location.__proto__, _0x4f5e('0x12'))?.value; // 'assign'
const originalReplace = Object.getOwnPropertyDescriptor(window.location.__proto__, _0x4f5e('0x13'))?.value; // 'replace'

if (originalAssign) {
    Object.defineProperty(window.location.__proto__, _0x4f5e('0x12'), { // 'assign'
        value: function(url, replaceType) {
            console[_0x4f5e('0x2b')](_0x4f5e('0x30') + url); // "Parent assign called:"
            if (isBlockedUrl(url)) {
                console[_0x4f5e('0x10')](_0x4f5e('0x31') + url); // "Blocked parent redirection:"
                showBlockMessage(_0x4f5e('0x31') + url);
                return false; // Prevent navigation
            }
            return originalAssign.apply(this, arguments); // Use original function
        },
        configurable: true // Allow redefinition if needed
    });
}

if (originalReplace) {
    Object.defineProperty(window.location.__proto__, _0x4f5e('0x13'), { // 'replace'
        value: function(url, replaceType) {
             console[_0x4f5e('0x2b')](_0x4f5e('0x32') + url); // "Parent replace called:"
            if (isBlockedUrl(url)) {
                console[_0x4f5e('0x10')](_0x4f5e('0x33') + url); // "Blocked parent redirection:"
                showBlockMessage(_0x4f5e('0x33') + url);
                return false; // Prevent navigation
            }
            return originalReplace.apply(this, arguments); // Use original function
        },
        configurable: true
    });
}

// Handle cases where the iframe's src might be set later or changed
function monitorIframeSrc() {
    const iframe = document[_0x4f5e('0x1c')](TARGET_IFRAME_ID);
    if (!iframe) return;

    let lastSrc = iframe[_0x4f5e('0x34')]; // src
    
    // Use a MutationObserver to watch for changes in the iframe's src attribute
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                const newSrc = iframe[_0x4f5e('0x34')];
                console[_0x4f5e('0x2b')](_0x4f5e('0x35') + newSrc); // "Iframe src changed to:"
                
                if (isBlockedUrl(newSrc)) {
                    console[_0x4f5e('0x10')](_0x4f5e('0x36') + newSrc); // "Blocked iframe load:"
                    showBlockMessage(_0x4f5e('0x36') + newSrc);
                    // Prevent loading by setting src to blank or a safe page
                    // Note: This might be overridden quickly by the blocking script.
                     setTimeout(() => {
                        iframe[_0x4f5e('0x34')] = 'about:blank'; // Try to reset it
                        // iframe.removeAttribute('src'); // Alternative
                     }, 50); // Short delay
                } else {
                    hideBlockMessage(); // Ensure message is hidden if loading a safe URL
                }
                lastSrc = newSrc;
            }
        });
    });

    observer.observe(iframe, { attributes: true, attributeFilter: ['src'] });

    // Also handle initial load
    iframe.onload = () => {
        iframeLoaded = true;
        console[_0x4f5e('0x2b')](_0x4f5e('0x37')); // "Iframe loaded."
        hideBlockMessage(); // Make sure message is hidden on successful load
        
        // Check referrer of the iframe content if possible (Same-Origin Policy applies)
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const iframeReferrer = iframeDoc.referrer;
            if (isBlockedUrl(iframeReferrer)) {
                 console[_0x4f5e('0x10')](_0x4f5e('0x38') + iframeReferrer); // "Blocked iframe referrer:"
                 showBlockMessage(_0x4f5e('0x38') + iframeReferrer);
            }
        } catch (e) {
            // Likely cross-origin, ignore referrer check for iframe content
             console[_0x4f5e('0x2a')](_0x4f5e('0x39'), e); // "Could not access iframe referrer (cross-origin):"
        }
    };
     iframe.onerror = () => {
        console[_0x4f5e('0x10')](_0x4f5e('0x3a')); // "Iframe failed to load."
        // Optionally show an error message or try to reload
    };
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById(TARGET_IFRAME_ID);
    if (!iframe) {
        console[_0x4f5e('0x10')](_0x4f5e('0x3b')); // "Error: iframe element not found!"
        return;
    }
    
    // Set an initial URL to load. Replace 'about:blank' or add your target URL here.
    // Example: iframe.src = "https://example.com"; 
    // If the target site itself redirects, the 'isBlockedUrl' check in the message listener will handle it.
    iframe.src = "about:blank"; // Start blank, or set your initial URL.
    
    monitorIframeSrc(); // Start monitoring the iframe source attribute changes

    // Initial check: If the page itself was loaded via a redirect, block it.
    // This check is redundant if the script running on the *previous* page already blocked it.
    // However, it adds a layer of defense if this page is accessed directly.
    if (isBlockedUrl(document.referrer)) {
        console[_0x4f5e('0x10')](_0x4f5e('0x3c') + document.referrer); // "Initial page load via blocked referrer:"
        showBlockMessage(_0x4f5e('0x3c') + document.referrer);
    }
});

// --- Additional Stealth/Obfuscation ---
// Prevent access to parent/top window properties that might reveal context
try {
    Object.defineProperty(window, _0x4f5e('0x15'), { // 'parent'
        get: function() { return window; }, // Return self if accessed directly
        configurable: false 
    });
     Object.defineProperty(window, 'top', { // 'top'
        get: function() { return window; },
        configurable: false
    });
} catch(e) {
    console[_0x4f5e('0x2a')](_0x4f5e('0x3d'), e); // "Could not redefine parent/top (likely disallowed)"
}

// Dummy function to consume resources / add noise
function _noise_function_for_analysis() {
    let data = [];
    for (let i = 0; i < 500; i++) {
        data.push(Math.random().toString(36).substring(7));
    }
    data.sort();
    return data.length;
}

// Attempt to disable console logging of sensitive info
if (window.console) {
    const _originalLog = console.log;
    const _originalWarn = console.warn;
    const _originalError = console.error;

    console.log = function(...args) {
        if (args.some(arg => typeof arg === 'string' && (arg.includes('goguardian') || arg.includes('redirect')))) {
             // Filter potentially sensitive logs
        } else {
            _originalLog.apply(console, args);
        }
    };
     // Similar filtering for warn/error if needed
}
