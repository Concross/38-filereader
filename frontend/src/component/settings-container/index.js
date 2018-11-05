import React from 'react';
import { connect } from 'react-redux';
import ProfileForm from '../profile-form';
import {
  profileFetchRequest,
  profileCreateRequest,
} from '../../action/profile-actions';

class SettingsContainer extends React.Component {
  componentWillMount() {
    this.props.actions.profileFetchRequest();
  }

  render() {
    return (
      <div className="settings-container">
        {this.props.auth && !this.props.profile ?
          <div>
            <h2>Profile Settings</h2>
            <ProfileForm buttonText="create" onComplete={this.props.actions.profileCreateRequest} />
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
  return {
    actions: {
      profileFetchRequest: () => dispatch(profileFetchRequest()),
      profileCreateRequest: profile => dispatch(profileCreateRequest(profile)),
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsContainer);
