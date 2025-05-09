import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "토큰이 필요합니다." });
  }

  try {
    const decoded = jwt.verify(token, "KimSecret");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "유효하지 않은 토큰입니다." });
  }
};

export default authMiddleware;
