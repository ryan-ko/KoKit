var $$ = (function(){
  var $$ = function(elems){
    return new KoKit(elems);
  },

  KoKit = function(elems) {
    var domArray = document.querySelectorAll(elems);
    this.collection = domArray[1] ? Array.prototype.slice.call(domArray) : [domArray];
    return this;
  };

  $$.fn = KoKit.prototype = {
    each : function(fn) {
      var elems = this.collection;
      for (var i = 0, l = elems.length; i < l; i++) {
        fn( elems[i], i );
      }
      return this;
    },
    css : function(styles) {
      var elems = this.collection;
      for (var i = 0, l = elems.length; i < l; i++) {
        for (var prop in styles) {
          elems[i].style[prop] = styles[prop];
        }
      }
      return this;
    },
    hasClass : function(className) {
      var elems = this.collection;

      for (var i = 0; i < elems.length; i++) {
        var elem = this.collection.length > 1 ? elems[i] : elems[i][0];
        if (elem.classList) {
          return elem.classList.contains(className);
          break;
        } else {
          return !!elem.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
      }
    },
    addClass : function(classNames) {
      var elems = this.collection;
      var that = this;

      // Loop thru each DOM elements
      for (var i = 0; i < elems.length; i++) {

        var el = elems[i][0];
        // Check if classList is available
        if (el.classList) {

          // Create an array of classList
          var classNamesArray = classNames.split(' ');
          // For each class, add it via classList
          for (var j = 0; j < classNamesArray.length; j++) {
            el.classList.add(classNamesArray[j]);
          }

          // If doesn't support classList, just append as string
        } else {
          el.className += " " + classNames;
        }
      }
      return this;
    }
  };

  return $$;
})();
