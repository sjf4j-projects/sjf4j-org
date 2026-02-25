# Basic Operations

## JsonObject

`JsonObject` is the primary entry point for interacting with the Object-Based Node Tree. Its APIs are designed to align with JSON semantics — for example, `hasNonNull()` for not-null vs `containsKey()` for missing.

### Basic Access and Mutation Methods

| Class | Method | Description |
|---|---|---|
| JsonObject | `getNode(key)` | Returns the raw underlying node as an `Object`, without any type conversion or adaptation. |
| | `get(key, type)` `getLong(key)` … | `getXxx` performs **type-safe access** with minimal adaptation when necessary (e.g. `Double` → `Float`, `Integer` → `Long`). |
| | `getAs(key, type)` `getAsLong(key)` … | `getAsXxx` performs **cross-type conversion**, including semantic conversions (e.g. `String` → `Number`, `Boolean` → `String`). |
| | `put(key, value)` `remove(key)` … | Mutation operations: insert, replace, and remove. |
| | `toBuilder().put(..).put()` | Builder-style API supporting fluent, chained operations. |

### Examples

```java
String json = "{\n" +
        "  \"id\": 1,\n" +
        "  \"name\": \"Alice\",\n" +
        "  \"active\": true,\n" +
        "  \"tags\": [\"java\", \"json\"],\n" +
        "  \"scores\": [95, 88.8, 0.5],\n" +
        "  \"user\": {\n" +
        "    \"role\": \"coder\",\n" +
        "    \"profile\": {\n" +
        "      \"level\": 7,\n" +
        "      \"values\": [1, \"two\", true, null, { \"x\": 3 }]\n" +
        "    }\n" +
        "  }\n" +
        "}";

JsonObject jo = JsonObject.fromJson(json);
// Parse JSON string to JsonObject

Object node = jo.getNode("id");
// Retrieve the raw node as an Object without type conversion.
// Return null if the key is missing.

Integer id = jo.getInteger("id");
// Retrieve the node as a specific type using getXxx(key).
// Performs numeric conversion within the Number hierarchy if necessary.

double id2 = jo.getDouble("id", 0d);
// Returns the node value, or the default if the property is null or missing.

String name = jo.get("name", String.class);
// Retrieve the node with an explicit type parameter.

String name1 = jo.get("name");
// Dynamic type inference — type is inferred from context.

String active = jo.getAsString("active");
// Retrieve and convert the node value across types (Boolean → String).

String active2 = jo.getAs("active");
// Dynamic type conversion, short form of getAs(key, type).

String role = jo.getJsonObject("user").get("role");
// Chain operations for nested nodes.

jo.put("extra", "blabla");
// See also: putNonNull(), putIfAbsent(), computeIfAbsent()

jo.toBuilder().putIfAbsent("x", "xx").put("y", "yy");
// Builder-style chained operations.

jo.remove("extra");
// See also: removeIf(), forEach() etc.
```

::: tip
`JsonArray` represents JSON Array nodes. It follows the same API philosophy as `JsonObject` — JSON-semantic access, mutation, and type conversion — but applies them to ordered array elements rather than object properties.
:::

## NodeStream

Beyond path-based access with `JsonPath`, SJF4J provides a programmatic, declarative traversal and stream-based processing model via `NodeStream`.

### Stream-Based Selection and Filtering

```java
List<String> tags = jo.stream()
        .findByPath("$.tags[*]", String.class)      // Path-based selection
        .filter(tag -> tag.length() > 3)            // Programmatic filtering
        .toList();
```

### Multi-Stage Evaluation

```java
int x = jo.stream()
        .findAsByPath("$..profile", JsonObject.class)   // Primary findAsByPath()
        .filter(n -> n.hasNonNull("values"))
        .getAsByPath("$..x", Integer.class)             // Secondary asByPath()
        .findFirst()
        .orElse(4);
```

### Aggregation and Computation

```java
double avgScore = jo.stream()
        .find("$.scores[*]", Double.class)
        .map(d -> d < 60 ? 60 : d)                      // Custom normalization
        .collect(Collectors.averagingDouble(s -> s));
```

### Depth-First Traversal with `walk()`

```java
jo.walk(
        Target.CONTAINER,       // Target: CONTAINER or VALUE
        Order.BOTTOM_UP,        // Order:  BOTTOM_UP (leaf-to-root) or TOP_DOWN (root-to-leaf)
        (path, node) -> {
            System.out.println("path=" + path + ", node=" + node);
            return Control.CONTINUE;
            // CONTINUE to proceed, or STOP to terminate traversal
        });
```
