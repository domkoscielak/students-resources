import { Component } from "react";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  acceptTC: false,
  gender: "",
  animal: "",
};

class MyForm extends Component {
  state = INITIAL_STATE;

  // handle submit
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.formSubmissionHandler(this.state);
    this.resetForm();
  };

  // handle input
  handleInputChange = (event) => {
    const { value, name, checked, type } = event.target;
    console.log("type:", type);
    this.setState({
      [name]: type !== "checkbox" ? value : checked,
    });
  };

  // reset form
  resetForm = () => {
    this.setState(INITIAL_STATE);
  };

  render() {
    return (
      <>
        <h2>
          {this.props.label} : {this.state.firstName} {this.state.lastName}
        </h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="date"
            name="firstName"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <label>
            <input
              type="checkbox"
              checked={this.state.acceptTC}
              name="acceptTC"
              onChange={this.handleInputChange}
            />
            <span>Accept T&C </span>
          </label>

          <section>
            <label>
              <input
                name="gender"
                type="radio"
                checked={this.state.gender === "Male"}
                value="Male"
                onChange={this.handleInputChange}
              />
              <span>Male</span>
            </label>
            <label>
              <input
                name="gender"
                type="radio"
                value="Female"
                checked={this.state.gender === "Female"}
                onChange={this.handleInputChange}
              />
              <span>Female</span>
            </label>
            <label>
              <input
                name="gender"
                type="radio"
                value="Non-binary"
                checked={this.state.gender === "Non-binary"}
                onChange={this.handleInputChange}
              />
              <span>Non-binary</span>
            </label>
          </section>

          <h3>Your favourite animal</h3>
          <select
            name="animal"
            value={this.state.animal}
            onChange={this.handleInputChange}
          >
            <option value="">Choose...</option>
            <option value="cat">Cat :) </option>
            <option value="dog">Dog</option>
            <option value="snake">Snake</option>
            <option value="elephant">Elephant</option>
          </select>
          <button type="submit">SUBMIT</button>
          <button type="button" onClick={this.resetForm}>
            RESET FORM
          </button>
        </form>
      </>
    );
  }
}

export default MyForm;
