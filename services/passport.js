const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      origin: 'http://localhost:3000',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      //   Find or create the user in your database
      // console.log(profile);
      const user = await prisma.user.findUnique({
        where: {
          googleId: profile.id,
        },
      });
      if (user) {
        return cb(null, user);
      }

      const newUser = await prisma.user.create({
        data: {
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        },
      });
      return cb(null, newUser);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;

// {
//     id: '100928461379022506954',
//     displayName: 'Mirul Khanal',
//     name: { familyName: 'Khanal', givenName: 'Mirul' },
//     photos: [
//       {
//         value: 'https://lh3.googleusercontent.com/a/AEdFTp5sjBxdDvo5_ke7uHrs4J4HYMplZOZ6dnU9gYbJNg=s96-c'
//       }
//     ],
//     provider: 'google',
//     _raw: '{\n' +
//       '  "sub": "100928461379022506954",\n' +
//       '  "name": "Mirul Khanal",\n' +
//       '  "given_name": "Mirul",\n' +
//       '  "family_name": "Khanal",\n' +
//       '  "picture": "https://lh3.googleusercontent.com/a/AEdFTp5sjBxdDvo5_ke7uHrs4J4HYMplZOZ6dnU9gYbJNg\\u003ds96-c",\n' +
//       '  "locale": "en"\n' +
//       '}',
//     _json: {
//       sub: '100928461379022506954',
//       name: 'Mirul Khanal',
//       given_name: 'Mirul',
//       family_name: 'Khanal',
//       picture: 'https://lh3.googleusercontent.com/a/AEdFTp5sjBxdDvo5_ke7uHrs4J4HYMplZOZ6dnU9gYbJNg=s96-c',
//       locale: 'en'
//     }
//   }
