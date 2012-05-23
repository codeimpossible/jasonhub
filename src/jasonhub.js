/*
  JasonHub
  (c) 2012 jared barboza
  http://codeimpossible.com
  http://github.com/codeimpossible/jasonhub

  GitHub JSONP API Library for RequireJS


  The MIT License (MIT)

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

define(function(){
  var api_url = "https://api.github.com/";

  var parseDataObjectToQueryString = function(data) {
    var q = "";
    if(data){
      for(var p in data) {
        if( data.hasOwnProperty(p) ) {
          q += "&" + p + "=" + data[p];
        }
      }
    }
    return q;
  };

  var isArray = function(o) { return o.constructor === Array; }

  var format_url = function (method, data) {
    var prefix = api_url, suffix = "?callback=define";
    return url = prefix + method + suffix + parseDataObjectToQueryString(data);
  }

  return {
    get: function(method, fnCallback, data) {
      // TODO: maybe we should cache these in localStorage???
      urls = [];
      if( isArray(method) ) {
        // we can declare a dependency on many api calls
        for(var i = -1, l = method.length; ++i < l; ) {
          // build up our api calls
          urls.push( format_url( method[i].method, method[i].data ) );
        }
      } else {
        urls.push( format_url(method, data) );
      }

      require(urls, function(){
        // here is where the "magic"
        // happens. Build out an object that mashes
        // all of the requests together
        var args = {};
        for(var i = -1, l = arguments.length; ++i < l; ) {
          var methodInfo = method[i];
          if( methodInfo ) {
            // thank god requirejs keeps the order
            args[ methodInfo.key ] = arguments[i];
          }
        }
        fnCallback.call(this, args); // keep scoping intact
      });
    }
  };
});
