(() => {
  // ../declarative/dist/lib/core/presentation/router/manager.js
  var DEFAULT_INITIAL_PATH = "/";
  var RouterManager = class {
    initialPath = DEFAULT_INITIAL_PATH;
    routes;
    history = [];
    currentRoute;
    constructor({ routes = {}, initialPath = DEFAULT_INITIAL_PATH }) {
      this.initialPath = initialPath;
      if (!Object.keys(routes).length) {
        throw new Error("RouterManager requires at least one route");
      }
      this.routes = routes;
      const initialPage = routes[initialPath];
      if (!initialPage) {
        throw new Error(`Initial path not found in routes: ${initialPath}`);
      }
      this.history.push({ block: initialPage, params: {} });
      this.currentRoute = { block: initialPage, params: {} };
    }
    push(path, params) {
      if (!this.routes[path]) {
        throw new Error(`Route not found: ${path}`);
      }
      const page = this.routes[path];
      this.history.push({ block: page, params });
      this.currentRoute = { block: page, params };
    }
    pop() {
      if (this.history.length === 0) {
        throw new Error("No history to pop");
      }
      this.history.pop();
      this.currentRoute = this.history[this.history.length - 1];
    }
    navigate(path, params) {
      if (!this.routes[path]) {
        throw new Error(`Route not found: ${path}`);
      }
      this.history = [];
      this.push(path, params);
    }
  };

  // ../declarative/dist/lib/core/presentation/ui/block.js
  var Block = class {
  };

  // ../declarative/dist/lib/core/presentation/state/page.js
  var Page = class extends Block {
    JSON() {
      return this.build().JSON();
    }
    updateStateUI() {
      let blockUpdated = JSON.stringify(this.build().JSON());
      globalThis.notifyNative(blockUpdated);
    }
  };

  // ../declarative/dist/lib/core/presentation/ui/button.js
  var button = class extends Block {
    text;
    textColor;
    // ex: "#FFFFFF"
    backgroundColor;
    // ex: "#6200EE"
    textSize;
    // em sp
    padding;
    // em dp (uniforme)
    paddingLeft;
    paddingRight;
    paddingTop;
    paddingBottom;
    enabled;
    width;
    height;
    onPressed;
    functionId;
    // Function ID for the onPressed action
    constructor(props) {
      super();
      this.text = props.text;
      this.textColor = props.textColor;
      this.backgroundColor = props.backgroundColor;
      this.textSize = props.textSize;
      this.padding = props.padding;
      this.paddingLeft = props.paddingLeft;
      this.paddingRight = props.paddingRight;
      this.paddingTop = props.paddingTop;
      this.paddingBottom = props.paddingBottom;
      this.enabled = props.enabled ?? true;
      this.width = props.width;
      this.height = props.height;
      this.onPressed = props.onPressed;
      if (this.onPressed) {
        this.functionId = registerFunction(this.onPressed);
      }
    }
    JSON() {
      const result = {
        type: "button",
        text: this.text,
        enabled: this.enabled
      };
      if (this.textColor !== void 0) {
        result.textColor = this.textColor;
      }
      if (this.backgroundColor !== void 0) {
        result.backgroundColor = this.backgroundColor;
      }
      if (this.textSize !== void 0) {
        result.textSize = this.textSize;
      }
      if (this.padding !== void 0) {
        result.padding = this.padding;
      }
      if (this.paddingLeft !== void 0) {
        result.paddingLeft = this.paddingLeft;
      }
      if (this.paddingRight !== void 0) {
        result.paddingRight = this.paddingRight;
      }
      if (this.paddingTop !== void 0) {
        result.paddingTop = this.paddingTop;
      }
      if (this.paddingBottom !== void 0) {
        result.paddingBottom = this.paddingBottom;
      }
      if (this.width !== void 0) {
        result.width = this.width;
      }
      if (this.height !== void 0) {
        result.height = this.height;
      }
      if (this.onPressed && this.functionId) {
        result.functionId = this.functionId;
      }
      return result;
    }
  };
  var Button = (props) => new button(props);

  // ../declarative/dist/lib/core/presentation/ui/column.js
  var column = class extends Block {
    children = [];
    /**
     * Creates a new Column instance.
     * @param {Object} props - The properties for the Column.
     * @param {Block[]} [props.children=[]] - An array of Block instances to be added as children of this column.
     * @example
     * const column = new Column({
     *  children: [new Block(), new Block()]s
     * });
     * This will create a Column with two Block children.
     * */
    constructor(props = { children: [] }) {
      super();
      this.children = props.children;
    }
    JSON() {
      const renderedChildren = this.children.map((child) => child.JSON());
      return {
        type: "column",
        children: renderedChildren
      };
    }
  };
  var Column = (props = { children: [] }) => new column(props);

  // ../declarative/dist/lib/core/presentation/ui/container.js
  var container = class extends Block {
    child;
    padding;
    paddingLeft;
    paddingRight;
    paddingTop;
    paddingBottom;
    margin;
    marginLeft;
    marginRight;
    marginTop;
    marginBottom;
    backgroundColor;
    width;
    height;
    gravity;
    constructor(props) {
      super();
      this.child = props.child;
      this.padding = props.padding;
      this.paddingLeft = props.paddingLeft;
      this.paddingRight = props.paddingRight;
      this.paddingTop = props.paddingTop;
      this.paddingBottom = props.paddingBottom;
      this.margin = props.margin;
      this.marginLeft = props.marginLeft;
      this.marginRight = props.marginRight;
      this.marginTop = props.marginTop;
      this.marginBottom = props.marginBottom;
      this.backgroundColor = props.backgroundColor;
      this.width = props.width;
      this.height = props.height;
      this.gravity = props.gravity;
    }
    JSON() {
      const result = {
        type: "container"
      };
      if (this.child) {
        result.child = this.child.JSON();
      }
      if (this.padding !== void 0)
        result.padding = this.padding;
      if (this.paddingLeft !== void 0)
        result.paddingLeft = this.paddingLeft;
      if (this.paddingRight !== void 0)
        result.paddingRight = this.paddingRight;
      if (this.paddingTop !== void 0)
        result.paddingTop = this.paddingTop;
      if (this.paddingBottom !== void 0)
        result.paddingBottom = this.paddingBottom;
      if (this.margin !== void 0)
        result.margin = this.margin;
      if (this.marginLeft !== void 0)
        result.marginLeft = this.marginLeft;
      if (this.marginRight !== void 0)
        result.marginRight = this.marginRight;
      if (this.marginTop !== void 0)
        result.marginTop = this.marginTop;
      if (this.marginBottom !== void 0)
        result.marginBottom = this.marginBottom;
      if (this.backgroundColor !== void 0)
        result.backgroundColor = this.backgroundColor;
      if (this.width !== void 0)
        result.width = this.width;
      if (this.height !== void 0)
        result.height = this.height;
      if (this.gravity !== void 0)
        result.gravity = this.gravity;
      return result;
    }
  };
  var Container = (props) => new container(props);

  // ../declarative/dist/lib/core/presentation/ui/declarative.js
  var DeclarativeUI = class extends Block {
    router;
    constructor(props) {
      super();
      this.router = props.router ?? new RouterManager({});
    }
    JSON() {
      return {
        type: "declarative-ui"
      };
    }
    actualBlockToBridge() {
      return JSON.stringify(this.router.currentRoute?.block.JSON()) ?? "{}";
    }
  };
  var runApp = (app2) => {
    globalThis.actualBlock = app2.actualBlockToBridge();
  };

  // ../declarative/dist/lib/core/presentation/ui/expanded.js
  var expanded = class extends Block {
    child;
    constructor(props) {
      super();
      this.child = props.child;
    }
    JSON() {
      return {
        type: "expanded",
        child: this.child.JSON()
      };
    }
  };
  var Expanded = (props) => new expanded(props);

  // ../declarative/dist/lib/core/presentation/ui/row.js
  var row = class extends Block {
    children = [];
    /**
     * Creates a new Row instance.
     * @param {Object} props - The properties for the Row.
     * @param {Block[]} [props.children=[]] - An array of Block instances to be added as children of this row.
     * @example
     * const row = new Row({
     *  children: [new Block(), new Block()]
     * });
     * This will create a Row with two Block children.
     * */
    constructor(props) {
      super();
      this.children = props.children ?? [];
    }
    JSON() {
      const renderedChildren = this.children.map((child) => child.JSON());
      return {
        type: "row",
        children: renderedChildren
      };
    }
  };
  var Row = (props) => new row(props);

  // ../declarative/dist/lib/core/presentation/ui/text.js
  var simpleText = class extends Block {
    text;
    textColor;
    textSize;
    fontWeight;
    fontStyle;
    textAlign;
    maxLines;
    ellipsize;
    lineHeight;
    constructor(text, props) {
      super();
      this.text = text;
      this.textColor = props.textColor;
      this.textSize = props.textSize;
      this.fontWeight = props.fontWeight;
      this.fontStyle = props.fontStyle;
      this.textAlign = props.textAlign;
      this.maxLines = props.maxLines;
      this.ellipsize = props.ellipsize;
      this.lineHeight = props.lineHeight;
    }
    JSON() {
      const result = {
        type: "text",
        text: this.text
      };
      if (this.textColor !== void 0)
        result.textColor = this.textColor;
      if (this.textSize !== void 0)
        result.textSize = this.textSize;
      if (this.fontWeight !== void 0)
        result.fontWeight = this.fontWeight;
      if (this.fontStyle !== void 0)
        result.fontStyle = this.fontStyle;
      if (this.textAlign !== void 0)
        result.textAlign = this.textAlign;
      if (this.maxLines !== void 0)
        result.maxLines = this.maxLines;
      if (this.ellipsize !== void 0)
        result.ellipsize = this.ellipsize;
      if (this.lineHeight !== void 0)
        result.lineHeight = this.lineHeight;
      return result;
    }
  };
  var SimpleText = (text, props) => new simpleText(text, props);

  // ../declarative/dist/lib/index.js
  if (!globalThis.__functionRegistry) {
    globalThis.__functionRegistry = {};
    globalThis.__nextFunctionId = 1;
  }
  function registerFunction(fn) {
    var nextId = globalThis.__nextFunctionId + 1;
    const id = `fn_${nextId}`;
    globalThis.__functionRegistry[id] = fn;
    globalThis.__nextFunctionId = nextId;
    return id;
  }

  // src/pages/counter-page.ts
  var CounterPage = class extends Page {
    counter = 0;
    handleIncrement = () => {
      this.counter++;
      this.updateStateUI();
    };
    handleDecrement = () => {
      if (this.counter <= 0) return;
      this.counter--;
      this.updateStateUI();
    };
    build() {
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
                    textColor: "#666666"
                  }),
                  SimpleText(`Counter Value: ${this.counter}`, {
                    textSize: 16,
                    textColor: "#666666"
                  })
                ]
              })
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
                      onPressed: this.handleDecrement
                    })
                  }),
                  Container({ width: 16, height: 20 }),
                  // Spacer
                  Expanded({
                    child: Button({
                      text: "Increment Counter",
                      textColor: "#FFFFFF",
                      backgroundColor: "#6200EE",
                      height: 80,
                      width: "match_parent",
                      onPressed: this.handleIncrement
                    })
                  })
                ]
              })
            })
          ]
        })
      });
    }
  };

  // src/index.ts
  var app = new DeclarativeUI({
    router: new RouterManager({
      routes: {
        "/": new CounterPage()
      }
    })
  });
  runApp(app);
})();
