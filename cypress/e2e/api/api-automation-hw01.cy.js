/// <reference types='cypress'/>

const tgBaseURL = 'https://api.tech-global-training.com/students'

describe('TechGlobal Student APIs', () => {
  let newStudent

  it('TASK-1: Get All Students', () => {
    cy.request({
      method: 'GET',
      url: `${tgBaseURL}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.length).to.be.gte(2)
      console.log(JSON.stringify(response.body, null, 2))
      response.body.forEach((student) => {
        expect(student).to.have.property('STUDENT_ID')
      })
    })
  })

  it('TASK-2: Create a New Student', () => {
    const studentData = {
      DOB: '2000-11-11',
      EMAIL: 'dimensionconqueror@gmail.com',
      FIRST_NAME: 'Emperor',
      LAST_NAME: 'Doe',
      INSTRUCTOR_ID: 2,
    }

    cy.request({
      method: 'POST',
      url: `${tgBaseURL}`,
      body: studentData,
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.STUDENT_ID).to.be.gt(2)
      newStudent = { ...studentData, STUDENT_ID: response.body.STUDENT_ID }
      console.log(JSON.stringify(response.body, null, 2))
      expect(response.body).to.include(newStudent)
    })
  })

  it('TASK-3: Get Newly Created Student', () => {
    cy.request({
      method: 'GET',
      url: `${tgBaseURL}/${newStudent.STUDENT_ID}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log(JSON.stringify(response.body, null, 2))
      expect(response.body).to.include({
        ...newStudent,
        DOB: '2000-11-11T00:00:00.000Z',
      })
    })
  })
  it('TASK-4: Update Newly Created Student with a Different Instructor', () => {
    const updatedData = {
      ...newStudent,
      INSTRUCTOR_ID: 3,
    }

    cy.request({
      method: 'PUT',
      url: `${tgBaseURL}/${newStudent.STUDENT_ID}`,
      body: updatedData,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.include(`Successfully updated ${newStudent.FIRST_NAME}`)
    })
  })

  it('TASK-5: Delete Newly Created Student', () => {
    cy.request({
      method: 'DELETE',
      url: `${tgBaseURL}/${newStudent.STUDENT_ID}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
