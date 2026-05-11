import {Request, Response } from 'express'
import { prisma } from '../lib/prisma.js'

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany()
        res.json(categories)
    }
    catch (error){
        res.status(500).json({error})
    }
}

export const createCategory = async (req: Request, res: Response) => {
    try {
        const {name} = req.body
        if (!name) 
            return res.status(400).json({error : 'Thiếu thông tin'})
        const category = await prisma.category.create({
            data: {name}
        })
        res.status(201).json(category)
    }
    catch (error){
        res.status(500).json({error})
    }
}