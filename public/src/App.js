import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      result:'',
    };
  }

  handleCodeChange = (event) => {
    this.setState({ code: event.target.value });
  };

  handleSubmit = () => {
    // Send a POST request to '/api' with the code
    fetch('/', {
      method: 'POST',
      body: JSON.stringify({ program: this.state.code }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          result:data.stdout
        }));
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  };

  render() {

    return (
      <div>
        <textarea
          value={this.state.code}
          onChange={this.handleCodeChange}
          rows={10}
          cols={50}
          style={{ marginBottom: '10px' }}
        />
        <button onClick={this.handleSubmit}>Submit</button>
        <pre>{this.state.result}</pre>
      </div>
    );
  }
}

export default App;
