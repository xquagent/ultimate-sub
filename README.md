# Ultimate Sub

This is the first starter scaffold for a bookmark-loaded Bondage Club mod.

## What it does now

- Adds an `Ultimate Sub` entry under `Profile > Preferences > Extensions`.
- Opens a basic settings menu.
- Stores simple local settings in the browser.
- Includes one self-only character action: kneel / stand.
- Adds an opt-in owner gate for ULTRAbc escape tools.

## ULTRAbc owner gate

This can only work on the character/client that loads Ultimate Sub. It cannot force another player's browser to do anything unless that player has installed Ultimate Sub and enabled owner control.

Ultimate Sub now uses only a minimal ModSDK chat-message hook for compatibility with BCX and other mods. If BCX shows a compatibility warning after an older Ultimate Sub test, fully reload the Bondage Club page, then load Ultimate Sub again from the updated bookmark.

In `Ultimate Sub`, the wearer must enable:

```text
Owner can manage UltraBC
```

After that, only the wearer's full assigned BC owner can use these chat commands:

```text
!us ubc lock
!us ubc unlock
!us ubc status
```

`!us ubc lock` sets ULTRAbc no-escape settings for the wearer. This safer build does not directly intercept BC or ULTRAbc buttons.

`Local consent reset` disables owner control and allows the ULTRAbc escape tools again.

## Files

- `ultimate-sub.js` is the actual mod.
- `ultimate-sub.bookmark.js` is the bookmark loader.

## Bookmark setup

The local bookmark is already pointed at:

```text
http://127.0.0.1:8787/ultimate-sub.js
```

A local server must be running for the bookmark to work. It is running now in this Codex session.

Open the install page:

```text
C:\Users\12109\Documents\Codex\2026-08-04\i-a\outputs\ultimate-sub\install.html
```

Then drag the `Ultimate Sub` link to your bookmarks bar, or copy the bookmarklet code into a bookmark URL.

When playing:

```text
1. Open Bondage Club and log in.
2. Click the Ultimate Sub bookmark.
3. Go to Profile > Preferences > Extensions > Ultimate Sub.
```

For permanent public hosting, replace this local URL:

```text
http://127.0.0.1:8787/ultimate-sub.js
```

with a public URL such as a GitHub Pages URL.
