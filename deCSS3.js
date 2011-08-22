var deCSS3 = {

  init: function () {
    var appendStyle = document.createElement( 'style' );
    appendStyle.id = "deCSS3";
    appendStyle.textContent = this.addStyleBlock() + this.overrideRules();
    document.body.appendChild( appendStyle );
  },

  addStyleBlock: function () {
    // TODO: background-clip, background-origin, background-size?, animation
    var that  = this,
        rules = [
      "border-radius:0!important;",
      "box-shadow:none!important;",
      "column-span:all!important;",
      "text-shadow:none!important;",
      "transform:none!important;",
      "transition:none!important;"
    ];

    return '* {' + rules.map(function( v ){ return that.addPrefixes( v ); }).join( "" ) + '}';
  },

  addPrefixes: function ( rule ) {
    var prefixes = [ '-webkit-','-moz-','-o-', '-ms-', '-khtml-' ];
    return prefixes.join( rule ) + rule + rule;
  },

  /**
   * TODO: write function that detects certain CSS3 rules and emptys out the rule to override
   * e.g., rgba(0,0,0,0.4) can be overriden by rgba()
   * 
   * @rules = multiplebg images, mediaqueries, background-size?, @font-face?
   */	

  overrideRules: function () {
    var map      = function ( arr, fn ) {
          return [].map.call( arr, fn );
        },
        ruleSets = {
          column : {
            regex    : /column-count(.*?)\;/g,
            sentinel : 'column-count',
            repl     : 'column-count: 1;'
          },
          rgba   : {
            regex    : /rgba\((.*?)\)\;/g,
            sentinel : 'rgba',
            repl     : 'rgba();'
          },
          hsla   : {
            regex    : /hsla\((.*?)\)\;/g,
            sentinel : 'hsla',
            repl     : 'hsla();'
          },
          linear : {
            regex    : /linear-gradient\((.*?)\)\;/g,
            sentinel : 'linear-gradient',
            repl     : 'linear-gradient();'
          }
        },
        rFound   = /\@media|column-count|rgba|hsla|linear-gradient/g,
        ruleReplacer = function ( found, newRule, sentinel, regex, repl ) {
          if ( ~ found.indexOf( sentinel ) ) {
            newRule = newRule.replace( regex, repl );
          }
          return newRule;
        };

    // Go through each stylesheet and return an array of new rules for each, then convert to string
    return map( document.styleSheets, function ( stylesheet ) {
      var newRules = "";

      // Bail if there are no styles
      if ( ! stylesheet.cssRules ) {
        return;
      }

      // Find the rules we want to delete
      map( stylesheet.cssRules, function ( rule, idx ) {
        var ruleText = rule.cssText,
            found    = ruleText.match( rFound ),
            i, ruleSet;

        // Break early if there are no matches
        if ( !found ) {
          return;
        }

        newRule = ruleText;

        // Loop through each rule set and apply it to this css rule
        for ( i in ruleSets ) {
          ruleSet = ruleSets[ i ];
          newRule = ruleReplacer( found, newRule, ruleSet.sentinel, ruleSet.regex, ruleSet.repl );
        }

        // Add to rule list
        newRules += newRule;

        // add this rule index to list of rules to be deleted.
        return idx;
      })
      // Reverse this so our indexes keep cool
      .reverse()
      // loop through and delete them
      .forEach(function( element ){
        if ( typeof element != 'undefined' ) {
          stylesheet.deleteRule( element );
        }
      });

      // Return the set of new rules for this stylesheet
      return newRules;
    })
    // Join all the rules as a string
    .join( "" );
  }
}
// Auto-init
deCSS3.init();
