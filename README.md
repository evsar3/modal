jQuery.modal
============

Another modal plugin for jQuery with modalOverModal support and persistent content support

Usage
-----

Usage is pretty simple. Don't need to init the objects. Just call the plugin.  
Exemple:  
`$('#modal').modal()`  

Exemple 2:  
`$('#modal').modal({options})`  
`#('#modal').modal({overlayClose: true, persistentContent: false})`  

Options
-------

| Option name       | Type  | Default value | Description                                                                                                                                                  |
|-------------------|-------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| showOverlay       | bool  | `true`        | Show modal overlay, if set to `false`, plugin will not create overlay. If you wish a 'invisible' overlay, check `overlayColor` and `overlayOpacity` options. |
| persistentContent | bool  | `true`        | If this option is set to `false`, when modal hides, the modal DOM structure will be restored to original.                                                    |
| autoCenter        | bool  | `true`        | This option set the modal window on center of screen. You can set the modal position manually via CSS.                                                       |
| overlayClose      | bool  | `false`       | If is `true`, the modal will be hidden when user click on the overlay.                                                                                       |
| overlayOpacity    | float | `0.5`         | Set the overlay opacity level                                                                                                                                |
| overlayColor      |       | `#000`        | Set the overlay color. Don't use RGBA, the alpha must to be controlled via `overlayOpacity` option.                                                          |

> Tip: Adding classes `modal hide` on an element inside the modal window, allow the plugin to attach the `hide` method to the element.

Example:
`<a href="#" title="Close the window" class="close-button modal hide">CLOSE THIS WINDOW</a>`

Methods
-------

### show
Default method. It is impliced.  
 Example:  
 `$('#modal').modal();` or `$('#modal').modal({options})` or `$('#modal').modal('show')` or `$('#modal').modal('show', {options})`

### hide
Hide the modal window.  
 Example:  
 `$('#modal').modal('hide');`  


> The jQuery.modal don't have any callbacks yet. Commits are welcomed.


Demo fiddle:  
[Demo on jsFiddle](http://jsfiddle.net/evandroprogram/wLdFS/ "Launch demo page")
