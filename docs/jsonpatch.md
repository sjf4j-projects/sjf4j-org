# JsonPatch

`JsonPatch` provides a complete and extensible implementation of [JSON Patch (RFC 6902)](https://datatracker.ietf.org/doc/html/rfc6902), enabling declarative, path-based modifications to the Object-Based Node Tree.

## Applying a Patch

```java
JsonObject before = JsonObject.fromJson("{\n" +
    "  \"name\": \"Bob\",\n" +
    "  \"scores\": [90, 95, 98],\n" +
    "  \"active\": true\n" +
    "}");

JsonPatch patch1 = JsonPatch.fromJson("[\n" +
    "  { \"op\": \"add\",     \"path\": \"/scores/-\", \"value\": 100 },\n" +
    "  { \"op\": \"replace\", \"path\": \"/name\",     \"value\": \"Alice\" },\n" +
    "  { \"op\": \"remove\",  \"path\": \"/active\" }\n" +
    "]");

before.apply(patch1);

JsonObject after = JsonObject.fromJson("{\"name\":\"Alice\",\"scores\":[90,95,98,100]}");
assertEquals(after, before);
```

## State Restoration via `diff()` and `apply()`

```java
List<Integer> source = new ArrayList<>(Arrays.asList(1, 2, 3));
List<Integer> target = new ArrayList<>(Arrays.asList(1, 5, 3, 4));

JsonPatch patch = JsonPatch.diff(source, target);
patch.apply(source);
assertEquals(target, source);
```

## Patch Operations

| Operation | Spec | Description |
|---|---|---|
| `add` | RFC 6902 | Adds a value at the target path |
| `remove` | RFC 6902 | Removes the value at the target path |
| `replace` | RFC 6902 | Replaces the value at the target path (must already exist) |
| `move` | RFC 6902 | Moves a value from one path to another |
| `copy` | RFC 6902 | Copies a value from one path to another |
| `test` | RFC 6902 | Tests whether the value at the path equals the expected value |
| `exist` | SJF4J | Asserts that the target path exists |
| `ensurePut` | SJF4J | Ensures the path exists and inserts the value, creating intermediate nodes if necessary |

## Extensibility

```java
// Extend or override patch operations via PatchOpRegistry
PatchOpRegistry.register("add", (target, op) -> {
    op.getPath().add(target, op.getValue());    // Replace with custom logic
});
```

## JSON Merge Patch (RFC 7386)

SJF4J also supports [JSON Merge Patch (RFC 7386)](https://datatracker.ietf.org/doc/html/rfc7386) for partial updates:

| Method | Description |
|---|---|
| `mergeRfc7386(Object mergePatch)` | RFC 7386 semantics: patch values replace target; `null` fields are removed; nested objects merged recursively; arrays replaced as a whole. |
| `merge(Object mergePatch, boolean overwrite, boolean deepCopy)` | Flexible merge: `overwrite` controls whether existing values are replaced; `deepCopy` controls deep vs. reference copy; `null` patch values are no-ops; arrays merged recursively. |
