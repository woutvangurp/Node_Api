const { application } = require("express");
const beer = require("./models/Model");
const user = require("./models/User");
const auth = require("./middleware/auth");


application.post("/register", async (req, res) =>
{
    try {
    // user data
    const { first_name, last_name, email, password } = req.body;

    // validatie
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("alles invoeren A.U.B.");
    }

    // usercheck
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User bestaat al, ga naar de login asjeblieft");
    }

    //hashen
    encryptedPassword = await bcrypt.hash(password, 10);

    // aanmaken
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // case insensetive
      password: encryptedPassword,
    });

    // tokens maken
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h", //wanneer die stopt met werken
      }
    );
    // opslaan
    user.token = token;

    // returnen
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
    try {
        // user data
        const { email, password } = req.body;
    
        // validation
        if (!(email && password)) {
          res.status(400).send("alles invoeren A.U.B.");
        }
        // db validate
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // tokens
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // tokens opslaan
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
    console.log(err);
    }
});

app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });