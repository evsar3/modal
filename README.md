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

<table>
    <thead>
        <tr>
            <th>Option name</th>
            <th>Type</th>
            <th>Default value</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>showOverlay</td>
            <td>boolean</td>
            <td>`true`</th>
            <td>Show modal overlay, if set to `false`, plugin will not create overlay. If you wish a 'invisible' overlay, check `overlayColor` and `overlayOpacity` options.</td>
        </tr>
        <tr>
            <td>persistentContent</td>
            <td>boolean</td>
            <td>`true`</th>
            <td>If this option is set to `false`, when modal hides, the modal DOM structure will be restored to original.</td>
        </tr>
        <tr>
            <td>autoCenter</td>
            <td>boolean</td>
            <td>`true`</th>
            <td>This option set the modal window on center of screen. You can set the modal position manually via CSS.</td>
        </tr>
        <tr>
            <td>overlayClose</td>
            <td>boolean</td>
            <td>`false`</th>
            <td>If is `true`, the modal will be hidden when user click on the overlay.</td>
        </tr>
        <tr>
            <td>overlayOpacity</td>
            <td>double</td>
            <td>`0.5`</th>
            <td>Set the overlay opacity level.</td>
        </tr>
        <tr>
            <td>overlayColor</td>
            <td>string</td>
            <td>`#000`</th>
            <td>Set the overlay color. Don't use RGBA, the alpha must to be controlled via `overlayOpacity` option.</td>
        </tr>
    </tbody>
</table>

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
