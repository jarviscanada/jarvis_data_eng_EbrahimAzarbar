package ca.jrvs.apps.grep;

import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.util.List;

import static org.junit.Assert.*;

public class JavaGrepImpTest {

    private JavaGrepImp grep;

    @Before
    public void setup() {
        grep = new JavaGrepImp();
        grep.setRegex("Romeo");
        grep.setRootPath("data");
    }



    @Test
    public void containsPattern_shouldMatchRegex() {
        assertTrue(grep.containsPattern("Romeo and Juliet"));
    }

    @Test
    public void containsPattern_shouldNotMatch() {
        assertFalse(grep.containsPattern("Hamlet"));
    }



    @Test
    public void listFiles_shouldReturnFiles() {
        List<File> files = grep.listFiles("data");

        assertNotNull(files);
        assertTrue(files.size() > 0);


        for (File file : files) {
            assertTrue(file.isFile());
        }
    }


    @Test
    public void readLines_shouldReadTextFile() {
        File file = new File("data/txt/shakespeare.txt");
        List<String> lines = grep.readLines(file);

        assertNotNull(lines);
        assertTrue(lines.size() > 0);

        boolean foundKeyword = lines.stream()
                .anyMatch(line -> line.contains("Romeo") || line.contains("Juliet"));

        assertTrue(foundKeyword);
    }
}