var deCSS3 = {
		
		init: function(){
 	    var rules = "", appendStyle = document.createElement('style');
			rules += this.addStyleBlock();
      rules += this.overrideRules();
			
			appendStyle.id = "deCSS3";
			appendStyle.innerText = rules;
	    document.body.appendChild(appendStyle);

		},
	
		addStyleBlock: function(){
			var rules = '* {';
			rules += this.addPrefixes("border-radius:0!important;");
			rules += this.addPrefixes("box-shadow:none!important;");
			rules += this.addPrefixes("column-span:all!important;");
			rules += this.addPrefixes("text-shadow:none!important;");
			rules += this.addPrefixes("transform:none!important;");
			rules += this.addPrefixes("transition:none!important;");
			// TODO: background-clip, background-origin, background-size?, animation
			rules += '}';

			return rules;
		},
		
		addPrefixes: function(rule) {
			var prefixes = ['-webkit-','-moz-','-o-'];
			var prefixedRule = "";
			prefixes.forEach(function(prefix){
				prefixedRule += prefix + rule;
			});
			prefixedRule += rule;
			return prefixedRule;
		},
		
		overrideRules: function() {
			/*
			# TODO: write function that detects certain CSS3 rules and emptys out the rule to override
			# e.g., rgba(0,0,0,0.4) can be overriden by rgba()
			# 
			# @rules = multiplebg images, mediaqueries, background-size?, @font-face?
			*/	

			var newRules = "";
			
			// - loop each stylesheet
			for(var i=0; i < document.styleSheets.length; i++) {
				var stylesheet = document.styleSheets[i];
				
				if(stylesheet.cssRules) {
				var numRules = stylesheet.cssRules.length;
				var rulesToDelete = [];
				
					// -- loop each rule
					for(var j=0; j < numRules; j++) {
				
							var newRule = "";
							var currentRule = stylesheet.cssRules[j];
							var currentRuleText = currentRule.cssText;
							
							var found = currentRuleText.match(/\@media|column-count|rgba|hsla|linear-gradient/g);
							
							if(found) {
		
								if(found.indexOf("@media") > -1) {
									// newRule = newRule + "";
								} else {
									
									newRule = currentRuleText;
									
									if(found.indexOf('column-count') > -1) {
										newRule = newRule.replace(/column-count:(.*?)\;/g, 'column-count: 1;');								
									}
									
									if(found.indexOf('rgba') > -1) {
										newRule = newRule.replace(/rgba\((.*?)\)\;/g, 'rgba();');
									}
		
									if(found.indexOf('hsla') > -1) {
										newRule = newRule.replace(/hsla\((.*?)\)\;/g, 'hsla();');
									}
		
									if(found.indexOf('linear-gradient') > -1) {
										newRule = newRule.replace(/linear-gradient\((.*?)\)\;/g, 'linear-gradient();');
									}
									
								}
								
								// add this rule index to list of rules to be deleted.
								rulesToDelete.push(j);
		
							}
										
						newRules += newRule;
	
					}
				
					rulesToDelete.reverse().forEach(function(element){
						stylesheet.deleteRule(element);	
					});
				}
			}
			return newRules;
			
		}
}
deCSS3.init();