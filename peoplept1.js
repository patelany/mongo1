// #1. List all people. (200)
db.people.find();

// #2. Count all people. (200)
db.people.find().count();

// #3. List all people in Arizona. (6)
db.people.find({ state: "Arizona" });

// #4.List all males in Arizona. (2)
db.people.find({ gender: "Male", state: "Arizona" });
//or
db.people.find({ $and: [{ state: "Arizona", gender: "Male" }] });

// #5. List all people in Arizona plus New Mexico. (8)
db.people.find({ $or: [{ state: "Arizona" }, { state: "New Mexico" }] });

// #6. List all people under age 40. (90)
db.people.find({ age: { $lt: 40 } });

// #7. List all females in Florida between the ages of 40 and 45 (inclusive). (4)
db.people.find({
  $and: [
    { gender: "Female" },
    { state: "Florida" },
    { age: { $gte: 40, $lte: 45 } },
  ],
});

// #8. List people whose first name starts with "H". (2)
// v1: - regular expression (lowercase i is for ignore casing)
db.people.find({ first_name: /^H/i });

// v2:
db.people.find({ first_name: { $gte: "H", $lt: "I" } });

// #9. List all people in Michigan, sorted by first name. (6)
// the 1 is for ascending order.. -1 would show descending order
db.people.find({ state: "Michigan" }).sort({ first_name: 1 });

// #10. List all people who live in Virginia or are named Virginia
db.people.find({ $or: [{ first_name: "Virginia" }, { state: "Virginia" }] });

// #11. List the names of people under age 30. Only display their first and last name. (38)
db.people.find(
  { age: { $lt: 30 } },
  { first_name: true, last_name: true, _id: false }
);

// #12. List all people in Montana. Display all information except age. (2)
db.people.find({ state: "Montana" }, { age: false });

// #13. List the email addresses of people with a ".edu" email. Only display the email. (12)
//$ means it ends with .edu
db.people.find({ email: /\.edu$/ }, { email: true, _id: false });

// #14. Count all people with at least one child under age four. (69)
db.people.find({ "children.age": { $lt: 4 } }).count();
// v2:
db.people.find({ children: { $elemMatch: { age: { $lt: 4 } } } });

// #15. List people who have no children. (43)
db.people.find({ children: [] });
//v2:
db.people.find({ children: { $size: 0 } });
// v3:
db.people.find({ "children.0": { $exists: false } });

// #16. List people who have at least one child. (157)
db.people.find({ children: { $gte: [1] } });
//v2:
db.people.find({ children: { $gte: { $size: 1 } } });
//v3:
db.people.find({ children: { $not: { $size: 0 } } });
//v4:
db.people.find({ children: { $ne: [] } });
