#!/bin/bash

# Ensure user has sudo privileges
if [ "$EUID" -ne 0 ]; then 
  echo "Please run as root (using sudo)"
  exit
fi

# Move the JAR file and executable to /opt/mytodo
mkdir -p /opt/mytodo
cp todo-jar-with-dependencies.jar /opt/mytodo/
echo "Copied todo.jar to /opt/mytodo"

# Create symbolic link for easy CLI usage
ln -sf /opt/mytodo/todo-jar-with-dependencies.jar /usr/local/bin/todo

# Create a wrapper script for launching the jar
cat << 'EOF' > /usr/local/bin/todo
#!/bin/bash
java -jar /opt/mytodo/todo-jar-with-dependencies.jar "$@"
EOF

# Make the wrapper script executable
chmod +x /usr/local/bin/todo

echo "Installation complete. Run 'todo -h' to get started."
