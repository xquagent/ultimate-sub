# Ultimate Sub

Bookmark-loaded Bondage Club mod.

## What it does now

- Adds an `Ultimate Sub` entry under `Profile > Preferences > Extensions`.
- Opens an owner-led settings menu.
- Stores simple local settings in the browser.
- Adds owner controls for Training, wardrobe, UltraBC escape tools, RP arousal, tasks, logs, and the Slim Lock Collar.
- Adds a custom Slim Lock Collar item with an owner-only collar menu and shock discipline modes.

## ULTRAbc owner gate

This can only work on the character/client that loads Ultimate Sub. It cannot force another player's browser to do anything unless that player has installed Ultimate Sub and enabled owner control.

Ultimate Sub now uses only a minimal ModSDK chat-message hook for compatibility with BCX and other mods. If BCX shows a compatibility warning after an older Ultimate Sub test, fully reload the Bondage Club page, then load Ultimate Sub again from the updated bookmark.

Only the wearer's full assigned BC owner can use owner commands and owner-only collar controls.

## Files

- `ultimate-sub.js` is the actual mod.
- `ultimate-sub.bookmark.js` is the bookmark loader.

## Bookmark setup

Use the public install page:

```text
https://xquagent.github.io/ultimate-sub/install.html
```

Or create a bookmark manually with this URL:

```text
javascript:(function(){let s=document.createElement("script");s.src="https://xquagent.github.io/ultimate-sub/ultimate-sub.js?v="+Date.now();s.onload=()=>s.remove();s.onerror=()=>alert("Ultimate Sub could not load from GitHub Pages.");document.head.appendChild(s);})();
```

Drag the `Ultimate Sub` link from the install page to your bookmarks bar, or copy the bookmarklet code into a bookmark URL.

When playing:

```text
1. Open Bondage Club and log in.
2. Click the Ultimate Sub bookmark.
3. Go to Profile > Preferences > Extensions > Ultimate Sub.
```

The bookmark loads the latest published file from GitHub Pages.
