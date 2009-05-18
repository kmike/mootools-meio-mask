(function(){

	if(!window.console){
		window.console = {};
		if(window.opera){
			console.log = function(){
				opera.postError.call(this, arguments);
			};
		}
		else{
			console.log = function(){
				if(console.element){
					var html = [];
					Array.each(arguments, function(el){
						html.push('<span class="arg ' + $type(el) + '">' + el + '</span>');
					});
					console.element.set('html', '<p class="logged-entry">'+ html.join(', ') +'</p>' + console.element.get('html'))
				}
				else{
					var args = arguments;
					window.addEvent('domready', function(){
						$(document.body).grab(console.element = new Element('div', { id: 'meioconsole__' }));
						console.log.apply(this, args);
					});
				}
			};
		}
	}
	
	var tempoTime = 0, tempoAtual = null;
	console.time = function(){
		if( tempoTime%2 == 0 ){
			tempoAtual = $time();
		}
		else{
			console.log($time()-tempoAtual);
		}
		tempoTime++;
	};
	
})();