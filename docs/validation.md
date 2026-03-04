# Validation (JSON Schema)

SJF4J offers full support for [JSON Schema Draft 2020-12](https://json-schema.org/) ,
with verified compliance via [Bowtie](https://bowtie.report/#/implementations/java-sjf4j).  
In local Bowtie benchmarks against the official test suite,
SJF4J ranks among the fastest Java implementations.

Validation in SJF4J operates directly on OBNT,
no intermediate JSON serialization or AST conversion is required.

## Creating and Using `JsonSchema`
Example: validating with `type`
```java
JsonSchema schema = JsonSchema.fromJson("""
{
    "type": "number"
}
""");
schema.compile();

assertTrue(schema.isValid(1));
assertFalse(schema.isValid("a"));
```

Example: validating with `properties`
```java
JsonSchema schema = JsonSchema.fromJson("""
{
    "properties": {
        "name": {
            "type": "string", 
            "minLength": 5
        }
    }
}
""");
schema.compile();

Map<String, Object> map = Map.of("name", "Alice");
assertTrue(schema.isValid(map));                    // Map validated directly

MyPojo pojo = new MyPojo();
pojo.setName("Tom");
assertFalse(schema.isValid(pojo));                  // POJO validated directly
```


## Declarative Validation via `@ValidJsonSchema`

SJF4J enables declarative schema binding for domain classes.

Annotate a class with `@ValidJsonSchema`,
then validate instances using `SchemaValidator`.

```java
@ValidJsonSchema("""
{
    "type": "object",
    "required": ["id"],
    "properties": {
        "id":   { "type": "integer" },
        "user": { "format": "email" }
    }
}
""")
public class Order {
    public int id;
    public String user;
}
```

Validate it:
```java
SchemaValidator validator = new SchemaValidator();
ValidationResult result = validator.validate(new Order());

if (!result.isValid()) {
    result.getErrors().forEach(System.out::println);
}
```

### Schema References

Using reference via `ref`
```java
@ValidJsonSchema(ref = "domain.schema.json#User")            // $anchor
public class UserDto { ... }

@ValidJsonSchema(ref = "domain.schema.json#/$defs/User")     // JSON Pointer
public class UserDto2 { ... }

@ValidJsonSchema                                             // Convention-based lookup
public class UserDto3 { ... }
```

The default schema base path is 
```
classpath:///json-schemas/
```
It can be configured if necessary.

**Convention-Based Resolution**

If neither `value` nor `ref` is specified:
- find `<fully.qualified.ClassName>.schema.json`
- find `<SimpleName>.schema.json`

Supported schemes:
- `classpath:///`
- `file:///`

Network URLs (e.g. `https://`) are treated as identifiers unless explicitly enabled.


## JSON Schema and JSR 380 (Jakarta Validation)
[JSR 380 (Bean Validation or Jakarta Validation)](https://beanvalidation.org/2.0-jsr380/) focuses on:
- Annotation-based constraints
- Static invariants
- Compile-time domain rules

[JSON Schema](https://json-schema.org/) addresses a different layer:
- Runtime-configurable validation
- Conditional logic (`if` / `then` / `else`)
- Structural constraints
- Externalized contracts

Typical separation:
- **JSR 380** → Domain invariants
- **JSON Schema** → Runtime contracts and policies

They complement each other rather than overlap.

## High Performance
In local Bowtie draft 2020-12 benchmarks, 
SJF4J consistently ranks among the top-performing Java implementations in terms of throughput.

This performance is primarily due to its direct validation over native object graphs, avoiding:
- Re-serialization
- Re-parsing
- Intermediate tree construction


## Why Validation in OBNT

Most JSON tooling assumes:

> JSON text is primary. Objects are derived.

SJF4J treats structured data as primary:

> Objects are primary. JSON is a representation.

Since validation operates directly on OBNT:
- No AST conversion layer is introduced
- Works uniformly across all node kinds
- Shares semantics with `JsonPath` and `JsonPatch`
- Preserves declared vs dynamic `JOJO` fields

Validation is therefore a structural capability of OBNT,
not a separate JSON-processing pipeline.


