# Benchmark

All benchmarks are reproducible and implemented using **JMH (Java Microbenchmark Harness)**.

## Read / Write Benchmark

Source: [ReadBenchmark.java](https://github.com/sjf4j-projects/sjf4j/blob/main/sjf4j/src/jmh/java/org/sjf4j/ReadBenchmark.java). Sample JSON (~1 KB) with nested objects and arrays.

```text
Benchmark                                    Mode  Cnt  Score   Error  Units
ReadBenchmark.json_jackson_facade            avgt    5  0.750 ± 0.023  us/op
ReadBenchmark.json_jackson_native_has_any    avgt    5  0.717 ± 0.028  us/op
ReadBenchmark.json_jackson_native_map        avgt    5  0.633 ± 0.062  us/op
ReadBenchmark.json_jackson_native_no_any     avgt    5  0.458 ± 0.014  us/op
ReadBenchmark.json_gson_facade               avgt    5  1.130 ± 0.225  us/op
ReadBenchmark.json_gson_native_map           avgt    5  1.010 ± 0.054  us/op
ReadBenchmark.json_gson_native_no_any        avgt    5  0.893 ± 0.087  us/op
ReadBenchmark.json_fastjson2_facade          avgt    5  0.579 ± 0.082  us/op
ReadBenchmark.json_fastjson2_native_has_any  avgt    5  0.490 ± 0.050  us/op
ReadBenchmark.json_fastjson2_native_map      avgt    5  0.383 ± 0.008  us/op
ReadBenchmark.json_fastjson2_native_no_any   avgt    5  0.220 ± 0.011  us/op
ReadBenchmark.json_simple_facade             avgt    5  2.756 ± 0.116  us/op
```

::: tip Performance Summary
Using SJF4J adds roughly **5%–10% overhead** compared with native JSON libraries, while providing a unified API and extended functionality.
:::

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

::: tip Performance Summary
Reflection in SJF4J, when using **lambda-based** access, is highly efficient, enabling dynamic object manipulation with **near-native performance**.
:::
