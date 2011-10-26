/**
 * Image slider gallery
 * with jQuery.flickable (http://lagoscript.org/jquery/flickable)
 *
 * @author     RaNa design associates, inc.
 * @copyright  2011 RaNa design associates, inc.
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @update     2011-10-26 20:57:05
 */

;(function($, window, document, undefined) {

/**
 * jQuery interface
 */
$.fn.flickableGallery = function (options) {
	var opt = options || {};
	this.each(function (i, element) {
		opt.element = $(element);
		$(element).data('flickableGallery', new FlickableGallery(opt));
	});
	return this;
};

/**
 * main class
 */
function FlickableGallery() {
	// extend default options
	this.options = {};
	$.extend(this.options, this.defaultOptions, arguments[0]);
	// initialize
	this._create();
}
FlickableGallery.prototype = {
	defaultOptions: {
		width: null,
		content: '.flickable-content',
		pagingNavClassName: 'flickable-nav',
		prevNavClassName: 'flickable-nav-prev',
		nextNavClassName: 'flickable-nav-next',
		prevNavCoverClassName: 'flickable-nav-prev-cover',
		nextNavCoverClassName: 'flickable-nav-next-cover',
		sectionSelector: 'li',
		sectionWrapperSelector: '',
		sectionIndex: 0,
		timerInterval: 3000,
		flickCancel: 0
	},
	_create: function () {
		// initial set variable
		var opt = this.options;
		var context = opt.element[0];
		this.element = this.options.element;
		this.sectionIndex = opt.sectionIndex;
		this.content = $(opt.content, context);
		if (opt.width) {
			this.content.width(opt.width - 2);
		}
		this.links = $('a', this.content[0]);

		this.sections = $(opt.sectionSelector, this.content[0]);
		this.sectionWrapper = $(opt.sectionWrapperSelector, context);

		this.sections.each(function (i, section) {
			$(section).data('index', i);
		});
		this.timer = {};

		// initialize navigation
		this._buildNav();

		// initial update()
		this._update();
		$(window).resize($.proxy(function () {
			this._update();
		}, this));

		// get flickable
		this.content.flickable({
			section: opt.sectionSelector,
			friction: 0.5,
			elasticConstant: 0.6,
			cancel: opt.flickCancel
		}).bind('flickchange', $.proxy(function (e, ui) {
			this.sectionIndex = $(ui.newSection[0]).data('index');
			this._updateNav(this.sectionIndex);
			this._updateTimer();
		}, this)).bind('flick', $.proxy(function () {
			this._updateTimer();
		}, this));

		// setup and update nav
		this._setupPagingNav();
		this._setupPrevNextNav();
		this._updateNav(this.sectionIndex);
	},
	_buildNav: function () {
		var opt = this.options;
		var wrap1 = $('<div/>', {
			'class': opt.pagingNavClassName
		});
		var wrap2 = $('<ul/>');
		this.links.each(function (i, link) {
			var li = $('<li/>');
			var a = $('<a/>', { 'href': $(link).attr('href') });
			var span = $('<span/>');
			var img = $(link).find('img');
			var text = img.attr('alt') || '';
			span.append(text);
			a.append(span);
			li.append(a);
			wrap2.append(li);
		});
		
		this.pagingNav = $('a', wrap2);
		this.prevNav = $('<div/>', {
			'class': opt.prevNavClassName });
		this.nextNav = $('<div/>', {
			'class': opt.nextNavClassName });
		this.prevNavCover = $('<div/>', {
			'class': opt.prevNavCoverClassName }).hide();
		this.nextNavCover = $('<div/>', {
			'class': opt.nextNavCoverClassName }).hide();
		wrap1.append(wrap2).append(this.prevNav).append(this.nextNav)
			.append(this.prevNavCover).append(this.nextNavCover);
		this.element.append(wrap1);
	},
	_update: function() {
		this._setupLayout();
		// set timer
		this._updateTimer();
	},
	_setupLayout: function () {
		var winWidth = $(window).width(),
			sectionWidth = $(this.sections[0]).width();
		this.spacerWidth = Math.round((winWidth - sectionWidth) / 2);

		var totalWidth = 0;
		this.sections.each(function () {
			totalWidth += $(this).width();
		});
		this.sectionWrapper.width(totalWidth + 50); // 50 is buffer
	},
	_setupPagingNav: function () {
		this.pagingNav.each($.proxy(function (i, nav) {
			$(nav).click($.proxy(function (e) {
				this.sectionIndex = i;
				this._updateNav(i);
				this.content.flickable('select', i);
				e.preventDefault();
			}, this));
		}, this));
	},
	_setupPrevNextNav: function () {
		this.prevNav.click($.proxy(function (e) {
			this.sectionIndex --;
			this._selectContent(this.sectionIndex);
			e.preventDefault();
		}, this));
		this.nextNav.click($.proxy(function (e) {
			this.sectionIndex ++;
			this._selectContent(this.sectionIndex);
			e.preventDefault();
		}, this));
	},
	_updateNav: function (index) {
		this.pagingNav.each($.proxy(function (i, nav) {
			if (i === index) {
				$(nav).addClass('on');
			} else {
				$(nav).removeClass('on');
			}
		}, this));
		this._updatePrevNextNav(index);
	},
	_updatePrevNextNav: function(index) {
		if (index <= 0) {
			this.prevNavCover.show();
			this.nextNavCover.hide();
		} else if (index >= (this.sections.length - 1)) {
			this.prevNavCover.hide();
			this.nextNavCover.show();
		} else {
			this.prevNavCover.hide();
			this.nextNavCover.hide();
		}
	},
	_selectContent: function (index) {
		this._updateNav(index);
		this.content.flickable('select', index);
		// set timer
		this._updateTimer();
	},
	_updateTimer: function () {
		clearTimeout(this.timer);
		if (!this.options.timerInterval) { return; }

		this.timer = setTimeout($.proxy(function () {
			if (this.sectionIndex >= this.sections.length - 1) {
				this.sectionIndex = 0;
			} else {
				this.sectionIndex ++;
			}
			this._selectContent(this.sectionIndex);
		}, this), this.options.timerInterval);
	}
};

})(jQuery, window, document);
