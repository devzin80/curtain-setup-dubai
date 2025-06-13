import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

export const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

export const createToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'secret123',
        { expiresIn: '7d' },
    )
}


export const decodeToken = (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
      return {
        
        role: decoded.role,
        id: decoded.id,
        
      };
    } catch (error) {
      return {
        valid: false,
        error: 'Invalid or expired token',
      };
    }
}