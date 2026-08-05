// parent_script.js

// --- String Obfuscation ---
// This section is included for consistency but the primary blocking logic is clear.
// The variable names like _0x1a2b, _0x4f5e, etc., are placeholders for potentially obfuscated strings.
// For clarity in this explanation, I'll use direct string literals where it aids understanding,
// but the structure can be maintained if deep obfuscation is a strict requirement.

const _0x1a2b = ['location', 'href', 'referrer', 'window', 'parent', 'postMessage', 'addEventListener', 'message', 'origin', 'indexOf', 'length', 'slice', 'hostname', 'assign', 'replace', 'error', 'document', 'getElementById', 'textContent', 'style', 'display', 'flex', 'justifyContent', 'alignItems', 'visibility', 'visible', 'opacity', 'getComputedStyle', 'console', 'warn', 'log', 'error', 'substring', 'protocol', 'isArray', 'name', 'src', 'createElement', 'remove', 'timeout', 'setTimeout', 'iframe-container', 'message-area', 'push', 'shift', 'call', 'goguardian', 'about:blank', 'apply', 'defineProperty', 'get', 'configurable', 'false', 'then', 'catch', 'isArray', 'stringify', 'parse'];
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
// Specifically block any URL containing "goguardian"
const BLOCKED_URL_SUBSTRING = _0x4f5e('0x30'); // "goguardian"
const TARGET_IFRAME_ID = _0x4f5e('0x29'); // 'iframe-container'
const MESSAGE_AREA_ID = _0x4f5e('0x2a'); // 'message-area'
const DEFAULT_IFRAME_SRC = _0x4f5e('0x31'); // 'about:blank'

// --- Helper Functions ---

// Function to check if a URL contains the blocked substring
function containsBlockedSubstring(url) {
    if (!url || typeof url !== 'string') return false;
    // Perform a case-insensitive check
    return url.toLowerCase()[_0x4f5e('0xd')](BLOCKED_URL_SUBSTRING) !== -0x1;
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
            // Set the message content, ensuring it's plain text
            messageArea[_0x4f5e('0x1e')][_0x4f5e('0x27')] = String(msg); // textContent = msg
        } else {
            messageArea[_0x4f5e('0x1e')][_0x4f5e('0x27')] = _0x4f5e('0x10') + ' ' + BLOCKED_URL_SUBSTRING; // 'Redirection Detected goguardian'
        }
        
        // Hide the iframe content when blocking
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
        // Use a timeout to completely remove it after fading
        setTimeout(() => {
            // Check if opacity is still 0 before hiding completely
            if (getComputedStyle(messageArea)[_0x4f5e('0x28')] === '0') {
                 messageArea[_0x4f5e('0x1f')][_0x4f5e('0x26')] = 'hidden'; // style.visibility = 'hidden'
                 messageArea[_0x4f5e('0x1f')][_0x4f5e('0x20')] = 'none'; // style.display = 'none'
            }
        }, 500); // Match transition duration
    }
     // Ensure iframe is visible if blocking message is hidden
    const iframe = document[_0x4f5e('0x1c')](TARGET_IFRAME_ID);
    if (iframe) {
        iframe[_0x4f5e('0x1f')][_0x4f5e('0x14')] = ''; // Reset display to default
    }
}


// --- Event Listeners and Interception ---

// Intercept navigation attempts on the *parent* window
// This prevents the entire page from being redirected away.
const originalAssign = Object.getOwnPropertyDescriptor(window.location.__proto__, _0x4f5e('0x12'))?.value; // 'assign'
const originalReplace = Object.getOwnPropertyDescriptor(window.location.__proto__, _0x4f5e('0x13'))?.value; // 'replace'

