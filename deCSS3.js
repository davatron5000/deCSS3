var deCSS3 = {
		
		init: function(){
			this.addStyleBlock();
      this.emptyRules();
		},
	
		addStyleBlock: function(){
	    var appendStyle = document.createElement('style');
			var rules = '* {';
			rules += this.addPrefixes("border-radius:0!important;");
			rules += this.addPrefixes("box-shadow:none!important;");
			rules += this.addPrefixes("column-count:1!important;");
			rules += this.addPrefixes("column-count:none!important;");
			rules += this.addPrefixes("column-gap:0!important;");
			rules += this.addPrefixes("column-span:all!important;");
			rules += this.addPrefixes("text-shadow:none!important;");
			rules += this.addPrefixes("transform:none!important;");
			rules += this.addPrefixes("transition:none!important;");
			// TODO: background-clip, background-origin, background-size?, animation
			rules += '}';
			
			appendStyle.innerText = rules;

	    document.body.appendChild(appendStyle);

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
		
		emptyRules: function() {
			/*
			# TODO: write function that detects certain CSS3 rules and emptys out the rule to override
			# e.g., rgba(0,0,0,0.4) can be overriden by rgba()
			# 
			# @rules = linear-gradient, multiplebg images, rgb, rgba, hsl, hsla, mediaqueries, background-size?, @font-face?
			*/
		}
}
deCSS3.init();