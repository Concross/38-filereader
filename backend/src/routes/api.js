'use strict';

import express from 'express';
import modelFinder from '../middleware/modelFinder';
import Team from '../models/team';
import User from '../auth/user';
import Profile from '../models/profile';
import auth from '../auth/middleware';
const router = express.Router();

router.param('model', modelFinder);

/***********************************
*     POST REQUESTS                *
************************************/
router.post('/team', (req, res, next) => {

  if (req.user.role === 'coach') {
    req.body.coach = req.user._id;

    let document = new Team(req.body);

    document.save()
      .then(data => {
        res.send(data);
      })
      .catch(next);

  } else {
    res.status(401);
    res.send('only coaches may create teams');
  }

});

router.post('/api/v1/add/player', auth, (req, res, next) => {
  let document = new Profile(req.body);

  document.save()
    .then(data => {
      res.send(data);
    })
    .catch(next);
});

router.post('/:model', (req, res, next) => {

  req.body.user = req.user._id;

  let document = new req.model(req.body);

  document.save()
    .then(data => {
      res.send(data);
    })
    .catch(next);
});


/***********************************
*     GET REQUESTS                 *
************************************/
router.get('/hello', (req, res, next) => {
  res.send('hello world');
});

// TODO(connor): select to ignore uname and password not working
router.get('/api/v1/players', (req, res, next) => {
  return Profile.find({ role: 'player' })
    .select('-username -password')
    .then(data => {
      res.send(data);
    })
    .catch(console.error);
});

router.get('/user/:id', (req, res, next) => {
  return User.findOne({ _id: req.params.id })
    .select('-username -password -__v')
    .then(data => {
      res.send(data);
    })
    .catch(next);
});

router.get('/:model/:id', (req, res, next) => {
  return req.model.findOne({ _id: req.params.id })
    .then(data => {
      res.send(data);
    })
    .catch(next);
});



/***********************************
*     PUT REQUESTS                 *
************************************/
router.put('/api/v1/update/player', (req, res, next) => {
  console.log(req.body);
  return Profile.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then(data => {
      res.send(data);
    })
    .catch(next);
});

router.put('/team/roster/add/:id', (req, res, next) => {
  if (req.user.role !== 'coach') {
    res.status(401);
    res.send('only coaches may add to team roster');
  } else {
    let playerId = req.params.id;

    return Team.findByIdAndUpdate(req.user.team, { $addToSet: { players: [playerId] } })
      .then(() => {
        res.status(200);
        res.send('player added');
      })
      .catch(next);
  }
});

router.put('/team/roster/remove/:id', (req, res, next) => {
  if (req.user.role !== 'coach') {
    res.status(401);
    res.send('only coaches may delete from team roster');
  } else {
    let playerId = req.params.id;

    return Team.update({ _id: req.user.team }, { $pull: { players: playerId } })
      .then(() => {
        res.status(200);
        res.send('player deleted');
      })
      .catch(next);
  }

});

router.put('/:model', (req, res, next) => {

  return req.model.findOneAndUpdate(req.user[req.params.model], req.body, { new: true })
    .then(data => {
      res.send(data);
    })
    .catch(next);

});

/***********************************
*     DELETE REQUESTS              *
************************************/
router.delete('/api/v1/destroy/player', (req, res, next) => {
  return Profile.findByIdAndDelete({ _id: req.body._id })
    .then(data => {
      res.send(data);
    })
    .catch(next);
});

router.delete('/:model/:id', (req, res, next) => {
  return req.model.findByIdAndDelete({ _id: req.params.id })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(next);
});

export default router;