export const renderHome = (req, res) => {
  res.render("index", { title: "Gloryhole" });
};

// export const renderHome = (req, res) => {
//   const content = {
//     loggedIn: {
//       title: "Down, tiger.",
//       description: `This club's invite-only and spots are scarce as hen's teeth. You've been added to the waitlist — patience looks good on you, ${user?.username}`,
//     },
//     member: {
//       title: "Look who talked their way in.",
//       description: `That code did the trick — the door's open, ${user?.username}. Welcome to the club.`,
//     },
//   };

//   const user = req.user;
//   if (user) {
//     res.render("index", {
//       title: "Gloryhole",
//       welcomeCardTitle: content.loggedIn.title,
//     });
//   } else if (user && user.is_club_member) {
//     res.render("index", {
//       title: "Gloryhole",
//       welcomeCardTitle: content.loggedIn.title,
//     });
//   } else {
//     res.render("index", {});
//   }
// };
