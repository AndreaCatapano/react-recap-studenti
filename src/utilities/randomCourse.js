import courses from "../data/courses.js";

const randomCourse = () => {
    const randomNumber = Math.floor(Math.random() * courses.length)
    return courses[randomNumber];
}

export default randomCourse;