import React from "react";

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = { city: '' };
    }
    myChangeHandler = (event) => {
      this.setState({city: event.target.value});
    }

    render() {
      return (
        <form className="input-location" onSubmit={this.props.getAQI}>
        <h3>Location: {this.state.city} </h3>
        <p><input
          type='text' name="city"
          placeholder="city, ex: Kuala Lumpur" required
        /></p>
        <button>Check API</button>
        </form>
      );
    }
  }
  
  export default Form;