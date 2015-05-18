### This task is simple solution of "rendering a tree of objects" in angular

##How to run

```
npm install -g grunt-cli bower yo generator-karma generator-angular
npm install
bower install
```

##In details:
- 2 possible solutions: iterative and recursive.
- It's done in Angular.
- Covered with tests.
- Code is modular, using default Angular approach
- There is some OOP approach beside angular.
- Loose coupling
- User able to add/edit/delete child objects anywhere in the tree
- User able to add subchildren infinitely
- The data stored in local storage beforeunload.
- The date read from local storage onload.

##Example of the structure generated
- Element #1
- Element #2
- Element #3
    - Child #1 of element #3
        - Subchild
        - Another subchild
        - Another subchild
        - Last subchild
    - Child #2 of element #3
        - Subchild
        - Subchild
        - Subchild
        - Subchild
    - Child #3 of element #3
        - Subchild
        - Subchild

