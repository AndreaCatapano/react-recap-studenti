import { useEffect, useState } from 'react'
import randomCourse from './utilities/randomCourse.js'
import randomStatus from './utilities/randomStatus.js'
import './App.css'
import axios from 'axios'
import courses from './data/courses.js'


const student = {
  name: "",
  course: "",
  status: true
}



const url = "https://jsonplaceholder.typicode.com/users"

function App() {



  const [students, setStudents] = useState([])
  const [displayData, setDisplayData] = useState(students)
  const [newStudent, setNewStudent] = useState(student)
  const [filterCourse, setFilterCourse] = useState("")
  const [filterName, setFilterName] = useState("")
  const [cardstudentModify, setCardstudentModify] = useState(false)
  const [error, setError] = useState("")


  function fetchStudent() {
    axios.get(url).then(res => {
      const student = {
        id: res.data.id,
        name: res.data.name,
        course: randomCourse,
        status: randomStatus
      }
      setStudents(res.data);
    }).catch(err => console.error(err))
  }


  function handleNewStudent(e) {
    const value = e.target.value

    setNewStudent(newStudent => ({
      ...newStudent,
      id: Math.max(...students.map(student => student.id)) + 1,
      [e.target.name]: value
    }))
  }


  function handleSubmit(e) {
    e.preventDefault();
    setStudents([...students, newStudent])
    setNewStudent(student)
  };



  useEffect(fetchStudent, [])


  useEffect(() => {
    const filtered = students
      .filter(student => student.name?.toLowerCase().includes(filterName.toLowerCase()))
      .filter(student => student.course?.toLowerCase().includes(filterCourse.toLowerCase()) ||
        randomCourse().toLowerCase().includes(filterCourse.toLowerCase()))

    setDisplayData(filtered);
  }, [filterName, filterCourse, students])





  return (
    <>
      <main className="container">
        <h1>Gestione Studenti</h1>

        <div id="status-message" className="status-message"></div>

        <section className="form-section">
          <h2>Aggiungi Studente</h2>
          <form id="student-form" onSubmit={handleSubmit}>
            <label>
              Nome:
              <input type="text" value={newStudent.name} onChange={handleNewStudent} name="name" required />
            </label>
            <label>
              Corso:
              <input type="text" value={newStudent.course} onChange={handleNewStudent} name="course" required />
            </label>
            <label>
              Stato:
              <select name="status" value={newStudent.status} onChange={handleNewStudent} required>
                <option value="active">Attivo</option>
                <option value="inactive">Inattivo</option>
              </select>
            </label>
            <button type="submit">Aggiungi</button>
          </form>
        </section>

        <section className="filter-section">
          <h2>Filtra</h2>
          <input type="text" id="filter-name" value={filterName} onChange={e => setFilterName(e.target.value)} placeholder="Filtra per nome" />
          <input type="text" id="filter-course" value={filterCourse} onChange={e => setFilterCourse(e.target.value)} placeholder="Filtra per corso" />
        </section>

        <section className="list-section">
          <div className="list-header">
            <h2>Elenco Studenti</h2>
            <div className="sort-controls">
              <label>Ordina per:</label>
              <select id="sort-by">
                <option value="name">Nome</option>
                <option value="course">Corso</option>
              </select>
            </div>
          </div>
          <ul id="student-list">
            {displayData.map(student => (
              <li key={student.id}>
                <div>
                  <strong>{student.name}</strong> - {student.course}
                  <span className="status">{randomStatus() ? "active" : "inactive"}</span>
                </div>
                <div className="actions">
                  <button className="edit-btn">Modifica</button>
                  <button className="delete-btn">Elimina</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export default App
