const userSignIn = (req, res) => {
    res.render('./user/userSignIn')
}

const userSignUp = (req, res) => {
    res.render('./user/userSignUp')
}

const userHome = (req, res) => {
    res.send('hi')
    // res.render('./user/userSignIn')
}

module.exports = {
    userSignIn,
    userHome,
    userSignUp
}