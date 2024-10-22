package org.example;
import java.util.ArrayList;
import java.util.HashMap;

public class List {
    private ArrayList<Item> items = new ArrayList<>();
    public List(){

    }
    public void add(Item item) throws DuplicateTaskException{
        if(items.contains(item)){
            throw new DuplicateTaskException();
        } else {
            items.add(item);
        }
    }
    public ArrayList<Item> getList(){
        return items;
    }
    public void remove(Item item){
        items.remove(item);
    }



}
