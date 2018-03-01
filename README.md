## Client Script Example

```
<script type="text/javascript">
    $(document).ready(function() {
      $("code").each(function() {
        var code = $(this);
        var text = code.text();
        if(text.indexOf('@startuml')==0){
          $.ajax({
            type: "POST",
            url: '{{ site.plantuml_host }}/text',
            data: text,
            crossDomain: true,
            dataType: 'json'
          }).done(function( data ) {
            if(data.ok){
              var src = "{{ site.plantuml_host }}/png/"+data.payload.hash;
              var img = "<img src=\""+src+"\"/>";
              code.closest(".highlighter-rouge").html(img);
            }
          });;
        }
      });
    });
</script>
```