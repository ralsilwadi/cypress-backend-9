/// <reference types='cypress'/>

const tgBaseURL = 'https://api.tech-global-training.com'

describe('TechGlobal Student APIs', () => {
  let instructor_id = Math.floor(Math.random() * 4 + 1)
  let studentData = {
    DOB: '2000-11-11',
    EMAIL: 'dimensionconqueror@gmail.com',
    FIRST_NAME: 'Emperor',
    LAST_NAME: 'Doe',
    INSTRUCTOR_ID: instructor_id,
  }
  let studentID

  it('TASK-1: Get All Instructors', () => {
    cy.request({
      method: 'GET',
      url: `${tgBaseURL}/instructors`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.length).to.be.gte(4)
      console.log(JSON.stringify(response.body, null, 2))
      response.body.forEach((instructor, index) => {
        expect(instructor).to.have.property('INSTRUCTOR_ID')
        expect(instructor).to.have.property('FULLNAME')
        expect(instructor).to.have.property('STUDENTS')
        expect(instructor.STUDENTS).is.an('Array')
        expect(instructor.INSTRUCTOR_ID).to.eq(index + 1)
      })
    })
  })

  it('TASK-2: Get A Single Instructor', () => {
    cy.request({
      method: 'GET',
      url: `${tgBaseURL}/instructors/${instructor_id}`,
    }).then((response) => {
      expect(response.status).to.eq(200)

      console.log(JSON.stringify(response.body, null, 2))

      expect(response.body.INSTRUCTOR_ID).to.eq(instructor_id)
      expect(response.body).to.have.property('FULLNAME')
      expect(response.body).to.have.property('STUDENTS')
      expect(response.body.STUDENTS).is.an('Array')
    })
  })

  it('TASK-3: Create a New Student and Validate the Instructor', () => {
    cy.request({
      method: 'POST',
      url: `${tgBaseURL}/students`,
      body: studentData,
    }).then((response) => {
      studentID = response.body.STUDENT_ID
      expect(response.status).to.eq(201)
      expect(response.body.INSTRUCTOR_ID).to.eq(instructor_id)

      cy.request({
        method: 'GET',
        url: `${tgBaseURL}/instructors/${instructor_id}`,
      }).then((response) => {
        expect(response.status).to.eq(200)

        console.log(JSON.stringify(response.body.STUDENTS, null, 2))

        const students = response.body.STUDENTS
        const studentIsThere = students.some((student) => student.STUDENT_ID === studentID)
        expect(studentIsThere).to.be.true
      })

      cy.request({
        method: 'DELETE',
        url: `${tgBaseURL}/students/${studentID}`,
      }).then((response) => {
        expect(response.status).to.eq(204)
      })
    })
  })
})
