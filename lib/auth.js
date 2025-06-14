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

// export const decodeToken = async () => {

//     const token =  localStorage.getItem('token') 
//     console.log(token, 'token from localStorage');
    
//     if (!token) {
//         return {
//             valid: false,
//             error: 'No token provided',
//         }
//     }
    
//     try {
//         const decoded = jwt.decode(token)
//         console.log(decoded, 'decoded token');
        
//         if (!decoded) {
//             return {
//                 role: '',
//             }
//         }
//         return {
//             role: decoded.role,
//         }
//     } catch (error) {
//         return {
//             valid: false,
//             error: 'Invalid or expired token',
//         }
//     }
// }

export const decodeToken = () => {
    if (typeof window === 'undefined') return null

    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const decoded = jwt.decode(token)
        console.log(decoded, 'decoded token from localStorage');
        
        return decoded?.role || null
    } catch (e) {
        return null
    }
}