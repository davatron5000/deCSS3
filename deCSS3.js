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
    return prefixes.join( rule ) + rule;
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
        rFound   = new RegExp( "\\@media|column-count|rgba|hsla|linear-gradient", "g" ),
        rColumn  = new RegExp( "column-count:(.*?)\\;", "g" ),
        rRgba    = new RegExp( "rgba\\((.*?)\\)\\;", "g" ),
        rHsla    = new RegExp( "hsla\\((.*?)\\)\\;", "g" ),
        rLinear  = new RegExp( "linear-gradient\\((.*?)\\)\\;", "g" );

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
            found    = ruleText.match( rFound );

        // Break early if there are no matches
        if ( !found ) {
          return;
        }

        if ( ~found.indexOf( '@media' ) ) {
          // newRule = newRule + "";
        }
        else {

          newRule = ruleText;

          if ( ~found.indexOf( 'column-count' ) ) {
            newRule = newRule.replace( rColumn, 'column-count: 1;' );								
          }

          if ( ~found.indexOf( 'rgba' ) ) {
            newRule = newRule.replace( rRgba, 'rgba();' );
          }

          if ( ~found.indexOf( 'hsla' ) ) {
            newRule = newRule.replace( rHsla, 'hsla();' );
          }

          if ( ~found.indexOf( 'linear-gradient' ) ) {
            newRule = newRule.replace( rLinear, 'linear-gradient();' );
          }

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
        stylesheet.deleteRule( element );	
      });

      // Return the set of new rules for this stylesheet
      return newRules;
    })
    // Join all the rules as a string
    .join( "" );
  }
}
deCSS3.init();
