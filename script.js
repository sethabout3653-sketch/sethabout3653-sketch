(function() {
    'use strict';

    // 1. Standard CSS Selectors (Massive List)
    const adSelectors = [
        'ins.adsbygoogle', 'iframe[src*="doubleclick"]', 'iframe[src*="amazon-adsystem"]',
        'iframe[id^="google_ads"]', '[id^="div-gpt-ad"]', 'script[src*="ads"]',
        'img[src*="ad"]', 'img[src*="banner"]', 'img[src*="sponsor"]', 
        'img[src*="tracker"]', 'img[src*="pixel"]', 'img[src*="affiliate"]',
        '[class*="ad-container"]', '[class*="ad-banner"]', '[id*="ad-wrapper"]',
        '.ad', '.ads', '.ad-box', '.advertisement', '.sponsor', '.sponsored-content',
        '[class*="popup"]', '[class*="modal"]', '[id*="popup"]', '[id*="overlay"]',
        '.interstitial', '.floating-ad', 'video[autoplay]', 'iframe[allow*="autoplay"]'
    ];

    const adSelectorString = adSelectors.join(', ');

    // 2. Toxic Keywords extracted DIRECTLY from your screenshot
    const toxicKeywords = [
        "Opera Browser Recommended",
        "Install Opera One",
        "FREE VPN",
        "Find Reliable Tools for Work",
        "continue watching"
    ];

    // 3. The Execution Function
    function nukeAds() {
        // Sweep A: Standard CSS Selectors
        document.querySelectorAll(adSelectorString).forEach(el => {
            if (el.id !== 'adKiller' && el.id !== 'mainFrame') {
                el.style.setProperty('display', 'none', 'important');
                el.remove();
            }
        });

        // Sweep B: Rogue Media attached directly to the body
        document.querySelectorAll('body > img, body > video, body > iframe').forEach(media => {
            if (media.id !== 'mainFrame') {
                media.remove();
            }
        });

        // Sweep C: Aggressive Text Scanning (Targets the Opera Ads)
        // Looks for the exact text and destroys the entire floating box surrounding it
        toxicKeywords.forEach(keyword => {
            const xpath = `//*[contains(text(), '${keyword}')]`;
            const matchingElements = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

            for (let i = 0; i < matchingElements.snapshotLength; i++) {
                let el = matchingElements.snapshotItem(i);
                let containerToNuke = el;
                
                // Walk up the DOM tree to find the main ad wrapper (up to 6 levels deep)
                for(let j = 0; j < 6; j++) {
                    if(containerToNuke.parentElement && 
                       containerToNuke.parentElement !== document.body && 
                       containerToNuke.parentElement.id !== 'mainFrame' &&
                       containerToNuke.parentElement.tagName !== 'HTML') {
                        containerToNuke = containerToNuke.parentElement;
                    }
                }
                
                if (containerToNuke.id !== 'mainFrame' && containerToNuke.id !== 'adKiller') {
                    containerToNuke.style.setProperty('display', 'none', 'important');
                    containerToNuke.remove();
                }
            }
        });

        // Sweep D: Kill excessive Z-Index Overlays (Catches unlabelled floating video players)
        document.querySelectorAll('div, iframe, video').forEach(el => {
            const style = window.getComputedStyle(el);
            // If it's fixed/absolute and trying to float over everything, kill it
            if ((style.position === 'fixed' || style.position === 'absolute') && parseInt(style.zIndex) > 50) {
                 if (el.id !== 'adKiller' && el.id !== 'mainFrame') {
                     el.style.setProperty('display', 'none', 'important');
                     el.remove();
                 }
            }
        });
    }

    // 4. MutationObserver: Strike instantly when page changes
    const observer = new MutationObserver((mutations) => {
        // Use requestAnimationFrame to prevent the browser from freezing during a massive ad attack
        requestAnimationFrame(nukeAds);
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        characterData: true // Watches for injected text
    });

    // 5. Brutal Interval Fallback (Forces a sweep every 500ms for ads that delay their injection)
    setInterval(nukeAds, 500);

    // 6. Kill all Popup Windows and Alerts
    window.open = function() { console.log('🛑 Blocked window.open() popup.'); return null; };
    window.alert = function() { console.log('🛑 Blocked alert() message.'); };
    window.confirm = function() { console.log('🛑 Blocked confirm() dialog.'); return true; };
    window.prompt = function() { console.log('🛑 Blocked prompt() input.'); return null; };

    // 7. Chromebook Performance Optimization
    requestAnimationFrame(function optimize() {
        document.body.style.willChange = 'transform';
        requestAnimationFrame(optimize);
    });

    // Initialize
    document.addEventListener('DOMContentLoaded', nukeAds);
    nukeAds();

})();
