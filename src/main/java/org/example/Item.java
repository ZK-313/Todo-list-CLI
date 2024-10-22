package org.example;

public class Item {
    String name = "";
    boolean done = false;
    public Item(String name){
        this.name = name;
    }
    public void setDone(boolean isDone){
        done = isDone;
    }
    public static void done(Item item){
        item.setDone(true);
    }
    public static void unDone(Item item){
        item.setDone(false);
    }
}
