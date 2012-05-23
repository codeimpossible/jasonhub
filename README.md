# JasonHUb
Github API Library for RequireJS.

### Example
Here is an example requirejs module that requests a repo and it's languages from the GitHub API:

```javascript
define([
  'github'
], function( github ){
  var repo_url = 'repos/'+ user + '/' + name,
      api_calls = [
                    { method: repo_url, key: "project" },
                    { method: repo_url + '/languages', key: "languages" }
                  ];

  github.get(api_calls, function( model ) {
    // this code will be called once each api method has been called
    // model.project will contain the response from the repo JSON call
    // model.languages will contain the response from the languages JSON call
  });
});
```
