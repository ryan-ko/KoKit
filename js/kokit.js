'use strict';

/**
* KoKit
* Trying to imitate some jQuery goodies so I don't need to use jQuery
* @author rko@ryanko.me
*/
var $ = (function(){
	var $$,
		KoKit,
		Util;

	$$ = function(elems){
		return new KoKit(elems);
	};

	KoKit = function(elems) {
		var domArray = document.querySelectorAll(elems);
		this.collection = domArray[1] ? Array.prototype.slice.call(domArray) : [domArray];
	};

	/**
	* Internal Util object to store some shared functions within KoKit
	*/
	Util = {
		getDomIdentifier: function(el) {
			var domIdentifier = '',
				classNameLabelArray,
				i,
				id;

			if (el.id === '') {
				classNameLabelArray = el.className.split(' ');
				for (i = 0; i < classNameLabelArray.length; i++) {
					domIdentifier += '.' + classNameLabelArray[i] + '';
				}
			} else {
				id = el.id;
				domIdentifier = '#' + id;
			}

			return domIdentifier;
		}
	};

	/**
	* KoKit Available functions
	*/
	$$.fn = KoKit.prototype = {

		/**
		* Loop through each element and return them
		* Example: $('.boxes').each(function(target, index){console.log('target.id', target.id);console.log('index', index);});
		*/
		each: function(fn) {
			var elems = this.collection,
				i,
				l;

			for (i = 0, l = elems.length; i < l; i++) {
				fn(elems[i], i);
			}
			return this;
		},

		/**
		* Loop through each element and apply css styles
		* Example: $('.boxes').css({'background':'red', 'color':'#fff'})
		*/
		css: function(styles) {
			var elems = this.collection,
				i,
				l,
				prop;

			if (elems.length > 1) {
				for (i = 0, l = elems.length; i < l; i++) {
					for (prop in styles) {
						elems[i].style[prop] = styles[prop];
					}
				}
			} else {
				for (prop in styles) {
					elems[0][0].style[prop] = styles[prop];
				}
			}

			return this;
		},

		/**
		* Check if element has a certain class
		* Fall back to a RegExp if classList is not supported by the browser
		* Usage same as jQuery
		* Reference: http://jaketrent.com/post/addremove-classes-raw-javascript/
		*/
		hasClass: function(className) {
			var elems = this.collection,
				i,
				elem;

			for (i = 0; i < elems.length; i++) {
				elem = this.collection.length > 1 ? elems[i] : elems[i][0];
				if (elem.classList) {
					return elem.classList.contains(className);
				} else {
					return !!elem.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
				}
			}
		},

		/**
		* Adding a class to an element by class or id
		* Fall back manually manipulate classname via strings
		* Usage same as jQuery
		* Reference: http://jaketrent.com/post/addremove-classes-raw-javascript/
		*/
		addClass: function(classNames) {
			var elems = this.collection,
				that = this,
				i,
				j,
				classNamesArray,
				target,
				el;

			// Loop thru each DOM elements
			for (i = 0; i < elems.length; i++) {
				el = this.collection.length > 1 ? elems[i] : elems[i][0];
				// Check if classList is available
				if (el.classList) {
					// Create an array of classList
					classNamesArray = classNames.split(' ');
					// For each class, add it via classList
					for (j = 0; j < classNamesArray.length; j++) {
						el.classList.add(classNamesArray[j]);
					}
				// If doesn't support classList, just append as string
				} else {
					target = $(Util.getDomIdentifier(el));
					if (!that.hasClass.call(target, classNames)) {
						el.className += ' ' + classNames;
					}
				}
			}
			return this;
		},

		/**
		* Removing a class to an element by class or id
		* Fall back manually manipulate classname via RegExp
		* Usage same as jQuery
		* Reference: http://jaketrent.com/post/addremove-classes-raw-javascript/
		*/
		removeClass: function(classNames) {
			var elems = this.collection,
				that = this,
				i,
				el,
				classNamesArray,
				j,
				target,
				reg,
				className;

			// Loop thru each DOM elements
			for (i = 0; i < elems.length; i++) {
				el = this.collection.length > 1 ? elems[i] : elems[i][0];
				// Check if classList is available
				if (el.classList) {

					// Create an array of classList
					classNamesArray = classNames.split(' ');
					// For each class, add it via classList
					for (j = 0; j < classNamesArray.length; j++) {
						el.classList.remove(classNamesArray[j]);
					}

					// If doesn't support classList, just append as string
				} else {
					target = $(Util.getDomIdentifier(el));
					if (!that.hasClass.call(target, classNames)) {
						reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
						el.className = el.className.replace(reg, ' ');
					}
				}
			}
			return this;
		},

		/**
		* Vertically scroll specified element(s) to a value
		* Example: $('body').verticalScrollTop(200);
		*/
		verticalScrollTo: function(yScrollValue) {
			var elems = this.collection,
				i,
				elemsCount = elems.length;

			for (i = 0; i < elemsCount; i++) {
				if (elemsCount === 1) {
					elems[i][0].scrollTop = yScrollValue;
				} else if (elemsCount > 1) {
					elems[i].scrollTop = yScrollValue;
				}
			}
			return this;
		},

		/**
		* Replace specified element(s) inner HTML
		* Example: $('#box1').html('Hello World!');
		*/
		html: function(content) {
			var elems = this.collection,
				i,
				elemsCount = elems.length;

			for (i = 0; i < elemsCount; i++) {
				if (elemsCount === 1) {
					elems[i][0].innerHTML = content;
				} else if (elemsCount > 1) {
					elems[i].innerHTML = content;
				}
			}
			return this;
		},

		/**
		* Hide specified element(s) by setting display to none
		* Example: $('#box1').hide();
		*/
		hide: function() {
			var elems = this.collection,
				i,
				elemsCount = elems.length;

			for (i = 0; i < elemsCount; i++) {
				if (elemsCount === 1) {
					elems[i][0].style.display = 'none';
				} else if (elemsCount > 1) {
					elems[i].style.display = 'none';
				}
			}
			return this;
		},

		/**
		* Show specified element(s) by setting display to block
		* Example: $('#box1').show();
		*/
		show: function() {
			var elems = this.collection,
				i,
				elemsCount = elems.length;

			for (i = 0; i < elemsCount; i++) {
				if (elemsCount === 1) {
					elems[i][0].style.display = 'block';
				} else if (elemsCount > 1) {
					elems[i].style.display = 'block';
				}
			}
			return this;
		}
	};

	return $$;
})();
