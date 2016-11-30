function (user, context, callback) {
  // /!\ DO NOT EDIT THIS FILE /!\
  // Please use http://github.com/mozilla-iam/auth0-rules instead

  // LDAP group okta_mfa requires MFA authentication everywhere.
  if (user.groups && user.groups.indexOf("okta_mfa") !== -1) {
    context.multifactor = {
      provider: 'duo',
      ikey: configuration.duo_ikey_mozilla,
      skey: configuration.duo_skey_mozilla,
      host: configuration.duo_apihost_mozilla,

      // optional:
      // Force DuoSecurity everytime this rule runs. Defaults to false.
      // If accepted by users the cookie lasts for 30 days - i.e. 30 days MFA session (this cannot be changed)
      ignoreCookie: false,
      username: user.email,
    };
  }
  callback(null, user, context);
}
