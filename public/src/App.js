import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    code: "",
    result: "",
    error: false,
  };

  handleRun = async () => {
    try {
      const { data } = await axios.post("/", { program: this.state.code });
      if (!data.error) {
        this.setState({ result: data.result, error: false });
      } else {
        this.setState({ result: data.result, error: true });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  render() {
    console.log(this.state);
    const { code, result, error } = this.state;
    return (
      <div className="content">
        <div className="terminal">
          <i className="fa-brands fa-js"></i>
          <textarea
            value={code}
            onChange={(e) => this.setState({ code: e.target.value })}
          />
        </div>
        <div className="run">
          <button onClick={this.handleRun}>Run</button>
        </div>
        <div className="result">
          <h3>Result</h3>
          <pre style={error ? { color: "red" } : { color: "#28a745" }}>
            {result}
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