if (originalAssign) {
    Object.defineProperty(window.location.__proto__, _0x4f5e('0x12'), { // 'assign'
        value: function(url, replaceType) {
            const targetUrl = String(url); // Ensure it's a string
            // console[_0x4f5e('0x2b')](_0x4f5e('0x32') + targetUrl); // "Parent assign called:"
            if (containsBlockedSubstring(targetUrl)) {
                console[_0x4f5e('0x10')](_0x4f5e('0x33') + targetUrl); // "Blocked parent redirection:"
                showBlockMessage(_0x4f5e('0x33') + targetUrl);
                return false; // Prevent navigation
            }
            // Use original function, passing arguments correctly
            return originalAssign[_0x4f5e('0x3d')](this, arguments); 
        },
        configurable: true 
    });
}

if (originalReplace) {
    Object.defineProperty(window.location.__proto__, _0x4f5e('0x13'), { // 'replace'
        value: function(url, replaceType) {
             const targetUrl = String(url);
             // console[_0x4f5e('0x2b')](_0x4f5e('0x34') + targetUrl); // "Parent replace called:"
            if (containsBlockedSubstring(targetUrl)) {
                console[_0x4f5e('0x10')](_0x4f5e('0x35') + targetUrl); // "Blocked parent redirection:"
                showBlockMessage(_0x4f5e('0x35') + targetUrl);
                return false; // Prevent navigation
            }
            // Use original function
            return originalReplace[_0x4f5e('0x3d')](this, arguments); 
        },
        configurable: true
    });
}

// Listen for messages from the iframe (if any)
// IMPORTANT: This relies on the iframe using window.postMessage to communicate redirects.
window[_0x4f5e('0x16')](_0x4f5e('0x17'), function(event) { // 'message'
    // In a real scenario, you'd validate event.origin for security.
    // For this specific request, we'll assume messages might contain redirect info.
    
    const messageData = event.data;
    // console[_0x4f5e('0x2b')](_0x4f5e('0x36') + JSON[_0x4f5e('0x3e')](messageData)); // "Received message:"

    if (messageData && typeof messageData === 'string') {
        // Check if the message indicates a redirection attempt
        if (containsBlockedSubstring(messageData)) {
            console[_0x4f5e('0x10')](_0x4f5e('0x10') + ' ' + BLOCKED_URL_SUBSTRING + ' ' + _0x4f5e('0x37')); // 'REDirection detected goguardian!'
            showBlockMessage(_0x4f5e('0x10') + ' ' + BLOCKED_URL_SUBSTRING + ' ' + messageData); // Show block message
            
            // Attempt to prevent the iframe from navigating itself further
            // This is often difficult due to Same-Origin Policy but worth trying.
            try {
                const iframe = document[_0x4f5e('0x1c')](TARGET_IFRAME_ID);
                if (iframe && iframe.contentWindow) {
                    // Setting src to about:blank is a common way to stop navigation.
                    iframe.src = DEFAULT_IFRAME_SRC; 
                    console[_0x4f5e('0x2b')](_0x4f5e('0x38')); // "Attempted to reset iframe src."
                }
            } catch (_0x1f2e3d) {
                console[_0x4f5e('0x1a')](_0x4f5e('0x39'), _0x1f2e3d); // 'Error trying to control iframe'
            }
        }
    }
});

