import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { cognitoId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        cognitoId: cognitoId,
      },
    });
    
    if (!user) {
      res.status(404).json({ message: `User with cognitoId ${cognitoId} not found` });
      return;
    }
    
    res.json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user: ${error.message}` });
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      cognitoId,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
    } = req.body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        cognitoId: cognitoId,
      },
    });
    
    if (existingUser) {
      res.json({ message: "User already exists", user: existingUser });
      return;
    }
    
    const newUser = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId,
      },
    });
    res.json({ message: "User Created Successfully", newUser });
  } catch (error: any) {
    // Handle specific errors
    if (error.code === 'P2002') {
      res.status(409).json({ message: `Unique constraint failed: ${error.meta?.target}` });
    } else {
      res.status(500).json({ message: `Error creating user: ${error.message}` });
    }
  }
};