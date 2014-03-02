jQuery.modal
============

Another modal plugin for jQuery with modalOverModal support and persistent content support

Options table
-------------

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
            <td>true</th>
            <td>Show modal overlay, if set to false, plugin will not create overlay. If you wish a 'invisible' overlay, check overlayColor and overlayOpacity options.</td>
        </tr>
        <tr>
            <td>persistentContent</td>
            <td>boolean</td>
            <td>true</th>
            <td>If this option is set to false, when modal hides, the modal DOM structure will be restored to original.</td>
        </tr>
        <tr>
            <td>autoCenter</td>
            <td>boolean</td>
            <td>true</th>
            <td>This option set the modal window on center of screen. You can set the modal position manually via CSS.</td>
        </tr>
        <tr>
            <td>overlayClose</td>
            <td>boolean</td>
            <td>false</th>
            <td>If is true, the modal will be hidden when user click on the overlay.</td>
        </tr>
        <tr>
            <td>overlayOpacity</td>
            <td>double</td>
            <td>0.5</th>
            <td>Set the overlay opacity level.</td>
        </tr>
        <tr>
            <td>overlayColor</td>
            <td>string</td>
            <td>#000</th>
            <td>Set the overlay color. Don't use RGBA, the alpha must to be controlled via overlayOpacity option.</td>
        </tr>
    </tbody>
</table>

Methods
-------
"show"
The method show is the default. Method it is implicit.
 Example:
 `$('#modal').modal();` or `$('#modal').modal({options})` or `$('#modal').modal('show')` or `$('#modal').modal('show', {options})`

"hide"
Hide the modal window.
 Example:
 `$('#modal').modal('hide');`

Demo fiddle:
[Demo on jsFiddle](http://jsfiddle.net/evandroprogram/wLdFS/ "Launch demo page")
