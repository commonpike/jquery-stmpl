/*
	jQuery simple template vs1.1 201206*pike
	
	Example code:
	
			
			<div id="template">
					<h2>
							{{title}}<br/> 
							{{##creators,type,guidate##}}
					</h2> 
					{{<small>##participants##</small>}}
					{{<p>##<br/>||short,description##</p>}}
					{{<small>keywords: ##keywords##</small>}} 
			</div>
			<div id="output">
					<!-- output here -->
			</div>
					
			<script type='text-javascript'>
					var data = {
							title	: 'test',
							short	: 'just a test'
					}
					$('#template').stmpl(data).appendTo($('#output'));
			</script>
			
			
	The parser does the following replacements:
	
			{{key}}							=> value
			{{##key##}}						=> value
			{{foo ##key## bar}}				=> foo value bar if the key exists
			{{##key1,key2##}}				=> val1,val2  seperated by comma
			{{##sep||key1,key2##}}	=> val1,val2  seperated by sep
	
	
	a {{pattern}} can not contain a }
	{{ and }} can be replaced with %%
	a %%pattern%% can not contain a %
	
	
*/

jQuery.fn.stmpl = function(data) {
	return $(this).html().replace(/{{([^}]+)}}/gi, function(fullmatch,$0) {
		return jQuery.stmplParse(data,fullmatch,$0);
	}).replace(/%%([^%]+)%%/gi, function(fullmatch,$0) {
		return jQuery.stmplParse(data,fullmatch,$0);
	});
}

jQuery.stmplParse = function(data,fullmatch,$0) { 
	var debug=false;
	var match=$0;
	if (data[match]) {
		if (debug) console.log('full match '+match);
		return data[match];
	} else {
		var line = match;
		if (debug) console.log('line match '+line);
		var parsedline = line.replace(/##([^#]+)##/gi, function(fullmatch,$1) { 
			var subsep = ", ";
			if ($1.split('||').length>1) {
				var specs = $1.split('||');
				subsep = specs[0]; submatch=specs[1];
			} else submatch=$1;
			if (data[submatch]) {
				if (debug) console.log('full submatch '+submatch);
				return data[submatch];
			} else if (submatch.split(',').length>1) {
				if (debug) console.log('list submatch '+submatch);
				var results=[];
				$.each(submatch.split(','),function(idx,val) {
					if (data[val]) results.push(data[val]);
				});
				return results.join(subsep);
			} else {
				if (debug) console.log('no submatch ');
				return fullmatch;
			}
		});
		if (line!=parsedline) {
			if (debug) console.log('parsed line '+parsedline);
			return parsedline;
		} else {
			if (debug) console.log('no matches - zapping line ');
			return '';
		}
	}
}