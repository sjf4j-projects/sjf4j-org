# JsonSchema

SJF4J offers [full compliance](https://bowtie.report/#/implementations/java-sjf4j) with [JSON Schema Draft 2020-12](https://json-schema.org/) and goes beyond raw JSON validation. It performs native, high-performance validation for POJOs, JOJOs, Maps, Lists, and any Java object model — without intermediate conversions.

## Basic Validation

```java
JsonSchema schema = JsonSchema.fromJson("{ \"type\": \"number\" }");
schema.compile();
// Prepares the schema for validation

assertTrue(schema.isValid(1));

ValidationResult result = schema.validate("a");
assertFalse(result.isValid());
assertEquals("type", result.getLastMessage().getKeyword());
```

## Object Validation with `properties`

```java
JsonSchema schema = JsonSchema.fromJson("{\n" +
        "  \"type\": \"object\",\n" +
        "  \"properties\": {\n" +
        "    \"name\": {\"type\": \"string\", \"minLength\": 5}\n" +
        "  }\n" +
        "}");

Map<String, Object> map = Map.of("name", "Alice");
assertTrue(schema.isValid(map));        // Map validated directly

MyPojo pojo = new MyPojo();
pojo.setName("Tom");
assertFalse(schema.isValid(pojo));      // POJO validated directly
```

## Validating POJOs with `@ValidJsonSchema`

```java
@ValidJsonSchema("""
{
    "type": "object",
    "required": ["id"],
    "properties": {
        "id": { "type": "integer" },
        "user": { "format": "email" }
    }
}
""")
public class Order {
    public int id;
    public String user;
}
```

## Binding via `ref`

```java
@ValidJsonSchema(ref = "domain.schema.json#User")           // $anchor
public class UserDto { ... }

@ValidJsonSchema(ref = "domain.schema.json#/$defs/User")    // JSON Pointer
public class UserDto2 { ... }

@ValidJsonSchema                    // Convention-based: UserDto3.schema.json
public class UserDto3 { ... }
```

## Schema Location Rules

- Default base directory: `classpath:///json-schemas/`
- If no `value` or `ref` is provided, SJF4J tries `<fully.qualified.ClassName>.schema.json` then `<SimpleName>.schema.json`
- Supported `ref` schemes: `classpath:///`, `file:///`
- Network schemes (e.g. `https://`) are not loaded, unless used purely as `$id` identifiers

## SchemaValidator Usage

```java
SchemaValidator validator = new SchemaValidator();
ValidationResult result = validator.validate(new UserDto());
```
