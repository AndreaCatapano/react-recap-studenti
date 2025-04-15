import courses from "../data/courses.js";



function randomCourse() {
    const randomNumber = Math.floor(Math.random() * courses.length)
    return courses[randomNumber];
}


export default randomCourse;