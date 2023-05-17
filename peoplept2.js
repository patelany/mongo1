// People collection-----------------------------------------------------------
//Add a person to the collection. You pick the data, but they should have an empty array for children.
db.people.insertOne({
  first_name: "Anyssa",
  last_name: "Patel",
  email: "blahblah@idk.edu",
  gender: "Female",
  age: 25,
  state: "Michigan",
  children: [],
});

//Add another person. They should have at least two children.
db.people.insertOne({
  first_name: "Moose",
  last_name: "Patel",
  email: "hello@idk.edu",
  gender: "Male",
  age: 35,
  state: "California",
  children: [
    { name: "Moose jr", age: 1 },
    { name: "Mini", age: 2 },
  ],
});

//Update one person named Clarence. He moved from North Dakota to South Dakota.
db.people.updateOne(
  { first_name: "Clarence" },
  { $set: { state: "South Dakota" } }
);

//Update Rebecca Hayes. Remove her email address.
db.people.updateOne(
  { first_name: "Rebecca", last_name: "Hayes" },
  { $unset: { email: 1 } }
);

// Update everyone from Missouri. They all had a birthday today, so add one to their age. (expect 4 matches)
db.people.updateMany({ state: "Missouri" }, { $inc: { age: 1 } });

// Jerry Baker has updated information. Replace with a new document:
//{ first_name: "Jerry", last_name: "Baker-Mendez", email: "jerry@classic.ly", gender:"Male", age: 28, state: "Vermont", "children": [{name: "Alan", age: 18}, {name: "Jenny", age: 3}] }
db.people.replaceOne(
  { first_name: "Jerry", last_name: "Baker" },
  {
    first_name: "Jerry",
    last_name: "Baker-Mendez",
    email: "jerry@classic.ly",
    gender: "Male",
    age: 28,
    state: "Vermont",
    children: [
      { name: "Alan", age: 18 },
      { name: "Jenny", age: 3 },
    ],
  }
);

// Delete Wanda Bowman
db.people.deleteOne({ first_name: "Wanda", last_name: "Bowman" });

// Delete everyone who does not have an email address specified. (expect 36 matches - maybe more depending what you added above)
db.people.deleteMany({ email: null });

// Submissions collection-----------------------------------------------------------
//Add several documents to a new submissions collection. Do it all in one command.
db.submissions.insertMany([
  {
    title: "The River Bend",
    upvotes: 10,
    downvotes: 2,
    artist: db.people.findOne({ first_name: "Anna", last_name: "Howard" })._id,
  },
  {
    title: "Nine Lives",
    upvotes: 7,
    downvotes: 0,
    artist: db.people.findOne({ first_name: "Scott", last_name: "Henderson" })
      ._id,
  },
  {
    title: "Star Bright",
    upvotes: 19,
    downvotes: 3,
    artist: db.people.findOne({ first_name: "Andrea", last_name: "Burke" })._id,
  },
  {
    title: "Why Like This?",
    upvotes: 1,
    downvotes: 5,
    artist: db.people.findOne({ first_name: "Steven", last_name: "Marshall" })
      ._id,
  },
  {
    title: "Non Sequitur",
    upvotes: 11,
    downvotes: 1,
    artist: db.people.findOne({ first_name: "Gerald", last_name: "Bailey" })
      ._id,
  },
]);

// Add 2 upvotes for "The River Bend".
db.submissions.updateOne({ title: "The River Bend" }, { $inc: { upvotes: 2 } });

//Add a field round2 = true to all submissions with at least 10 upvotes. (expect 3 matches)
db.submissions.updateMany(
  { upvotes: { $gte: 10 } },
  { $set: { round2: true } }
);
