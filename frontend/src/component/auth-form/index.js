import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state)
      .then(() => {
        if (localStorage.token) {
          this.props.redirect('/players');
        } else {
          this.props.redirect('/welcome/signup');
        }
      })
      .catch(console.error);
  }

  render() {
    return (
      <form className="auth-form" onSubmit={this.handleSubmit}>
        {this.props.auth === 'signup' ?
          <input
            type="text"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
          /> : null}

        <input
          type="text"
          name="username"
          placeholder="username"
          value={this.state.username}
          onChange={this.handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.handleChange}
        />

        <button type="submit">{this.props.auth}</button>
      </form>
    );
  }
}
