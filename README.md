## Build
```
cd plantuml-server
docker build -t plantuml-server .
```

## Run
```
docker run -p 9900:8182 plantuml-server
```

## Client Script Example

Please modify dist/plantuml.js to meet your own requirement.

```
<script src="/dist/plantuml.js"></script>

<script type="text/javascript">
$(document).ready(function() {
  enablePlantUML('{{ site.plantuml_host }}');
});
</script>

```
