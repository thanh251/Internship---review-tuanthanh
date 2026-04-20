import { Request, Response } from 'express'
import { prisma } from '../lib/prisma.js'


export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId as string

    const post = await prisma.post.findUnique({ where: { id: postId } })
    if (!post) return res.status(404).json({ error: 'Không tìm thấy post' })

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json(comments)
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' })
  }
}


export const createComment = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId as string
    const { content } = req.body

    if (!content) return res.status(400).json({ error: 'Thiếu nội dung comment' })

    const post = await prisma.post.findUnique({ where: { id: postId } })
    if (!post) return res.status(404).json({ error: 'Không tìm thấy post' })

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: req.userId as string,
      },
      include: {
        author: { select: { id: true, name: true } },
      },
    })

    res.status(201).json(comment)
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' })
  }
}


export const updateComment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    const { content } = req.body

    if (!content) return res.status(400).json({ error: 'Thiếu nội dung comment' })

    const existing = await prisma.comment.findUnique({ where: { id } })
    if (!existing) return res.status(404).json({ error: 'Không tìm thấy comment' })
    if (existing.authorId !== req.userId) {
      return res.status(403).json({ error: 'Không có quyền sửa comment này' })
    }

    const comment = await prisma.comment.update({
      where: { id },
      data: { content },
    })

    res.json(comment)
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' })
  }
}


export const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string

    const existing = await prisma.comment.findUnique({ where: { id } })
    if (!existing) return res.status(404).json({ error: 'Không tìm thấy comment' })
    if (existing.authorId !== req.userId) {
      return res.status(403).json({ error: 'Không có quyền xóa comment này' })
    }

    await prisma.comment.delete({ where: { id } })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' })
  }
}