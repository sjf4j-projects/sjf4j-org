# JsonPath & JsonPointer

## JsonPath

`JsonPath` fully supports the [JSON Path (RFC 9535)](https://datatracker.ietf.org/doc/html/rfc9535) and [JSON Pointer (RFC 6901)](https://datatracker.ietf.org/doc/html/rfc6901) specifications.

### Path-Based Methods

| Class | Methods | Description |
|---|---|---|
| JsonPath | `JsonPath.compile(path)` | Compiles a JSON Path or JSON Pointer expression into a **reusable** `JsonPath` instance. |
| | `getXxx()` … `getAsXxx()` … | Returns a **single matched node**. Returns `null` if no nodes found. |
| | `find(node)` `findAs(node, type)` | Returns a **list of matched nodes**. Returns an **empty list** if no nodes matched. |
| | `eval(node)` `evalAs(node, type)` | Returns a flexible result: a single node, a list, a function result, or `null`. |
| | `add(node, value)` `replace(node, value)` `remove(node)` | Applies mutation operations at the path location, following JSON Patch–style semantics. |
| | `ensurePut(node, value)` | Ensures the path exists and inserts the value, **creating intermediate nodes if necessary**. |
| JsonObject / JsonArray | `getByPath(path)` … `findByPath(path)` … `evalByPath(path)` … | One-shot path evaluation APIs that compile and execute the path against the current container. |
| | `addByPath(path, value)` `removeByPath(path)` … | One-shot path-based mutation APIs applied directly to the current container. |

### Examples

```java
JsonPath path = JsonPath.compile("$.user.role");
Object role2 = path.getNode(jo);
// Compiles the JSONPath expression into a reusable JsonPath instance.

String role3 = jo.getStringByPath("/user/role");
// Uses a JSON Pointer expression via a one-shot path API.

String role4 = jo.getAsByPath("$..role");
// Uses the descendant operator (..) for deep traversal.

List<String> tags = jo.findByPath("$.tags[*]", String.class);
// Wildcard (*) matches all array elements; find() always returns a list.

List<Short> scores = jo.findAsByPath("$.scores[0:3]", Short.class);
// Array slicing ([start:end:step]).

List<Object> unions = jo.findByPath("$.user['role','profile']");
// Union expression to select multiple object members.

int count = JsonPath.compile("$.scores.count()").eval(jo, int.class);
// Calls the count() function at the end of the path.

jo.addByPath("$.aa", "bb");
// Adds a new property at the specified path.

jo.ensurePutNonNullByPath("$.cc.dd[0]", 100);
// Ensures the full path exists; creates intermediate objects/arrays.
// Result: {..., "cc": {"dd": [100]}}

JsonPointer.compile("/scores/2").remove(jo);
// Removes an array element using JsonPointer.
```

### JSON Path Syntax

| Syntax | Description | Example |
|---|---|---|
| `$` | Root object | `$.name` |
| `@` | Current node (only in filter context) | `@.name` |
| `.name`, `['name']` | Object member name | `$['store'].book` |
| `[index]` | Array index (0-based; negative from end) | `$.store['book'][0]` |
| `.*`, `[*]` | Wildcard (all children) | `$.store[*]` |
| `..` | Recursive descent | `$..author` |
| `[start:end]`, `[start:end:step]` | Array slice (end exclusive) | `$.*.book[1:3]` |
| `[index1, index2]`, `['name1', 'name2']` | Union of indices or members | `$.store.book[0, -1]` |
| `[?(<filter>)]` | Filter expression | `$..book[?@.price < 10]` |
| `func()` | Function call | `$..book.size()` |

### Filter Expressions

| Syntax | Description | Example |
|---|---|---|
| `@`, `$` | Path expression (automatically evaluated) | `$.orders[?(@.amount > $.config.minAmount)]` |
| `==`, `!=` | Equality / inequality | `@.category == 'fiction'` |
| `<`, `<=`, `>`, `>=` | Numeric comparison | `@.price >= 20` |
| `&&`, `\|\|`, `!`, `()` | Logical operators and grouping | `@.author != null \|\| !@.isbn` |
| `=~` | Full regular expression match | `@.author =~ /.*lice/i` |

### Filter Functions

| Function | Description | Example |
|---|---|---|
| `length()` | Length of a string, array, or object | `$[?length(@.authors) >= 5]` |
| `count()` | Number of nodes in a nodelist | `$[?count(@.*.author) >= 5]` |
| `match()` | Tests whether a string matches an I-Regexp (RFC 9485) | `$[?match(@.date, "1974-05-..")]` |
| `search()` | Tests whether a string contains a substring that `match()`es | `$[?search(@.author, "[BR]ob")]` |
| `value()` | Convert a NodesType instance to a value | `$[?value(@..color) == "red"]` |
| `sum()`, `min()`, `max()`, `avg()`, `stddev()` | Numeric aggregation functions | `$[?sum(@.price) < 20]` |
| `first()`, `last()`, `index()` | First, last, or indexed element | `$[?first(@.title) =~ /^J/]` |

### Extensibility

JSON Path can be extended with custom functions via `FunctionRegistry.register()`:

```java
FunctionRegistry.register(new FunctionRegistry.FunctionDescriptor("hi", args -> {
    return "hi, " + Arrays.toString(args);
}));
String hi = JsonObject.fromJson("{\"aa\":\"bb\"}").evalByPath("$.hi()", String.class);
assertEquals("hi, [J{aa=bb}]", hi);
```

## JSON Pointer

JSON Pointer paths always start with `/` and only support direct navigation (no wildcards or filters).

### JSON Pointer Syntax

| Syntax | Description | Example |
|---|---|---|
| `/` | Root separator | `/` (root) |
| `/name` | Object member access | `/store/book` |
| `/0` | Array index (0-based) | `/store/book/0` |
| `~0` | Escape for `~` character | `/a~0b` |
| `~1` | Escape for `/` character | `/a~1b` |

::: info
`JsonPointer` is a specialized subclass of `JsonPath`. It behaves identically, except that it only accepts JSON Pointer expressions.
:::
