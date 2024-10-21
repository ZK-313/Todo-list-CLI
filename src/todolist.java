import java.util.*;

public class todolist {
    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_BLACK = "\u001B[30m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_YELLOW = "\u001B[33m";
    public static final String ANSI_BLUE = "\u001B[34m";
    public static final String ANSI_PURPLE = "\u001B[35m";
    public static final String ANSI_CYAN = "\u001B[36m";
    public static final String ANSI_WHITE = "\u001B[37m";
    public static String help(){
        return System.out.println();
    }
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>(Arrays.asList(args));
        if(list.contains("-h") || list.contains("--help") || list.isEmpty()) {
            System.out.println("Usage: ");
        }
        for(int i = 0; i < list.size(); i++){
            if(list.get(i).equals("-")){

            }
        }
    }
}