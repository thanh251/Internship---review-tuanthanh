import  { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma.js'

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-doi-sau'

//POST api/auth/REGISTER
export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password} = req.body
        if (!name || !email || !password){
            return res.status(400).json({error: 'Thiếu thông tin'})
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password,10)

        const user = await prisma.user.create({
            data: {name, email, password: hashedPassword}
        })

        //trả về user bỏ pass
        const { password:_, ...userWithoutPassword} = user
        res.status(201).json(userWithoutPassword)
    }
    catch (error){
        res.status(500).json({error})
    }
}

//Post api/auth/LOGIN
export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        if (!email || !password){
            return res.status(400).json({error: 'Thiếu thông tin'})
        }
        const user = await prisma.user.findUnique({where: {email}})
        if (!user){
            return res.status(401).json({error: 'Email hoặc password không đúng'})   
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(401).json({error: 'Tài khoản hoặc mật khẩu không đúng'})
        }
        const token = jwt.sign(
            {userId: user.id,
             email: user.email
            },
            JWT_SECRET,
            {expiresIn: '2d'}
        )
        res.json({token})
    }
    catch (error){
        return res.status(500).json({error: 'Lỗi Server'})
    }
}