const routes = require('express').Router()
const {addProject , approveProject,rejectProject ,teacherProjects, studentProjects ,deleteProject} = require('../controllers/projectController')
const {verifyToken} = require('../middleware/authmiddleware')

routes.post("/addproject", addProject)
routes.patch("/project/:id/approve",  approveProject)
routes.patch("/project/:id/reject", rejectProject)
routes.get('/student/projects' , studentProjects)
routes.delete('/delete/project/:id' , deleteProject)
routes.get('/teacher/projects', teacherProjects)

module.exports = routes