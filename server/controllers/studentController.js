// controllers/studentController.js
import prisma from '../prisma/client.js'

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany()
    res.json(students)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch students' })
  }
}

// Add a new student
export const createStudent = async (req, res) => {
  const { name, email, password, grade } = req.body
  try {
    const newStudent = await prisma.student.create({
      data: { name, email, password, grade },
    })
    res.json(newStudent)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create student' })
  }
}
