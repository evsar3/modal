(function ($) {
  var 
      persistantContentArray = [],
      persistantContentFlagArray = [],
      modal_attr = 'modal-id',
  
      /* Helpers functions for plugin */
      helpers = {
        // Get max z-index in the page
        maxZIndex: function (selector) {
          return Math.max(0, Math.max.apply(null, $.map(((selector || "*") === "*") ? $.makeArray(document.getElementsByTagName("*")) : $(selector),
          function (v) {
            return parseFloat($(v).css("z-index")) || null;
          })));
        },
        
        // Center an element in screen
        center: function (element) {
          element.css('position', 'fixed');
          element.css('top', Math.max(0, (($(window).height() - element.outerHeight()) / 2)) + 'px');
          element.css('left', Math.max(0, (($(window).width() - element.outerWidth()) / 2)) + 'px');
        }
      }

  var methods = {
    show: function (options) {
      var
          _this = this,
         
          defaults = {showOverlay: true,
                      persistantContent: true,
                      autoCenter: true,
                      overlayClose: false,
                      overlayOpacity: 0.5,
                      overlayColor: '#000'},
         
          options = $.extend(defaults, options),
          
          modal_id = Math.random().toString().replace('.', '');

      // End of statement if the modal window is already visible
      if (_this.attr(modal_attr) !== undefined) {
        return false;
      }

      _this.attr(modal_attr, modal_id);

      persistantContentFlagArray[modal_id] = options.persistantContent;

      // Save content if persistantContent is true
      if (!options.persistantContent) {
        persistantContentArray[modal_id] = $('*', _this).clone(true);
      };

      // Create modal overlay
      if (options.showOverlay) {
        $('<div />').css({zIndex: (helpers.maxZIndex() + 1),
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
        $('[' + modal_attr + '="' + modal_id + '"].modal.overlay').click(function () {
          _this.modal('hide');
        });
      };

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
      $('[' + modal_attr + '="' + modal_id + '"].modal.overlay').show();
      _this.show();

      // Move the focus to the first input element in modal window
      $(':input:first', _this).focus();
    },

    hide: function () {
      var 
          _this = this,
          modal_id = _this.attr(modal_attr);

      _this.hide();

      $('[' + modal_attr + '="' + modal_id + '"].modal.overlay').hide().remove();

      if (!persistantContentFlagArray[modal_id]) {
        $('*', _this).remove();
        _this.append(persistantContentArray[modal_id]);
      }

      _this.removeAttr(modal_attr);
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
