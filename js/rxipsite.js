/* RxIPSite Object
 *
 * This provides an interface to the RxIP service.
 * 
 * The site property is an object that is filled with information from the RxIP service
 * each time the service is called. When no user is logged in, this object will contain a
 * loggedIn property that is == 0. If a user is logged in, the value of site.loggedIn will
 * be == 1.
 * 
 * The sessionID property is managed by the RxIPSite object.
 */
RxIPSite = function(url) {
	this.url = url;
	this.site = { loggedIn: 0, serverDebugSettings: { debug: 0, trace: 0, strict: 0, sqlLevel: 0 } };
	this.siteHtml = {};
	this.sessionId = null;
	// HTML-escape a string (or the string representation of whatever is passed)
	this._escapeString = function(str) {
		return $('<div/>').text(str).html().replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
	};
	// Function copies object while HTML-escaping the property values
	// Includes conversion of line separators into <br>
	this._escapeObject = function(plainObj) {
		var htmlObj = {};
		for (var k in plainObj) {
			if (typeof(plainObj[k]) == 'object')
				htmlObj[k] = this._escapeObject(plainObj[k]);
			else
				htmlObj[k] = this._escapeString(plainObj[k]);
		}
		return htmlObj;
	};
	// Form an HTML-escaped version of the site object
	this._escapeSite = function() {
		this.siteHtml = this._escapeObject(this.site);
	};
	this._escapeSite();
};

RxIPSite.prototype.havePractice = function() {
	return (typeof(this.site.practiceId) != 'undefined' && Number(this.site.practiceId) > 0);
};

RxIPSite.prototype.hasProviders = function() {
	return (typeof(this.site.allowedProviders.length) != 'undefined' && this.site.allowedProviders.length > 0);
};

/* Interface to server AJAX handler
 * 
 * This calls AJAX functions that are defined in the ajax.php file, passing the supplied "data"
 * object as the input. These return an AJAX response object that consists of one of more of the
 * following elements:
 * 
 * debug - A string of debug data. This will be displayed in the Document element with ID ajaxdebug.
 * err - A string that is an error message to display. If present, no further processing should occur.
 * data - The response data from the AJAX call, as defined for the particuler call. (Generally either
 * an HTML string or an object).
 * 
 * If the err element isn't present, the callback function is called with the value of the
 * data element as its sole parameter.
 * 
 * rxip_ajax is the core of the AJAX interface to the system and will be called by other JS
 * functions that extend its use.
 */
RxIPSite.prototype.callAjax = function(func, params, callback) {
	this.showBusy(true);
	if (typeof(params) == 'undefined')
		params = {};
	params.ajax = func;
	if (this.sessionId)
		params.sessionId = this.sessionId;
	var obj = this;
	var fd = params;
	if (!(fd instanceof FormData)) {
		// Convert the parameters to a FormData object for
		// consistency
		var fd = new FormData();
		for (k in params) {
			if (params[k] instanceof FileList) {
				for (j in params[k])
					fd.append(k+''+j, params[k][j]);
			}
			fd.append(k, params[k]);
		}
	}
	var ajaxParams = {
		url: this.url,
		type: 'POST',
		dataType: 'json',
		// Converting the parameters to a FormData object
		// means jQuery shouldn't try to process the data
		processData: false,
		contentType: false,
		data: fd,
		success: function(result) {
			obj.showBusy(false);
			if (typeof(result.data.site != 'undefined')) {
				obj.site = result.data.site;
				obj._escapeSite();
				if (!obj.site.loggedIn)
					obj.eraseCookie('rxipapi');
			}
			if (typeof(result.debug) != 'undefined')
				$('#ajaxdebug').html(result.debug).show();
			if (typeof(result.err) != 'undefined')
				obj.showError(result.err);
			else if (typeof(callback) == 'function')
				callback(result.data);
			if (func != 'loginUser' && func != 'logout')
				obj.callCompleted(func);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			if (errorThrown)
				obj.showError('Unable to communicate with server:\n\n'+errorThrown);
			obj.showBusy(false);
		}
	};
	jQuery.ajax(ajaxParams);
};

/* The showBusy function will be called with busy == true when an AJAX call is initiated.
 * It will be called with false once the call terminates.
 * 
 * The default showBusy function does nothing, but in practice it should be replaced
 * with a function that prevents further AJAX calls and probably also displays an
 * indication that the system is busy.
 */
RxIPSite.prototype.showBusy = function(busy) {
};

/* The showError function receives an error-message string as its argument.
 * The default function displays the error via a JS alert, but the app
 * may choose to replace this with something nicer.
 */
RxIPSite.prototype.showError = function(errorMsg) {
	alert(errorMsg);
};

/* Function called when any callAjax function is finished,
 * including calling the passed callback function, if any.
 * 
 * The func argument is the name of the API method that just
 * completed being called. That is, it is the func argument
 * passed top callAjax.
 * 
 * The default function does nothing.
 */
