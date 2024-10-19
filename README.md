# Task Manager

A simple responsive task manager built using Next.js
[Live Link](https://task-manager-new-one.vercel.app/)

## Installation

**Clone the repository**:

```bash
git clone https://github.com/miranas11/task-manager
cd task-manager
npm install
npm run dev
```

## Sorting Method

The Sorting is done using the Array.sort method based on two criteria:

#### Completion Status

If a task is marked as completed it is placed at the end of list.

#### Priority Status

Based on the priority of tasks High placed at top,medium in between and low at end.

#### Here is the code

```bash
  useEffect(() => {
        const newTasks = initialTasks.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            return b.priority - a.priority;
        });

        setTasks(newTasks);
    }, [initialTasks]);
```

The sorting mechanism is implemented within a useEffect hook, which listens for changes to the initialTasks and updates the state (tasks) accordingly.

#### Note

We could have used Binary Search Trees (BST) or other advanced data structures to manage a sorted list of tasks, which would offer efficient insertions, deletions, and lookups.
