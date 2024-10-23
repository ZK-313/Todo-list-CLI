package org.example;

import java.io.Serializable;

public class Item implements Serializable {
    private static final long serialVersionUID = 1L; // Ensures consistency during serialization
    private String name;
    private boolean done;

    // Constructor to initialize item with a name
    public Item(String name) {
        this.name = name;
        this.done = false;
    }

    // Getter for the done status
    public boolean isDone() {
        return done;
    }

    // Setter for the done status
    public void setDone(boolean isDone) {
        this.done = isDone;
    }

    // Mark a task as done
    public static void done(Item item) {
        item.setDone(true);
    }

    // Mark a task as not done
    public static void unDone(Item item) {
        item.setDone(false);
    }

    // Override the toString() method to return the name of the task
    @Override
    public String toString() {
        return name;
    }

    // Override equals() to compare tasks based on their names
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Item item = (Item) obj;
        return name.equals(item.name);
    }

    // Override hashCode() to maintain consistency with equals()
    @Override
    public int hashCode() {
        return name.hashCode();
    }
}