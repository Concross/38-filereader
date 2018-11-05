import superagent from 'superagent';

export const profileSet = profile => ({
  type: 'PROFILE_SET',
  payload: profile,
});

export const profileCreate = profile => ({
  type: 'PROFILE_CREATE',
  payload: profile,
});

export const profileFetchRequest = () => (dispatch, getState) => {
  const { auth } = getState();

  return superagent.get(`http://localhost:3000/profiles/${localStorage.userId}`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(profileSet(res.body));
      return res;
    });
};

export const profileCreateRequest = (profile) => (dispatch, getState) => {
  const { auth } = getState();

  return superagent.post(`http://localhost:3000/profiles`)
    .set('Authorization', `Bearer ${auth}`)
    .field('bio', profile.bio)
    .attach('avatar', profile.avatar)
    .then(res => {
      localStorage.userId = res.body._id;
      dispatch(profileCreate(res.body));
      return res;
    });
};
