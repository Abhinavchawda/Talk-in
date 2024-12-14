import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "1d"
    });
    res.cookie("jwt", token, {
        httpOnly: true, //prevent us from xxs attacks
        secure: true,
        sameSite: true  //prevent us from csrf attacks
    })
};

export default createTokenAndSaveCookie;