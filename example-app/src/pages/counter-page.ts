import {
  Block,
  Button,
  Column,
  Container,
  Expanded,
  Page,
  Row,
  SimpleText,
} from "@mtg/declarative";

export class CounterPage extends Page {
  counter: number = 0;

  handleIncrement = () => {
    this.counter++;
    this.updateStateUI();
  };

  handleDecrement = () => {
    if (this.counter <= 0) return;

    this.counter--;
    this.updateStateUI();
  };

  build(): Block {
    return Container({
      padding: 32,
      width: "match_parent",
      height: "match_parent",
      backgroundColor: "#F5F5F5",
      child: Column({
        children: [
          Container({
            padding: 16,
            backgroundColor: "#EDE7F6",
            width: "match_parent",
            child: Column({
              children: [
                SimpleText("Counter Page", {
                  textSize: 24,
                  fontWeight: "bold",
                  textColor: "#666666",
                }),
                SimpleText(`Counter Value: ${this.counter}`, {
                  textSize: 16,
                  textColor: "#666666",
                }),
              ],
            }),
          }),
          Container({
            height: "wrap_content",
            width: "match_parent",
            marginTop: 32,
            marginBottom: 24,
            child: Row({
              children: [
                Expanded({
                  child: Button({
                    text: "Decrement Counter",
                    textColor: "#FFFFFF",
                    backgroundColor: "#6200EE",
                    height: 80,
                    width: "match_parent",
                    onPressed: this.handleDecrement,
                  }),
                }),
                Container({ width: 16, height: 20 }), // Spacer
                Expanded({
                  child: Button({
                    text: "Increment Counter",
                    textColor: "#FFFFFF",
                    backgroundColor: "#6200EE",
                    height: 80,
                    width: "match_parent",
                    onPressed: this.handleIncrement,
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
    });
  }
}
