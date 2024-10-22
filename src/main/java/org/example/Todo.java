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
        Option help = Option.builder("h")
                .longOpt("help")
                .desc("Shows help message")
                .build();
        options.addOption(add);
        options.addOption(help);
        CommandLineParser parser = new DefaultParser();
        HelpFormatter formatter = new HelpFormatter();
        CommandLine cmd = parser.parse(options, args);
        if (cmd.hasOption("a")) {
            String[] a = cmd.getOptionValues("a");
            System.out.println(a[0]);
        }

        if(cmd.hasOption("h")){
            formatter.printHelp("todo", options, true);
        }

    }
}