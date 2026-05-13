import { Request, Response } from 'express'
import { prisma } from '../lib/prisma.js'
import { Prisma } from '@prisma/client'
//getAllPosts
export const getAllPosts = async (req: Request, res: Response) => {
    try{
        const page = Number(req.query.page) 
        const limit = Number(req.query.limit)
        const search = req.query.search as string | undefined
        const categoryId = req.query.category as string | undefined

        const skip = (page -1) * limit

        const where: Prisma.PostWhereInput = {
            published: true,
            ...(search && {
                OR: [
                    {title: {contains: search}},
                    {content: { contains: search}},
                ],
            }),
            ...(categoryId && { categoryId}),
        }

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where,
                skip,
                take: limit,
                include: {
                    author: {select: {id: true, name: true, email: true}},
                    category: true,
                    tags: true,
                    _count: {select: {comments:true}}
                },
                orderBy: {createdAt:'desc'}
            }),
            prisma.post.count({where})
        ])

        res.json({
            data: posts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total/limit),
            },

        })
    }
    catch (error){
        res.status(500).json({error})
    }
}

export const getPostById = async (req: Request, res: Response) => {
    try{
        const id = req.params.id as string
        const post = await prisma.post.findUnique({
            where: {id},
            include: {
                author: {select:{id: true, name: true, email: true}},
                category: true,
                tags: true,
                comments: {
                    include: {
                        author: {select:{id: true, name: true}},
                    },
                    orderBy:{createdAt: 'desc'}
                }
            }
        })
        if (!post) return res.status(400).json({error:'k thấy post'})
        res.json(post)
    }
    catch(error){
        res.status(500).json({error})
    }
}

export const createPost = async (req: Request, res: Response) => {
    try{
        const {title, content, categoryId, tagIds, published} = req.body
        if (!title || !content){
            return res.status(400).json({error: "Thiếu yếu tố tạo post"})
        }
        const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        + '-' + Date.now()

        const post = await prisma.post.create({
            data:{
                title,
                slug,
                content,
                published: published ?? true,
                authorId: req.userId as string,
                ...(categoryId && {categoryId}),
                ...(tagIds &&{
                    tags: {connect: tagIds.map((id:string)=> ({id}))},
                }),
            },
            include : {
                author: { select : {id: true, name: true}},
                category: true,
                tags: true
            },
        })
        res.status(201).json(post)
    }
    catch (error){
        res.status(500).json ({error})
    }
}

export const updatePost = async (req: Request, res: Response) => {
    try{
        const id = req.params.id as string
        const {title, content, categoryId, published} = req.body
        
        const existing = await prisma.post.findUnique({where:{id}})
        if (!existing) return res.status(404).json({error:'ko thấy post'})
        if (existing.authorId !== req.userId){
            return res.status(403).json({error:'ko có quyền sửa'})
        }

        const post = await prisma.post.update({
            where: {id},
            data:{title, content, categoryId, published}
        })
        res.json(post)
    }
    catch (error){
        res.status(500).json ({error})
    }
} 

export const deletePost = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const existing = await prisma.post.findUnique({where:{id}})
        if (!existing) return res.status(404).json({error:'K tìm thấy pốt'})
        if (existing.authorId !== req.userId) {
            return res.status(403).json({error: ' k có quyền xoá'})
        }

        await prisma.post.delete({where:{id}})
        res.status(204).send()
    }
    catch (error){
        res.status(500).json ({error})
    }
}