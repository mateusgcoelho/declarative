# DeclarativeUI (Flutter in js? 😂)

> **Note:** This project was created purely for study and fun purposes and should not be taken seriously. 😊

This repository contains a declarative TypeScript Mobile framework for building user interfaces and managing state, designed to integrate with QuickJS and be used in Android applications.

## Example: Creating an MVP Page with "Hello World"

Below is an example of how to create a simple page using the declarative framework that displays "Hello World" on the screen.

### Code Example

```typescript
import {
  Block,
  Column,
  Container,
  DeclarativeUI,
  Page,
  RouterManager,
  runApp,
  SimpleText,
} from "@mtg/declarative";

class HelloWorldApp extends Page {
  build(): Block {
    return Container({
      width: "match_parent",
      height: "match_parent",
      backgroundColor: "#F2F2F2",
      child: Column({
        children: [
          SimpleText("Welcome to the Declarative UI example.", {
            textColor: "#000000",
            textSize: 24,
          }),
          SimpleText("Welcome to the Declarative UI example.", {
            textColor: "#FF0000",
            textSize: 18,
          }),
        ],
      }),
    });
  }
}

const myDeclarativeApp = new DeclarativeUI({
  router: new RouterManager({
    routes: {
      "/": new HelloWorldApp(),
    },
  }),
});

runApp(myDeclarativeApp);
```

### Image

![Hello World Example](./assets/image.png)