// Monitor the iframe's src attribute for changes
function monitorIframeSrc() {
    const iframe = document[_0x4f5e('0x1c')](TARGET_IFRAME_ID);
    if (!iframe) return;

    // Use a MutationObserver to watch for changes in the iframe's src attribute
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                const newSrc = iframe[_0x4f5e('0x34')]; // src
                // console[_0x4f5e('0x2b')](_0x4f5e('0x3a') + newSrc); // "Iframe src changed to:"
                
                if (containsBlockedSubstring(newSrc)) {
                    console[_0x4f5e('0x10')](_0x4f5e('0x3b') + newSrc); // "Blocked iframe load:"
                    showBlockMessage(_0x4f5e('0x3b') + newSrc);
                    
                    // Prevent loading by setting src to blank or a safe page immediately
                    // Use a small timeout to ensure the change takes effect.
                     setTimeout(() => {
                        iframe[_0x4f5e('0x34')] = DEFAULT_IFRAME_SRC; 
                     }, 50); 
                } else {
                    // If a non-blocked URL is loaded, ensure the message is hidden.
                    hideBlockMessage(); 
                }
            }
        });
    });

    // Start observing the iframe for attribute changes (specifically 'src')
    observer.observe(iframe, { attributes: true, attributeFilter: ['src'] });

    // Handle iframe load events
    iframe.onload = () => {
        // console[_0x4f5e('0x2b')](_0x4f5e('0x3c')); // "Iframe loaded."
        hideBlockMessage(); // Ensure message is hidden on successful load

        // Attempt to check iframe content's referrer (limited by Same-Origin Policy)
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc && iframeDoc.referrer) {
                const iframeReferrer = iframeDoc.referrer;
                if (containsBlockedSubstring(iframeReferrer)) {
                     console[_0x4f5e('0x10')](_0x4f5e('0x3d') + iframeReferrer); // "Blocked iframe referrer:"
                     showBlockMessage(_0x4f5e('0x3d') + iframeReferrer);
                     iframe.src = DEFAULT_IFRAME_SRC; // Prevent further loading if referrer is bad
                }
            }
        } catch (e) {
            // Ignore errors due to Same-Origin Policy when accessing iframe content
            // console[_0x4f5e('0x2a')](_0x4f5e('0x3e'), e); // "Could not access iframe referrer (cross-origin):"
        }
    };
     iframe.onerror = () => {
        console[_0x4f5e('0x10')](_0x4f5e('0x3f')); // "Iframe failed to load."
        // Optionally show an error message or try to reload
    };
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById(TARGET_IFRAME_ID);
    if (!iframe) {
        console[_0x4f5e('0x10')](_0x4f5e('0x40')); // "Error: iframe element not found!"
        return;
    }
    
    // Set initial iframe source. Replace with your target URL if not using about:blank.
    // If the target site itself redirects to a blocked URL, other mechanisms will try to catch it.
    iframe.src = DEFAULT_IFRAME_SRC; 
    
    monitorIframeSrc(); // Start monitoring the iframe source attribute and load events

    // Initial check: Block if the page itself was loaded via a blocked referrer.
    if (document.referrer && containsBlockedSubstring(document.referrer)) {
        console[_0x4f5e('0x10')](_0x4f5e('0x41') + document.referrer); // "Initial page load via blocked referrer:"
        showBlockMessage(_0x4f5e('0x41') + document.referrer);
        // Optionally disable iframe interaction completely here
        const iframeEl = document.getElementById(TARGET_IFRAME_ID);
        if(iframeEl) iframeEl.style.pointerEvents = 'none'; 
    }
});

// --- Additional Stealth/Context Protection ---
// Prevent access to parent/top window properties that might reveal context or allow manipulation.
// This is a best-effort attempt and may be blocked by browser security.
try {
    // Redefine window.parent and window.top to point to the current window
    Object.defineProperty(window, _0x4f5e('0x15'), { // 'parent'
        get: function() { return window; }, 
        configurable: false // Make it hard to redefine again
    });
     Object.defineProperty(window, 'top', { // 'top'
        get: function() { return window; },
        configurable: false
    });
     // Prevent `window.opener` if this page was opened by another window
     if (window.opener) {
         Object.defineProperty(window, 'opener', {
            get: function() { return null; },
            configurable: false
        });
     }
} catch(e) {
    // console[_0x4f5e('0x2a')](_0x4f5e('0x42'), e); // "Could not redefine parent/top/opener (likely disallowed)"
}

// Dummy function to potentially consume resources or add complexity for analysis tools.
function _noise_function_for_analysis() {
    let data = [];
    for (let i = 0; i < 500; i++) {
        data.push(Math.random().toString(36).substring(7));
    }
    data.sort();
    return data.length;
}
