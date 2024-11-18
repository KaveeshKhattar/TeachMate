import prisma from '../lib/prisma'
import { User } from '@prisma/client'


export async function createUser(data: User) {
  try {
    console.log('Creating user with data:', data);
    const user = await prisma.user.create({ data })
    console.log('User created:', user);
    return { user }
  } catch (error) {
    return { error }
  }
}