RxIPSite.prototype.callCompleted = function(func) {
};

/* Cookie handling functions.
 * 
 * These are here principally to support session management, but the application is free
 * to use them to put other cookies on the user's browser. Just don't name any of them
 * 'rxipapi' because that's the session cookie.
 * 
 * createCookie - Creates a cookie in the user's browser. Use of the "days" argument
 * is optional. If not used, the cookie will expire at the end of the user's session.
 */
RxIPSite.prototype.createCookie = function(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
};

/* readCookie - Reads a cookie from the user's browser.
 * 
 * Returns the value of the cookie, or null if no such cookie exists.
 */
RxIPSite.prototype.readCookie = function(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
};

/* eraseCookie
 * 
 * Erases a cookie from the user's browser.
 */
RxIPSite.prototype.eraseCookie = function(name) {
    this.createCookie(name, "", -1);
};

/* Log in a user to the RxIP service.
 * 
 * The loginParameters argument must be an object containing the properties "username" and "password".
 * 
 * When the callback is called, the passed argument will be true if the login was successful.
 * Also, the sessionId of the object will be non-null and the object's site object should be
 * populated with the properties supplied by the RxIP service. 
 */
RxIPSite.prototype.loginUser = function(loginParameters, callback) {
	var obj = this;
	obj.sessionId = null;
	this.callAjax('loginUser', loginParameters, function(data) {
		if (data.sessionId) {
			obj.sessionId = data.sessionId;
			obj.createCookie('rxipapi', data.sessionId);
		}
		if (typeof(callback) == 'function')
			callback(obj.sessionId ? true : false);
	});
};

RxIPSite.prototype.setLoggedOut = function() {
	this.sessionId = null;
	this.site.loggedIn = 0;
};

/* Log the user out and terminate the session.
 * 
 * When the callback is called, the user will have been logged out, the session
 * is destroyed, the object's site.loggedIn == 0, and the object's sessionId has
 * been set to null.
 */
RxIPSite.prototype.logout = function(callback) {
	var obj = this;
	this.callAjax('logout', {}, function(data) {
		obj.setLoggedOut();
		if (typeof(callback) == 'function')
			callback(obj.sessionId ? true : false);
	});
};

/* Initialize the session.
 * 
 * Reads the session cookie to get the sessionId.
 * 
 * Returns true if a session cookie was found, false if not.
 * Note that this does not imply that the server will recognize the session. It may have
 * timed out on the server end, for example.
 */
RxIPSite.prototype.initSession = function() {
	this.sessionId = this.readCookie('rxipapi');
	if (this.sessionId == 'undefined')
		this.setLoggedOut();
	return (this.sessionId != null) ? true : false;
};

/* Collect the data from a form into a JS object, generally to be used in an AJAX call,
 * using jQuery.
 * 
 * This performs a bit of specialized logic:
 * 
 * 1) If a form element has class "deleted," the element is ignored.
 * 2) If the control is a text type, leading and trailing spaces are trimmed from its value.
 * 3) If the control name is of the form xxx[], it is taken to be one of a set of elements
 * whose values are to be passed in an array.
 * 
 * form is the ID of the form container. This need not be a <form> element, although it
 * could be. All <input>, <select> and <textarea> elements in the form container will
 * be scanned for their names and values, which are then used to form the returned object.  
 */
RxIPSite.prototype.collectFormData = function(form) {
	var formData = {};
	$('input,select,textarea', $('#'+form)).each(function() {
		var ctltype = $(this).attr('type');
		var ctlname = $(this).attr('name');
		if (typeof(ctlname) == 'undefined')
			return;
		if ($(this).parent().hasClass('deleted'))
			return;
		var value = '';
		if (typeof(ctltype) == 'undefined')	// select or textarea
			value = jQuery.trim($(this).val()); 
		else if (ctltype == 'checkbox')
			value = $(this).is(':checked') ? $(this).attr('value') : '';
		else if (ctltype == 'radio') {
			if (!$(this).is(':checked'))
				return;	// Some other radio button was checked, presumably
			value = $(this).val();
		} else
			value = jQuery.trim($(this).val());
		if (ctlname.match(/\[\]$/)) {
			ctlname = ctlname.replace(/\[\]$/, '');
			if (typeof(formData[ctlname]) != 'object')
				formData[ctlname] = [];
			formData[ctlname].push(value);
		} else
			formData[ctlname] = value;
	});
	return formData;
};

RxIPSite.prototype.setServerDebug = function(settings, callback) {
	var args = jQuery.extend({}, this.site.serverDebugSettings);
	for (k in args) {
		if (typeof(settings[k]) != 'undefined')
			args[k] = settings[k] ? 1 : 0;
	}
	this.callAjax('setDebugging', args, function(data) {
		if (typeof(callback) == 'function')
			callback();
	});
};
