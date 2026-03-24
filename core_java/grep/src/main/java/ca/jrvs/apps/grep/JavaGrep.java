package ca.jrvs.apps.grep;

import java.io.File;
import java.io.IOException;
import java.util.List;

public interface JavaGrep {
    /**
     * Top level search workflowS
     * @throws IOException
     */
    void process() throws IOException;

    /**
     * Traverse a given directory and return all files
     * @param rootDir input directory
     * @return files under the rootDir
     */
    List<File> listFiles(String rootDir);

    /**
     * Read a file and return all the lines
     *
     * Explain FileReader, BufferedReader, and character encoding
     *
     * @param inputFile file to be read
     * @return lines
     * @throws IllegalArgumentException if a given inputFile is not a file
     */
    List<String> readLines(File inputFile);

    /**
     * check if a line contains the regex pattern (passed by user)
     * @param line input string
     * @return true if there is a match
     */
    boolean containsPattern(String line);

    /**
     * Write lines to a file
     *
     * Explore: FileOutputStream, OutputStreamWriter, and BufferedWriter
     *
     * @param lines matched line
     * @throws IOException if write failed
     */
    void writeToFile(List<String> lines) throws IOException;

    /**
     * Get root directory path
     *
     * @return root directory path
     */
    String getRootPath();

    /**
     * Set root directory path
     *
     * @param rootPath root directory path
     */
    void setRootPath(String rootPath);

    /**
     * Get regex pattern
     *
     * @return regex pattern
     */
    String getRegex();

    /**
     * Set regex pattern
     *
     * @param regex regex pattern
     */
    void setRegex(String regex);

    /**
     * Get output file path
     *
     * @return output file path
     */
    String getOutFile();

    /**
     * Set output file path
     *
     * @param outFile output file path
     */
    void setOutFile(String outFile);
}
