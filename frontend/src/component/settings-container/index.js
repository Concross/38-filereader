import React from 'react';
import { connect } from 'react-redux';
import ProfileForm from '../profile-form';

class SettingsContainer extends React.Component {
  render() {
    return (
      <div className="settings-container">
        {this.props.auth && !this.props.profile ?
          <div>
            <h2>Profile Settings</h2>
            <ProfileForm buttonText="create" onComplete={this.props.profileCreate} />
          </div>
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsContainer);
