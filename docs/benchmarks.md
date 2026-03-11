# Benchmarks

All benchmarks are reproducible and implemented using **JMH (Java Microbenchmark Harness)**.

## Read / Write Benchmark
This benchmark measures the additional structural overhead introduced by SJF4J on top of native JSON libraries.

SJF4J performs encoding and decoding on top of the underlying JSON parsers.  
It adds structural capabilities to the OBNT model, such as `JOJO`, `@NodeValue`, and `@AnyOf`,
while attempting to minimize additional overhead.

To bridge different JSON libraries, SJF4J provides three streaming integration modes:

- **SHARED_IO** — reuse the parser’s shared IO pipeline
- **EXCLUSIVE_IO** — delegate exclusive streaming control to the underlying library
- **PLUGIN_MODULE** — integrate through a dedicated module implementation

Performance characteristics vary depending on the backend and workload,
and no single mode is universally optimal.

Sample JSON (~1 KB) with nested objects and arrays. Source: [ReadBenchmark.java](https://github.com/sjf4j-projects/sjf4j/blob/main/sjf4j/src/jmh/java/org/sjf4j/ReadBenchmark.java)

```text
Benchmark                                    (streamingMode)  Mode  Cnt   Score   Error  Units
ReadBenchmark.json_fastjson2_native_has_any              N/A  avgt   10   2.098 ± 0.021  us/op  baseline
ReadBenchmark.json_fastjson2_facade_jojo           SHARED_IO  avgt   10   2.478 ± 0.039  us/op
ReadBenchmark.json_fastjson2_facade_jojo        EXCLUSIVE_IO  avgt   10   2.363 ± 0.035  us/op  !1.12x slower 
ReadBenchmark.json_fastjson2_facade_jojo       PLUGIN_MODULE  avgt   10   2.366 ± 0.196  us/op

ReadBenchmark.json_fastjson2_native_pojo                 N/A  avgt   10   0.797 ± 0.010  us/op  baseline
ReadBenchmark.json_fastjson2_facade_pojo           SHARED_IO  avgt   10   1.471 ± 0.060  us/op
ReadBenchmark.json_fastjson2_facade_pojo        EXCLUSIVE_IO  avgt   10   1.229 ± 0.016  us/op  !1.53x slower
ReadBenchmark.json_fastjson2_facade_pojo       PLUGIN_MODULE  avgt   10   2.109 ± 0.040  us/op

ReadBenchmark.json_gson_native_pojo                      N/A  avgt   10   2.465 ± 0.016  us/op  baseline
ReadBenchmark.json_gson_facade_pojo                SHARED_IO  avgt   10   2.566 ± 0.042  us/op
ReadBenchmark.json_gson_facade_pojo             EXCLUSIVE_IO  avgt   10   2.435 ± 0.030  us/op  !0.98x faster
ReadBenchmark.json_gson_facade_pojo            PLUGIN_MODULE  avgt   10   2.455 ± 0.038  us/op

ReadBenchmark.json_jackson_native_has_any                N/A  avgt   10   3.008 ± 0.036  us/op  baseline
ReadBenchmark.json_jackson_facade_jojo             SHARED_IO  avgt   10   3.217 ± 0.038  us/op
ReadBenchmark.json_jackson_facade_jojo          EXCLUSIVE_IO  avgt   10   2.869 ± 0.049  us/op  !0.95x faster
ReadBenchmark.json_jackson_facade_jojo         PLUGIN_MODULE  avgt   10   3.097 ± 0.029  us/op  !1.03x slower

ReadBenchmark.json_jackson_native_pojo                   N/A  avgt   10   1.595 ± 0.010  us/op  baseline
ReadBenchmark.json_jackson_facade_pojo             SHARED_IO  avgt   10   2.262 ± 0.015  us/op
ReadBenchmark.json_jackson_facade_pojo          EXCLUSIVE_IO  avgt   10   2.102 ± 0.019  us/op
ReadBenchmark.json_jackson_facade_pojo         PLUGIN_MODULE  avgt   10   1.614 ± 0.034  us/op  !1.01x slower

ReadBenchmark.json_jsonp_facade_jojo               SHARED_IO  avgt   10   4.653 ± 0.005  us/op
ReadBenchmark.json_jsonp_facade_pojo               SHARED_IO  avgt   10   3.216 ± 0.029  us/op

ReadBenchmark.json_simple_facade_jojo                    N/A  avgt   10   8.265 ± 0.117  us/op
ReadBenchmark.json_simple_facade_jojo                    N/A  avgt   10   7.529 ± 0.054  us/op

```

**Summary**

- **Jackson** — Default `PLUGIN_MODULE`, SJF4J achieves **near-parity performance** with native Jackson.  
  When parsing JOJO models, SJF4J can even be slightly faster.


- **Gson** — Default `EXCLUSIVE_IO`, SJF4J performs **slightly faster** than the native Gson.   
  It also supports dynamic properties that Gson’s native POJO binding does not support.


- **Fastjson2** — Default `EXCLUSIVE_IO`, SJF4J introduces about **10–50% overhead** compared to native Fastjson2.  
  Despite this overhead, Fastjson2 remains among the fastest JSON parsers overall.


- **Absolute performance** (approx.): Fastjson2 > Jackson > Gson > JSON-P (Parsson) > Simple (built-in)


> Note: Regardless of the underlying JSON parser, SJF4J ensures consistent behavior at the API level.
> If you observe any inconsistencies, please report a bug.

## Reflection Benchmark

SJF4J's OBNT relies on reflection for flexible access to POJO/JOJO/JAJO. Source: [ReflectionBenchmark.java](https://github.com/sjf4j-projects/sjf4j/blob/main/sjf4j/src/jmh/java/org/sjf4j/ReflectionBenchmark.java).

```text
Benchmark                                            Mode  Cnt  Score    Error  Units
ReflectionBenchmark.reflection_ctor_lambda           avgt    5  0.007 ±  0.001  us/op
ReflectionBenchmark.reflection_ctor_methodHandler    avgt    5  0.008 ±  0.001  us/op
ReflectionBenchmark.reflection_ctor_native           avgt    5  0.007 ±  0.001  us/op
ReflectionBenchmark.reflection_getter_lambda         avgt    5  0.005 ±  0.001  us/op
ReflectionBenchmark.reflection_getter_methodHandler  avgt    5  0.008 ±  0.001  us/op
ReflectionBenchmark.reflection_getter_native         avgt    5  0.005 ±  0.001  us/op
ReflectionBenchmark.reflection_setter_lambda         avgt    5  0.007 ±  0.001  us/op
ReflectionBenchmark.reflection_setter_methodHandler  avgt    5  0.009 ±  0.001  us/op
ReflectionBenchmark.reflection_setter_native         avgt    5  0.007 ±  0.001  us/op
```

**Summary**:  
- SJF4J uses **lambda-based** accessors to minimize reflection overhead,
    enabling dynamic object manipulation with **near-native performance**.


## JSON Schema Validation Benchmark

According to the official JSON Schema [Bowtie](https://bowtie.report/) benchmark, 
performance can be evaluated locally using:
```shell
bowtie perf -i java-sjf4j -i java-json-schema -i java-networknt-json-schema-validator -D draft2020-12
```
Ran result (at 2026.03.11):
```text
│                                        Tests with Draft2020-12_MetaSchema                                        │
│                                                                                                                  │
│     Test Name                java-sjf4j     java-json-schema            java-networknt-json-schema-validator     │
│    ──────────────────────────────────────────────────────────────────────────────────────────────────────────    │
│     Validating metaschema    35ms +- 2ms    74ms +- 5ms: 2.13x slower   74ms +- 3ms: 2.15x slower                │
│                              Reference      2.13x slower                2.15x slower                             │
│                                                                                                                  │
│                                                                                                                  │
│                                        Tests with OpenAPI_Spec_Schema                                            │
│                                                                                                                  │
│     Test Name                  java-sjf4j     java-networknt-json-schema-validator   java-json-schema            │
│    ──────────────────────────────────────────────────────────────────────────────────────────────────────────    │
│     Non-OAuth Scopes Example   52ms +- 4ms    76ms +- 4ms: 1.46x slower              98ms +- 6ms: 1.87x slower   │
│     Webhook Example            55ms +- 3ms    70ms +- 2ms: 1.28x slower              93ms +- 4ms: 1.7x slower    │
│                                Reference      1.37x slower                           1.78x slower                │
│                                                                                                                  │
│                                        Tests with useless_keywords                                               │
│                                                                                                                  │
│     Test Name             java-sjf4j       java-networknt-json-schema-validator   java-json-schema               │
│    ──────────────────────────────────────────────────────────────────────────────────────────────────────────    │
│     Beginning of schema   399ms +- 10ms    521ms +- 21ms: 1.31x slower            569ms +- 11ms: 1.43x slower    │
│     Middle of schema      390ms +- 5ms     520ms +- 12ms: 1.33x slower            564ms +- 6ms: 1.45x slower     │
│     End of schema         411ms +- 14ms    538ms +- 16ms: 1.31x slower            586ms +- 14ms: 1.42x slower    │
│     Valid                 396ms +- 10ms    525ms +- 19ms: 1.33x slower            585ms +- 15ms: 1.48x slower    │
│                           Reference        1.32x slower                           1.44x slower                   │
│                                                                                                                  │
│                                        Tests with nested_schemas                                                 │
│                                                                                                                  │
│     Test Name         java-sjf4j       java-json-schema            java-networknt-json-schema-validator          │
│    ──────────────────────────────────────────────────────────────────────────────────────────────────────────    │
│     No of Levels 1    31ms +- 850us    69ms +- 4ms: 2.25x slower   70ms +- 2ms: 2.26x slower                     │
│     No of Levels 4    29ms +- 2ms      72ms +- 3ms: 2.46x slower   73ms +- 3ms: 2.5x slower                      │
│     No of Levels 7    31ms +- 535us    71ms +- 3ms: 2.27x slower   74ms +- 2ms: 2.36x slower                     │
│     No of Levels 10   32ms +- 1ms      75ms +- 4ms: 2.37x slower   75ms +- 3ms: 2.36x slower                     │
│                       Reference        2.34x slower                2.37x slower                                  │
```
**Summary**:  
- In Bowtie’s draft 2020-12 benchmark, SJF4J delivers **high performance** 
  and consistently ranks among the top-tier of Java implementations.


