function enablePlantUML(host){
  $("code").each(function() {
    var code = $(this);
    var text = code.text();
    if (text.indexOf("@startuml") == 0) {
      $.ajax({
        type: "POST",
        url: host + "/text",
        data: text,
        crossDomain: true,
        dataType: "json"
      }).done(function(data) {
        if (data.ok) {
          var src = host + "/png/" + data.payload.hash;
          var img = '<img src="' + src + '"/>';
          code.closest(".highlighter-rouge").html(img);
        }
      });
    }
  });
}
