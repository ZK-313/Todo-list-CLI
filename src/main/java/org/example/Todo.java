package org.example;
import org.apache.commons.cli.*;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.List;
import java.util.ArrayList;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.Objects;
import java.nio.file.Paths;

public class Todo {
    /*public void saveTodoList(ArrayList<Item> todoList) {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("todo_list.ser"))) {
            oos.writeObject(todoList);
            //System.out.println("Tasks saved successfully.");
        } catch (IOException e) {
            System.out.println("Error saving tasks: " + e.getMessage());
        }
    }


    @SuppressWarnings("unchecked")
    public ArrayList<Item> loadTodoList() {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("todo_list.ser"))) {
            return (ArrayList<Item>) ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("No previous tasks found or error loading tasks. Creating new list.");
            return new ArrayList<>();
        }
    }*/

    public void saveTodoList(ArrayList<Item> todoList) {
        String jarDir = getJarDirectory(); // Get the directory of the JAR file
        String todoListFilePath = Paths.get(jarDir, "todo_list.ser").toString(); // Construct the path for .ser file

        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(todoListFilePath))) {
            oos.writeObject(todoList);
            System.out.println("Tasks saved successfully to " + todoListFilePath);
        } catch (IOException e) {
            System.out.println("Error saving tasks: " + e.getMessage());
        }
    }

    public ArrayList<Item> loadTodoList() {
        String jarDir = getJarDirectory(); // Get the directory of the JAR file
        String todoListFilePath = Paths.get(jarDir, "todo_list.ser").toString(); // Construct the path for .ser file

        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(todoListFilePath))) {
            return (ArrayList<Item>) ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("No previous tasks found or error loading tasks. Creating new list.");
            return new ArrayList<>();
        }
    }


    private String getJarDirectory() {
        String jarPath = null;
        try {
            // Get the path of the JAR file
            jarPath = new java.io.File(Todo.class.getProtectionDomain().getCodeSource().getLocation().toURI()).getAbsolutePath();
            return new java.io.File(jarPath).getParent(); // Return the directory of the JAR file
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String RESET = "\u001B[0m";
    public static String BLACK = "\u001B[30m";
    public static String RED = "\u001B[31m";
    public static String GREEN = "\u001B[32m";
    public static String YELLOW = "\u001B[33m";
    public static String BLUE = "\u001B[34m";
    public static String PURPLE = "\u001B[35m";
    public static String CYAN = "\u001B[36m";
    public static String WHITE = "\u001B[37m";

    public static void main(String[] args) throws ParseException {
        String os = System.getProperty("os.name").toLowerCase();
        if(os.contains("win")){
            RESET = "";
            BLACK = "";
            RED = "";
            GREEN = "";
            YELLOW = "";
            BLUE = "";
            PURPLE = "";
            CYAN = "";
            WHITE = "";
        }
        ArrayList<Item> todo_list = new Todo().loadTodoList();
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
                .argName("all/a | done/d | incomplete/u")
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
            for (String task : tasks) {
                boolean exists = todo_list.stream().anyMatch(item -> item.toString().equals(task));
                if (!exists) {
                    Item newTask = new Item(task);
                    todo_list.add(newTask);
                    //System.out.println(task + " added.");
                } else {
                    System.out.println(task + " already exists.");
                }
            }
            new Todo().saveTodoList(todo_list);
        }

        if (cmd.hasOption("l")) {
            String[] list_args = cmd.getOptionValues("l");
            if(list_args == null || Objects.equals(list_args[0], "a") || list_args[0].equals("all")) {
                if(todo_list.isEmpty()){
                    System.out.println("You have no tasks to complete. Woohoo!");
                } else {
                    for(int i = 0; i < todo_list.size(); i++) {
                        if(todo_list.get(i).isDone()){
                            System.out.println(CYAN + (i+1)+ ". "+WHITE+"["+GREEN+"y"+WHITE+"] "+RESET+todo_list.get(i));
                        } else {
                            System.out.println(CYAN + (i+1)+ ". "+WHITE+"["+RED+"x"+WHITE+"] "+RESET+todo_list.get(i));
                        }
                    }
                }
            } else if(list_args[0].equals("done") || list_args[0].equals("d")){
                if(todo_list.isEmpty()){
                    System.out.println(RED+"None of your tasks are complete."+RESET);
                } else {
                    for(int i = 0; i < todo_list.size(); i++) {
                        if(todo_list.get(i).isDone()){
                            System.out.println(CYAN + (i+1)+ ". "+WHITE+"["+GREEN+"y"+WHITE+"] "+RESET+todo_list.get(i));
                        }
                    }
                }
            } else if(list_args[0].equals("undone") || list_args[0].equals("u")){
                if(todo_list.isEmpty()){
                    System.out.println(RED+"There are no tasks left to do."+RESET);
                } else {
                    for(int i = 0; i < todo_list.size(); i++) {
                        if(!todo_list.get(i).isDone()){
                            System.out.println(CYAN + (i+1)+ ". "+WHITE+"["+RED+"x"+WHITE+"] "+RESET+todo_list.get(i));
                        }
                    }
                }
            }
        }

        if(cmd.hasOption("h")){
            formatter.printHelp("todo", options, true);
        }

        if(cmd.hasOption("d")){
            String[] tasks = cmd.getOptionValues("d");
            if(tasks == null) {
                System.out.println(RED+"Error! Please provide a task to mark as complete!"+RESET);
            } else {
                for(int i = 0; i < tasks.length; i++) {
                    int finalI = i;
                    boolean exists = todo_list.stream().anyMatch(item -> item.toString().equals(tasks[finalI]));
                    if(exists) {
                        for(int j = 0; j < todo_list.size(); j++){
                            if(todo_list.get(j).toString().equals(tasks[i])){
                                todo_list.get(j).setDone(true);
                            }
                        }
                    } else {
                        System.out.println(RED+"Error! "+tasks[i]+" does not exist."+RESET);
                    }
                }
            }
            new Todo().saveTodoList(todo_list);
        }
        if(cmd.hasOption("u")){
            String[] tasks = cmd.getOptionValues("u");
            if(tasks == null) {
                System.out.println(RED+"Error! Please provide a task to mark as incomplete!"+RESET);
            } else {
                for(int i = 0; i < tasks.length; i++) {
                    int finalI = i;
                    boolean exists = todo_list.stream().anyMatch(item -> item.toString().equals(tasks[finalI]));
                    if(exists) {
                        for(int j = 0; j < todo_list.size(); j++){
                            if(todo_list.get(j).toString().equals(tasks[i])){
                                todo_list.get(j).setDone(false);
                            }
                        }
                    } else {
                        System.out.println(RED+"Error! "+tasks[i]+" does not exist."+RESET);
                    }
                }
            }
            new Todo().saveTodoList(todo_list);
        }
        if(cmd.hasOption("r")){
            String[] tasks = cmd.getOptionValues("r");
            if(tasks == null) {
                System.out.println(RED+"Error! There are no tasks to remove!"+RESET);
            } else {
                for(int i = 0; i < tasks.length; i++) {
                    int finalI = i;
                    boolean exists = todo_list.stream().anyMatch(item -> item.toString().equals(tasks[finalI]));
                    if(exists) {
                        for(int j = 0; j < todo_list.size(); j++){
                            if(todo_list.get(j).toString().equals(tasks[i])){
                                todo_list.remove(todo_list.get(j));
                            }
                        }
                    } else {
                        System.out.println(RED+"Error! "+tasks[i]+" does not exist."+RESET);
                    }
                }
            }
            new Todo().saveTodoList(todo_list);
        }



    }
}