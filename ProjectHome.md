## .stmpl(): simple template parser in jQuery ##
. jQuery itself has .tmpl(), which is deprecated, and jquery-ui is working on templating, which is in alpha. In the meanwhile this does something similar in just a few lines of code :,\

Example code:
```
	
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
```

The parser does the following replacements:
```
	{{key}} 				=> value
	{{##key##}}			=> value
	{{foo ##key## bar}}		=> foo value bar if the key exists
	{{##key1,key2##}}		=> val1,val2  seperated by comma
	{{##sep||key1,key2##}}	=> val1,val2  seperated by sep
```


  * a `{{pattern`}} can not contain a }
  * {{ and }} can be replaced with %%
  * a `%%pattern%%` can not contain a %