const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @router    GET api/profile/me
// @desc      Get current user profile
// @access    Private
router.get("/me", auth, async (req, res) => {
  try {
    // Get user profile from the profiles collection & get his name and avatar from the users collection
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

// @router    POST api/profile
// @desc      Create/Update user profile
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // Finds the validation errors in this request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      // Get user profile from the profiles collection
      let profile = await Profile.findOne({ user: req.user.id });

      // Update profile if it exists; https://mongoosejs.com/docs/tutorials/findoneandupdate.html
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true } //to return the document after update is applied; By default, findOneAndUpdate() returns the document as it was before update was applied;
        );

        return res.json(profile);
      }

      // Create profile if it doesnt exists
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @router    GET api/profile
// @desc      Get all profiles
// @access    Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]); // get all profiles & the name and avatar for each profile from the users collection
    res.json(profiles);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

// @router    GET api/profile/:user_id
// @desc      Get user profile
// @access    Public
router.get("/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]); // get user profile & the name and avatar for the user from the users collection

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (e) {
    // console.log(e.message);
    if (e.kind == "ObjectId") {
      //this is run when the user ID is invalid ObjectId
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.status(500).send("Server Error");
  }
});

// @router    DELETE api/profile
// @desc      Delete user posts, profile & the user itself
// @access    Private
router.delete("/", auth, async (req, res) => {
  try {
    //delete user posts
    //TODO

    //delete user profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //delete user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

// @router    PUT api/profile/experience
// @desc      Add profile experience
// @access    Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // Finds the validation errors in this request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) return res.status(400).json({ msg: "Profile not found" });

      profile.experience.unshift(newExp);
      await profile.save();

      res.json(profile);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @router    DELETE api/profile/experience/exp_id
// @desc      Delete profile experience
// @access    Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // .select(
    //   "experience" //get only the experience field with the profile;
    // );

    profile.experience = profile.experience.filter(
      exp => exp.id !== req.params.exp_id
    );

    await profile.save();

    res.json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

// @router    PUT api/profile/education
// @desc      Add profile education
// @access    Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Field of study is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // Finds the validation errors in this request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) return res.status(400).json({ msg: "Profile not found" });

      profile.education.unshift(newEdu);
      await profile.save();

      res.json(profile);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @router    DELETE api/profile/education/edu_id
// @desc      Delete profile education
// @access    Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // .select(
    //   "education" //get only the education field with the profile;
    // );

    profile.education = profile.education.filter(
      edu => edu.id !== req.params.edu_id
    );

    await profile.save();

    res.json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

// @router    GET api/profile/github/:username
// @desc      Get user repos from github
// @access    Public
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `http://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubClientSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github profile found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
