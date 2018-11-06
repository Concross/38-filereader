import React from 'react';
import { photoToDataUrl } from '../../lib/utils';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.profile ?
      { ...props.profile, preview: '' } :
      { bio: '', avatar: null, preview: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    if (name === 'bio') this.setState({ bio: value });
    if (name === 'avatar') {
      const { files } = e.target;
      const avatar = files[0];
      this.setState({ avatar });

      photoToDataUrl(avatar)
        .then(preview => this.setState({ preview }))
        .catch(console.error);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
  }

  render() {
    return (
      <form
        className="profile-form"
        onSubmit={this.handleSubmit}
      >

        <img src={this.state.preview} alt="avatar" style={{ width: '25%' }} />

        <input
          type="file"
          name="avatar"
          onChange={this.handleChange}
        />

        <textarea
          name="bio"
          cols="30"
          rows="10"
          value={this.state.bio}
          onChange={this.handleChange}
        />

        <button type="submit">{this.props.buttonText}</button>
      </form>
    );
  }
}

export default ProfileForm;
