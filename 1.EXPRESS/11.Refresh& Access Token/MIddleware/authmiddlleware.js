
//wihout jwt  simple example of auth middleware
export const authMiddelware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            console.log("No authorization header found");
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1]; // "Bearer abc123" -> "abc123"

        if (!token) {
            console.log("Token missing in authorization header");
            return res.status(401).json({ message: "Token missing" });
        }

        // console.log("Auth token:", token);
        // console.log("This is loggmiddleware");

        // Continue to the next middleware or route handler
        next();

    } catch (error) {
        console.log("Error in loggmiddleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};