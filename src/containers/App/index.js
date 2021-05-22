import React, { Component, Fragment } from "react";
import axios from "axios";
import emailjs from "emailjs-com";

//import "./ContactUs.css";
import "./App.css";

export class App extends Component {
  state = {
    name: "",
    email: "",
    message: "",
  };

  getdata() {
    axios("http://localhost:1337/articles").then((i) => {
      console.log(i["data"][0]["image"]["url"]);
      this.setState({ img: i["data"][0]["image"]["url"] });
    });
  }

  sendEmail = (e) => {
    e.preventDefault();
    console.log(this.state);
    emailjs
      .send(
        "service_ol5dmcb",
        "template_5pw4t8j",
        this.state,
        "user_oGk6T9qq030b5pAbLtycy"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleParagraphChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value.split("\\n").join("\n"),
    });
  };

  render() {
    return (
      <div className="App">
        <form className="contact-form" noValidate onSubmit={this.sendEmail}>
          <label>Name</label>
          <input type="text" name="name" onChange={this.changeHandler} />
          <label>Email</label>
          <input type="email" name="email" onChange={this.changeHandler} />
          <label>Message</label>
          <textarea name="message" onChange={this.handleParagraphChange} />
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

export default App;
