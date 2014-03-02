/*
 *    jQuery.modal - Modal over modal and persistant content plugin for jQuery
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
      persistantContentArray = [],
      persistantContentFlagArray = [],
      modal_attr = 'modal-id',
  
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
                          persistantContent: true,
                          autoCenter: true,
                          overlayClose: false,
                          overlayOpacity: 0.5,
                          overlayColor: '#000'},

              options = $.extend(defaults, options);

          // Stop function if modal window is already visible
          if (_this.is(":visible")) return false;

          // Set modal id
          if (_this.attr(modal_attr) === undefined) {
            var modal_id = Math.random().toString().replace('.', '');
          } else {
            var modal_id = _this.attr(modal_attr);
          }

          _this.attr(modal_attr, modal_id);

          persistantContentFlagArray[modal_id] = options.persistantContent;

          // Save content if persistantContent is true
          if (!options.persistantContent) {
            persistantContentArray[modal_id] = $('> *', _this).clone(true);
          };

          // Create modal overlay
          if (options.showOverlay) {
            var overlay = $('<div />').css({zIndex: (helpers.maxZIndex() + 1),
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
          }

          if (options.overlayClose) {
            overlay.click(function () {
              _this.modal('hide');
            });
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
        },

        hide: function () {
          var
              _this = this,
              modal_id = _this.attr(modal_attr),
              overlay = $('[' + modal_attr + '="' + modal_id + '"].modal.overlay');

          _this.fadeOut(250, function () {
            if (!persistantContentFlagArray[modal_id]) {
              $('*', _this).remove();
              _this.append(persistantContentArray[modal_id]);
            }
          });

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
