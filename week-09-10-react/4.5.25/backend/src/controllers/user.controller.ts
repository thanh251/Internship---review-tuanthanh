import  {Request, Response } from 'express'
import { prisma } from '../lib/prisma.js'

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    }
    catch (error){
        res.status(500).json({error})
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const users = await prisma.user.findUnique ({
            where: {id}
        })
        res.status(404).json(users)
    }
    catch (error) {
        res.status(500).json({error})
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const { name, email, password} = req.body
        if (!name || !email || !password){
            return res.status(400).json({error: 'THiếu thông tin'})
        }
        const user = await prisma.user.create({
            data: {name, email, password}
        })
        res.status(201).json(user)
    }
    catch (error) {
        res.status(500).json({error})
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try{
        const id = req.params.id as string
        const user = await prisma.user.update({
            where: {id},
            data: req.body
        })
        res.json(user)
    }
    catch (error){
        res.status(500).json({error })
    }
}

export const deleteUser = async (req: Request, res:Response) => {
    try {
        const id = req.params.id as string
        const user = await prisma.user.delete({
            where: {id}
        })
        res.status(204).send()
    }
    catch (error){
        res.status(500).json({error})
    }
}