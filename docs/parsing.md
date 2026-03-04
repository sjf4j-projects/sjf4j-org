# Parsing (Codec)

`Sjf4j` provides a unified set of entry-point APIs,
allowing data to move consistently between:

- JSON / YAML / Properties
- Raw nodes (Map, List, String, Number, Boolean, null)
- Typed nodes (POJO, JOJO, JAJO)
- OBNT representations

## Conversion APIs

### `fromJson()` / `toJson()`
From JSON
```java
Object node = Sjf4j.fromJson(json);
// Default: parsed into raw nodes (Map/List/String/Number/Boolean/null)

JsonObject jo = Sjf4j.fromJson(json, JsonObject.class);
// Parsed as JsonObject, equivalent to `JsonObject.fromJson(json)`

User user = Sjf4j.fromJson(json, User.class);
// Parsed into POJO or JOJO

Map<String, Object> map =
        Sjf4j.fromJson(json, new TypeReference<Map<String, Object>>() {});
// Supports deep generics via TypeReference
```
To JSON
```java
String json = Sjf4j.toJsonString(node);

byte[] bytes = Sjf4j.toJsonBytes(node);

Sjf4j.toJson(out, node);
```


### `fromYaml()` / `toYaml()`
Semantically identical to JSON conversion.
```java
Object node = Sjf4j.fromYaml(yaml);

String yaml2 = Sjf4j.toYamlString(node);
```

### `fromProperties()` / `toProperties()`
Converts between hierarchical data and flat property structures.
```java
Object node = Sjf4j.fromProperties(properties);

Properties properties2 = Sjf4j.toProperties(node);
// {"aa":{"bb":[{"cc":"dd"}]}} → aa.bb[0].cc=dd
```

### `fromNode()` / `deepNode()`
- `fromNode()` converts one OBNT representation into another.
- `deepNode()` performs a full deep copy.
```java
User user = Sjf4j.fromNode(node, User.class);
// Conversion between node types

User user2 = Sjf4j.deepNode(user);
// Produces a fully detached copy
```

## Custom Node Type
SJF4J allows custom Java types to participate in OBNT.

- For JSON Object → use `POJO` / `JOJO`
- For JSON Array → use `JAJO`
- For JSON Value → use `NodeValue`

### Using `NodeValue`
**Annotate with `@NodeValue`**
```java
@NodeValue    
public static class BigDay {
    private final LocalDate localDate;
    
    public BigDay(LocalDate localDate) {
        this.localDate = localDate;
    }

    @ValueToRaw
    public String valueToRaw() {
        return localDate.toString();
    }

    @RawToValue
    public static BigDay rawToValue(String raw) {
        return new BigDay(LocalDate.parse(raw));
    }

    @ValueCopy
    public BigDay valueCopy() {
        return new BigDay(localDate);
    }
}
```

The type can then be used directly without explicit registration:
```java
BigDay day = Sjf4j.fromJson("\"2026-01-01\"", BigDay.class);
assertEquals("\"2026-01-01\"", Sjf4j.toJson(day));
```

**Or register a `ValueCodec`**  
For third-party or JDK types:
```java
NodeRegistry.registerValueCodec(new ValueCodec<LocalDate, String>() {
    @Override
    public Class<LocalDate> valueClass() {
        return LocalDate.class;
    }

    @Override
    public Class<String> rawClass() {
        return String.class;
    }
    
    @Override
    public String valueToRaw(LocalDate node) {
        return node.toString();
    }

    @Override
    public LocalDate rawToValue(String raw) {
        return raw == null ? null : LocalDate.parse(raw);
    }
});
```

### Using `@OneOf`

`@OneOf` enables multi-type binding at the schema level,
allowing structured data to map to multiple candidate types.

> Note: `@OneOf` is planned but not yet implemented :)
