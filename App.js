const heading = React.createElement("div", {id: "parent"}, React.createElement("div", {id : "child"}, "this is from child"));
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(heading);