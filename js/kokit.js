'use strict';

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

	$$.fn = KoKit.prototype = {
		// $('.boxes').each(function(target, index){console.log('target.id', target.id);console.log('index', index);});
		each : function(fn) {
			var elems = this.collection,
				i,
				l;

			for (i = 0, l = elems.length; i < l; i++) {
				fn( elems[i], i );
			}
			return this;
		},
		// $('.boxes').css({'background':'red', 'color':'#fff'})
		css : function(styles) {
			var elems = this.collection,
				i,
				l,
				prop;

			for (i = 0, l = elems.length; i < l; i++) {
				for (prop in styles) {
					elems[i].style[prop] = styles[prop];
				}
			}
			return this;
		},
		// Same as jQuery
		hasClass : function(className) {
			// http://jaketrent.com/post/addremove-classes-raw-javascript/
			var elems = this.collection,
				i,
				elem;

			for (i = 0; i < elems.length; i++) {
				elem = this.collection.length > 1 ? elems[i] : elems[i][0];
				if (elem.classList) {
					return elem.classList.contains(className);
					break;
				} else {
					return !!elem.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
				}
			}
		},
		// Same as jQuery
		addClass : function(classNames) {
			// http://jaketrent.com/post/addremove-classes-raw-javascript/
			var elems = this.collection,
				that = this,
				i,
				classNamesArray,
				j,
				target,
				el;

			// Loop thru each DOM elements
			for (i = 0; i < elems.length; i ++) {
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
						el.className += " " + classNames;
					}
				}
			}
			return this;
		},
		// Same as jQuery
		removeClass: function(classNames) {
			// http://jaketrent.com/post/addremove-classes-raw-javascript/
			var elems = this.collection,
				that = this,
				i,
				el,
				classNamesArray,
				j,
				target,
				reg;

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
		},
		// Same as jQuery
		html: function(content) {
			var elems = this.collection,
				i,
				elemsCount = elems.length;

			for (i = 0; i < elemsCount; i++) {
				if (elemsCount === 1) {
					console.log('test', elems[i]);
					elems[i][0].innerHTML = content;
				} else if (elemsCount > 1) {
					elems[i].innerHTML = content;
				}
			}
		},
		// Same as jQuery
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
		},
		// Same as jQuery
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
		}
	};

	return $$;
})();
