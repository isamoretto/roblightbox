#ROB Lightbox

A ideia é chegar a um lightbox bem flexível, que atenda tanto galeria de imagens como html para alertas,
ou até conteúdos carregados via ajax.

Demo: http://rafaelortegabueno.com/roblightbox/

Obs: Testado no Firefox, Chrome e IE9. No IE8 e IE7 também funcionam normalmente, porém sem o borderRadius, boxShadow.

##Como usar:
* Faça a chamada para o framework jQuery para seu projeto.
* Faça a chamada para o plugin roblightbox para seu projeto.
* Crie quantos botões quiser na página que conterá a função de abrir o lightbox.
<br>
<pre><code>
&lt;div class="lightbox" title="Exemplo"&gt;
  	&lt;div style="text-align:center;width:400px;height:200px;background:white;padding:5px"&gt;
				&lt;h2&gt;ROB Lightbox &lt;/h2&gt;
				&lt;p&gt;Conteúdo do lightbox.&lt;/p&gt;
		&lt;/div&gt;
&lt;/div&gt;
</code></pre>
O atributo title na div se tornará o label do botão em questão.
É importante especificar o width da div do conteúdo, como o exemplo acima, para centralizações. Dentro dessa div,
coloque todo conteúdo que deseja exibir no lightbox.

* Chame a função da seguinte forma:
<pre>
  <code>
    $(document).ready(function(){
        $('.lightbox').robLightbox();
    });
  </code>
</pre>
Dessa forma funcionará o lightbox da maneira mais simples. É possível configurar algumas coisas:
<pre>
  <code>
    $(document).ready(function(){
        $('.lightbox').robLightbox({


            //Não existe ainda essa funcionalidade.
            galeria:false,


            //Não existe ainda essa funcionalidade.
      			ajax:false,
            
            
            //Cor do background da div que fica por cima do site.
    				backgroundBoxColor:'black',
            
            
            //Porcentagem alfa para o background.
    				backgroundAlfa:50,
            
            
            //Velocidade dos fades.
    				speed:250,
            
            
            //Padding para se usar na moldura do lightbox, podendo ser usado da mesma maneira do css, 
            //com um ou mais valores. Ex: padding:'5px 5px 30px 5px'
    				padding:'5px',
            
            
            //Basta colocar um valor para o borderradios, caso queira. Ex: borderRadius:10px
    				borderRadius:'10px',
            
            
            //Background-color da moldura.
    				molduraColor:'#aaa',
            
            
            //margin-top que a moldura irá aparecer.
    				marginTop:'100px',
            
            
            //Sombra, coloque apenas uma cor.
    				boxshadow:false,
            
            
            //Caso coloque apenas true, será criado um botão com um x, que poderá ser facilmente tratado no css.
            //Caso queira fazer algo personalizado, pode seguir o exemplo:
            // addBtFechar:{'html':'&lt;button&gt;&lt;span&gt;Fechar&lt;/span&gt;&lt;/button&gt;','position':'bottom left'}
    				addBtFechar:false,
            
            
            //Caso true, ao abrir o lightbox trancará o scroll do browser.
    				overflow:false
        });
    });
  </code>
</pre>


