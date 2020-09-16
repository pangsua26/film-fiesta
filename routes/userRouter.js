const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


router.post("/register", async (req, res) => {
    try {
        let { email, password, passwordCheck, displayName } = req.body;//get info from body 

        //validate requirements for registering

        if (!email || !password || !passwordCheck)
            return res.status(400).json({ msg: "not all fields entered" });

        if (password.length < 5)
            return res.status(400).json({ msg: "password not at least 5 characters long" });

        if (password !== passwordCheck)
            return res.status(400).json({ msg: "enter the same password twice for verification" });
        const existingUser = await User.findOne({ email: email })
        if (existingUser)
            return res.status(400).json({ msg: "An account with this email already exists" })


        if (!displayName) displayName = email;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt) // turns password into gibberish 

        const newUser = new User({
            email,
            password: passwordHash,
            displayName
        });
        const savedUser = await newUser.save();
        res.json(savedUser);


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;


        // validate 
        if (!email || !password)


            return res.status(400).json({ msg: "Not all fields have been entered" });


        const user = await User.findOne({ email: email });
        if (!user)
            return res
            .status(400)
            .json({ msg: "No account with this email has been registered" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "invalid credentials" });

        let token = jwt.sign({ id: user._id }, process.env.jwtSecret);// stores which users have been logged in 
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// if you want to delete your account (but you must have an account to actually delete)
//before delete happens, auth is the middleware function in authjs that will run before the route to deem if user has acct.
router.delete("/delete", auth, async (req, res) => { 
    console.log(req.user);
try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser)
} catch (err) {
    res.status(500).json({ error: err.message });
}
});


// endpoint thats true or false that we have a token and that it is valid 
router.post("/tokenIsValid", async (req, res) => {
    console.log("/tokenIsWorkingRightNow")
    try {
        let token = req.header("x-auth-token");
        if (!token) 
        return res.json(false);

        const verified = jwt.verify(token, process.env.jwtSecret);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false); 

        return res.json(true);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", auth, async (req, res) => {
    let user = await User.findById(req.user);
    res.json( {
        displayName: user.displayName,
        id: user._id
}
    );
});

module.exports = router;