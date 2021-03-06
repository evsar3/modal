/*
 *    jQuery.modal - Modal over modal and persistent content plugin for jQuery
 *   Copyright (C) 2014 Evandro Araújo
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * Author: Evandro Araújo
 * Location: Fortaleza, CE, Brazil
 * E-mail: evandroprogram@gmail.com
 * Public profile: https://fb.com/evandropontoaraujo
 * Date: Feb, 22, 2014
 * Version: 1.0.3
*/

(function ($) {
  var 
      persistentContentArray = [],
      
      persistentContentFlagArray = [],
      
      modal_attr = 'data-modal-id',
  
      /* Helpers functions for plugin */
      helpers = {
        // Get max z-index in the page
        maxZIndex: function (selector) {
          return Math.max(0, Math.max.apply(null, $.map(((selector || '*') === '*') ? $.makeArray(document.getElementsByTagName('*')) : $(selector),
          function (v) {
            return parseFloat($(v).css('z-index')) || null;
          })));
        },
        
        // Center an element in screen
        center: function (el) {
          el.css('position', 'fixed');
          el.css('top', Math.max(0, (($(window).height() - el.outerHeight()) / 2)) + 'px');
          el.css('left', Math.max(0, (($(window).width() - el.outerWidth()) / 2)) + 'px');
        }
      },

      methods = {
        show: function (options) {
          var
              _this = this,

              defaults = {showOverlay: true,
                          persistentContent: true,
                          autoCenter: true,
                          overlayClose: false,
                          overlayOpacity: 0.5,
                          overlayColor: '#000'},

              options = $.extend(defaults, options),
              
              modal_id = 0,
              
              overlay = $('<div />');

          // Stop function if modal window is already visible
          if (_this.is(":visible")) return false;

          // Set modal id
          if (_this.attr(modal_attr) === undefined) {
            modal_id = Math.random().toString().replace('.', '');
          } else {
            modal_id = _this.attr(modal_attr);
          }

          _this.attr(modal_attr, modal_id);
          
          $('.modal.hide', _this).click(function () {
            _this.modal('hide');
          });

          persistentContentFlagArray[modal_id] = options.persistentContent;

          // Save content if persistentContent is true
          if (!options.persistentContent) {
            persistentContentArray[modal_id] = $('> *', _this).clone(true);
          }

          // Create modal overlay
          if (options.showOverlay) {
            overlay.css({zIndex: (helpers.maxZIndex() + 1),
                         display: 'none',
                         position: 'fixed',
                         width: '100%',
                         height: '100%',
                         top: 0,
                         left: 0,
                         backgroundColor: options.overlayColor,
                         opacity: options.overlayOpacity})
                         .attr(modal_attr, modal_id)
                         .addClass('modal overlay')
                         .appendTo('body');
                         
            if (options.overlayClose) {
              overlay.click(function () {
                _this.modal('hide');
              });
            }
          }

          _this.css({zIndex: (helpers.maxZIndex() + 1),
                     position: 'fixed'});

          // Center modal window in screen
          if (options.autoCenter) {
            helpers.center(_this);

            $(window).resize(function () {
              helpers.center(_this);
            });
          }

          // Show modal in the screen (effects can be used)
          overlay.fadeIn(250);
          _this.fadeIn(250);

          // Move the focus to the first input element in modal window
          $(':input:first', _this).focus();

          return _this;
        },

        hide: function () {
          var
              _this = this,
              modal_id = _this.attr(modal_attr),
              overlay = $('[' + modal_attr + '="' + modal_id + '"].modal.overlay');

          // Hide modal and restore content if persistentContent is true
          _this.fadeOut(250, function () {
            if (!persistentContentFlagArray[modal_id]) {
              $('*', _this).remove();
              _this.append(persistentContentArray[modal_id]);
            }
          });

          // Hide and destroy overlay
          overlay.fadeOut(250, function () {
            overlay.remove();
          });
        }
      }

  jQuery.fn.modal = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      return methods.show.apply(this, arguments);
    }
  }
})(jQuery);
