package ca.jrvs.apps.practice;

import org.junit.Test;
import static org.junit.Assert.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;



public class LambdaStreamImpTest {

    private final LambdaStreamExc lse = new LambdaStreamImp();

    @Test
    public void testCreateStrStream() {
        List<String> result = lse.createStrStream("a", "b", "c").collect(java.util.stream.Collectors.toList());
        assertEquals(Arrays.asList("a", "b", "c"), result);
    }

    @Test
    public void testToUpperCase() {
        List<String> result = lse.toUpperCase("a", "b", "c").collect(java.util.stream.Collectors.toList());
        assertEquals(Arrays.asList("A", "B", "C"), result);
    }

    @Test
    public void testFilter() {
        Stream<String> s = Stream.of("cat", "dog", "apple");
        List<String> result = lse.filter(s, "a").collect(java.util.stream.Collectors.toList());
        assertEquals(Arrays.asList("dog"), result);
    }

    @Test
    public void testCreateIntStream() {
        int[] arr = {1, 2, 3};
        List<Integer> result = lse.toList(lse.createIntStream(arr));
        assertEquals(Arrays.asList(1, 2, 3), result);
    }

    @Test
    public void testRange() {
        List<Integer> result = lse.toList(lse.createIntStream(1, 5));
        assertEquals(Arrays.asList(1, 2, 3, 4, 5), result);
    }

    @Test
    public void testSquareRoot() {
        Double[] result = lse.squareRootIntStream(IntStream.of(1, 4, 9))
                .boxed()
                .toArray(Double[]::new);

        assertArrayEquals(new Double[]{1.0, 2.0, 3.0}, result);
    }

    @Test
    public void testGetOdd() {
        List<Integer> result = lse.toList(lse.getOdd(IntStream.of(1, 2, 3, 4, 5)));
        assertEquals(Arrays.asList(1, 3, 5), result);
    }

    @Test
    public void testFlatNestedInt() {
        Stream<List<Integer>> input = Stream.of(
                Arrays.asList(1, 2),
                Arrays.asList(3, 4),
                Arrays.asList(5)
        );

        List<Integer> result = lse.flatNestedInt(input).collect(java.util.stream.Collectors.toList());
        assertEquals(Arrays.asList(1, 2, 3, 4, 5), result);
    }
}

