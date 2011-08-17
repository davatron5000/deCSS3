var deCSS3 = {
		
		init: function(){
			this.addStyleBlock();
      this.emptyRules();
		},
	
		addStyleBlock: function(){
	    var appendStyle = document.createElement('style');
			var rules = '* {';
			rules += this.addPrefixes("text-shadow:none!important;");
			rules += this.addPrefixes("box-shadow:none!important;");
			rules += this.addPrefixes("border-radius:0!important;");
			rules += '}';
			
			appendStyle.innerText = rules;

	    document.body.appendChild(appendStyle);

		},
		
		addPrefixes: function(rule) {
			var prefixes = ['-webkit-','-moz-','-o-','-ms-','-khtml-'];
			var prefixedRule = "";
			prefixes.forEach(function(i){
				prefixedRule += i + rule;
			});
			prefixedRule += rule;
			return prefixedRule;
		},
		
		emptyRules: function() {
			/*
			# TODO: write function that detects certain CSS3 rules and emptys out the rule to override
			# e.g., rgba(0,0,0,0.4) can be overriden by rgba()
			# 
			# @rules = linear-gradient, multiplebg images, rgb, rgba, hsl, hsla, mediaqueries ;
			*/
		}
		
}
