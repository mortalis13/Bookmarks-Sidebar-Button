## Bookmarks Sidebar Button [Firefox Addon]

Adds a Bookmarks sidebar button to the Toolbar Palette and as the first button in the Main Toolbar.
Primarily created for Firefox versions from 29 where there is no separate bookmarks sidebar button.

It becomes useful for me when it requires a relatively longer time to press the Ctrl+B instead of pressing the button with my mouse. E.g. when my left hand is busy or is resting or I just want to use only the mouse instead of typing every time something with the keyboard...

For me I position it as the first toolbar button so that it be closer to the sidebar. But on further updates it may jump to the last position (cause by default the button should have this place (according to this site rules)). So, if that happens, just move it to the place where you had it before.

---

To **install** the addon go to [releases](https://github.com/mortalis13/Bookmarks-Sidebar-Button/releases) and click on the **.xpi** file or download and drag it to the browser window.

---

For **Firefox 57+** you should install the addon in the **Nightly** version of the browser. Before installation the browser needs to be configured to allow unsigned legacy addons. 

See this **tutorial** for details on how to use legacy addons in Firefox Nightly edition: [Install Legacy Addons in Firefox Nightly 57+](http://pcadvice.co.nf/blog/install-legacy-addons-in-firefox-57).

In short the steps are the following:

- install Nightly edition and create a new Firefox profile for it if you want
- enable legacy addons setting `about:config?filter=extensions.legacy.enabled` preference to `true`
- enable unsigned addons setting `about:config?filter=xpinstall.signatures.required` preference to `false`
- disable multiprocess mode if the addon gives errors setting `about:config?filter=browser.tabs.remote.autostart` to `false`
