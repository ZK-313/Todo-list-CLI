package org.example;

public class Item {
    String name = "";
    private boolean done = false;
    public Item(String name){
        this.name = name;
    }
    public boolean isDone(){
        return done;
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

    @Override
    public String toString() {
        return name;
    }
}
