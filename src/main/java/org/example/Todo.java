package org.example;
import org.apache.commons.cli.*;
import java.util.*;
public class Todo {
    public static void main(String[] args) throws ParseException {
        Options options = new Options();
        Option add = Option.builder("a")
                .longOpt("add")
                .hasArgs()
                .argName("items")
                .desc("Add a new item")
                .build();
        options.addOption(add);
        CommandLineParser parser = new DefaultParser();
        HelpFormatter formatter = new HelpFormatter();
        CommandLine cmd = parser.parse(options, args);
        List<String> a = cmd.getArgList();
        for(String b: a){
            System.out.println(b);
        }
        formatter.printHelp("todo", options, true);
    }
}