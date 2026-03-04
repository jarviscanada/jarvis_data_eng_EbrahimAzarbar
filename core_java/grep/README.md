# Java Grep

## Introduction

This project is a Java implementation of the Unix grep command. The application scans a directory, reads text files line by line, and writes out the lines that match a pattern.
The design uses an interface to define the main process flow, while different 
implementations handle the logic. One implementation uses traditional loops and another uses Java Lambdas and Streams. The project is 
built using core Java, regular expressions for pattern matching, Maven for building the project, and Docker 
for packaging and distribution.

## Quick Start

Build the project using Maven.

```bash
mvn clean package
```

Run the application by executing the main class.
```
java "<pattern>" <root_directory> <output_file>
```

## Implementation

### Pseudocode
```
matchedLines = []

for each file in listFilesRecursively(rootDir)
for each line in readLines(file)
if containsPattern(line)
matchedLines.add(line)

writeToFile(matchedLines)
```
The program goes through each file in the directory and reads it line by line. When a line matches the pattern, it is collected. All matching lines are then written to the output file.


### Performance Issue

A memory issue can occur if all files and lines are stored in memory at once. This can cause high memory usage when scanning 
large directories. To fix this, files should be processed using streams so lines are read and processed one at a time instead 
of being stored in lists.

## Test

Manual testing was done by creating sample text files with known content. Different regular expressions were used to test matching 
and non matching cases. The output file was compared with expected results. Empty folders, invalid paths, and incorrect patterns were also tested.

## Deployment

The application is dockerized for easier distribution. A Dockerfile is used to copy the built jar file into a lightweight OpenJDK image. 
The application runs using java -jar inside the container. Input and output folders are mounted as volumes so files can be read and written 
outside the container.

## Improvement

1. Add more test cases to cover edge cases such as empty directories, unreadable files, and invalid patterns
2. Parallelize file processing using a parallel stream so multiple files are scanned at the same time. Each file would still be read line by line using Files.lines() to keep memory 
usage low, and output writing would be made thread safe
3. Add custom exceptions so errors are clearer and easier to debug. This would help identify issues like invalid input paths, file read failures, or regex errors and make it easier for developers to locate and fix problems

