package org.example;
import org.apache.commons.cli.*;
import java.util.*;
public class Todo {
    public static void main(String[] args) throws ParseException {
        ArrayList<Item> todo_list = new ArrayList<>(0);
        Options options = new Options();
        Option help = Option.builder("h")
                .longOpt("help")
                .desc("Shows help message")
                .build();
        Option add = Option.builder("a")
                .longOpt("add")
                .hasArgs()
                .argName("items")
                .desc("Add a new task/tasks")
                .build();
        Option done = Option.builder("d")
                .longOpt("done")
                .hasArgs()
                .desc("Marks given tasks as done")
                .build();
        Option undo = Option.builder("u")
                .longOpt("undo")
                .hasArgs()
                .desc("Marks given tasks as incomplete")
                .build();
        Option remove = Option.builder("r")
                .longOpt("remove")
                .hasArgs()
                .desc("Removes given tasks from list")
                .build();
        Option list = Option.builder("l")
                .longOpt("list")
                .hasArgs()
                .optionalArg(true)
                .numberOfArgs(3)
                .desc("Prints list of tasks")
                .build();
        options.addOption(help);
        options.addOption(add);
        options.addOption(done);
        options.addOption(undo);
        options.addOption(remove);
        options.addOption(list);
        CommandLineParser parser = new DefaultParser();
        HelpFormatter formatter = new HelpFormatter();
        CommandLine cmd = parser.parse(options, args);
        if (cmd.hasOption("a")) {
            String[] tasks = cmd.getOptionValues("a");

            for(int i = 0; i < tasks.length; i++) {
                for(Item j : todo_list){
                    if(j.toString().equals(tasks[i])){
                        System.out.println(tasks[i]+" could not be added because a task with this name already exists.");
                        tasks[i] = null;
                    }
                }
                if(tasks[i] != null){
                    Item task = new Item(tasks[i]);
                    System.out.println("I am here");
                    todo_list.add(task);
                    System.out.println(todo_list);
                }

            }
        }
        if (cmd.hasOption("l")) {
            String[] list_args = cmd.getOptionValues("l");
            System.out.println(todo_list);
            if(list_args == null) {
                if(todo_list.isEmpty()){
                    System.out.println("You have no tasks to complete. Woohoo!");
                } else {
                    for(int i = 0; i < todo_list.size(); i++) {
                        if(todo_list.get(i).isDone()){
                            System.out.println("[✔] "+todo_list.get(i));
                        } else {
                            System.out.println("[❌] "+todo_list.get(i));
                        }
                    }
                }
            }
        }

        if(cmd.hasOption("h")){
            formatter.printHelp("todo", options, true);
        }

    }
}