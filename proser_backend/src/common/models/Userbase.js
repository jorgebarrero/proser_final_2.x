// Copyright Maprotel. 2015,2019. All Rights Reserved.
// Node module: loopback-proser
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

// var config = require('../../server/config.json');
// var path = require('path');

import * as checkIfExists from "../queries/Userbase/checkIfExists";

module.exports = function(Userbase) {
  Userbase.checkIfExists = async function(user) {
    return checkIfExists.checkIfExists(user);
  };

  Userbase.remoteMethod("checkIfExists", {
    accepts: {
      arg: "user",
      type: "object",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Check for email or username registered"]
  });

  //send verification email after registration
  //   Userbase.afterRemote('create', function(context, userInstance, next) {
  //     console.log('> user.afterRemote triggered');

  //     var verifyOptions = {
  //       type: 'email',
  //       to: userInstance.email,
  //       from: 'noreply@loopback.com',
  //       subject: 'Thanks for registering.',
  //       template: path.resolve(__dirname, '../../server/views/verify.ejs'),
  //       redirect: '/verified',
  //       user: userInstance
  //     };

  //     userInstance.verify(verifyOptions, function(err, response) {
  //       if (err) {
  //         Userbase.deleteById(userInstance.id);
  //         return next(err);
  //       }

  //       console.log('> verification email sent:', response);

  //       context.res.render('response', {
  //         title: 'Signed up successfully',
  //         content: 'Please check your email and click on the verification link ' -
  //             'before logging in.',
  //         redirectTo: '/',
  //         redirectToLinkText: 'Log in'
  //       });
  //     });
  //   });
};
