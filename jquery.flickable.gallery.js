/**
 * Image slider gallery
 * with jQuery.flickable (http://lagoscript.org/jquery/flickable)
 *
 * @author     RaNa design associates, inc.
 * @copyright  2011 RaNa design associates, inc.
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @update     2011-10-13 14:35:49
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
	var options = this.defaultOptions;
	$.extend(this, options, arguments[0]);
	// initialize
	this._create();
}
FlickableGallery.prototype = {
	defaultOptions: {
		contentSelector: '',
		pagingNavSelector: '',
		prevNavSelector: '',
		nextNavSelector: '',
		prevNavCoverSelector: '',
		nextNavCoverSelector: '',
		sectionSelector: '',
		sectionWrapperSelector: '',
		sectionMargin: 0,
		sectionIndex: 0,
		timerInterval: 3000,
		flickCancel: 0
	},
	_create: function () {
		// initial set variable
		var context = this.element[0];
		this.content = $(this.contentSelector, context);
		this.pagingNav = $(this.pagingNavSelector, context);
		this.prevNav = $(this.prevNavSelector, context);
		this.nextNav = $(this.nextNavSelector, context);
		this.prevNavCover = $(this.prevNavCoverSelector, context);
		this.nextNavCover = $(this.nextNavCoverSelector, context);
		this.sections = $(this.sectionSelector, this.content[0]);
		this.sectionWrapper = $(this.sectionWrapperSelector, context);

		this.sections.each(function (i, section) {
			$(section).data('index', i);
		});
		this.timer = {};

		// initial update()
		this._update();
		$(window).resize($.proxy(function () {
			this._update();
		}, this));

		// get flickable
		this.content.flickable({
			section: this.sectionSelector,
			friction: 0.5,
			elasticConstant: 0.6,
			cancel: this.flickCancel
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
		this.timer = setTimeout($.proxy(function () {
			if (this.sectionIndex >= this.sections.length - 1) {
				this.sectionIndex = 0;
			} else {
				this.sectionIndex ++;
			}
			this._selectContent(this.sectionIndex);
		}, this), this.timerInterval);
	}
};

})(jQuery, window, document);
