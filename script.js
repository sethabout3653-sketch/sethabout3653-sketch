(function() {
    'use strict';

    // 1. Massive list of ad, popup, and tracker selectors
    const adSelectors = [
        // Ad networks (Google, Amazon, etc.)
        'ins.adsbygoogle', 'iframe[src*="doubleclick"]', 'iframe[src*="amazon-adsystem"]',
        'iframe[id^="google_ads"]', '[id^="div-gpt-ad"]', 'script[src*="ads"]',
        
        // Generic ad containers
        '[class*="ad-container"]', '[class*="ad-banner"]', '[id*="ad-wrapper"]',
        '.ad', '.ads', '.ad-box', '.advertisement', '.sponsor', '.sponsored-content',
        
        // Popups, overlays, and modals
        '[class*="popup"]', '[class*="modal"]', '[id*="popup"]', '[id*="overlay"]',
        '.interstitial', '.floating-ad'
    ];

    const adSelectorString = adSelectors.join(', ');

    // 2. The execution function that destroys the elements
    function nukeAds() {
        const elements = document.querySelectorAll(adSelectorString);
        elements.forEach(el => {
            // Protect your actual app elements
            if (el.id !== 'adKiller' && el.id !== 'mainFrame') {
                el.style.setProperty('display', 'none', 'important'); // Hide instantly
                el.remove(); // Delete from DOM
            }
        });
    }

    // 3. MutationObserver: Watches the page and strikes instantly when new code is injected
    const observer = new MutationObserver((mutations) => {
        let shouldNuke = false;
        for (let mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                shouldNuke = true;
                break;
            }
        }
        if (shouldNuke) {
            nukeAds();
        }
    });

    // Start watching the whole HTML document
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // 4. Kill all Popup Windows and Alerts (Parent window)
    window.open = function() { console.log('🛑 Blocked window.open() popup.'); return null; };
    window.alert = function() { console.log('🛑 Blocked alert() message.'); };
    window.confirm = function() { console.log('🛑 Blocked confirm() dialog.'); return true; };
    window.prompt = function() { console.log('🛑 Blocked prompt() input.'); return null; };

    // 5. Chromebook Performance Optimization
    requestAnimationFrame(function optimize() {
        document.body.style.willChange = 'transform';
        requestAnimationFrame(optimize);
    });

    // Initial sweep
    document.addEventListener('DOMContentLoaded', nukeAds);
    nukeAds();

})();
