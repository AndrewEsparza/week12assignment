document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("student-form");
    const studentNameInput = document.getElementById("student-name");
    const studentIdInput = document.getElementById("student-id");
    const studentList = document.getElementById("student-list");

    // Store students in an array of objects
    const students = [];

    // Function to add a student
    function addStudent(studentName, studentId) {
        if (studentName.trim() === "" || studentId.trim() === "") return;

        const student = {
            id: Date.now(),
            name: studentName,
            studentId: studentId,
        };

        students.push(student);
        displayStudent(student);
        studentNameInput.value = "";
        studentIdInput.value = "";
    }

    // Function to display a student
    function displayStudent(student) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${student.name} (ID: ${student.studentId})</span>
            <button class="edit" data-id="${student.id}">Edit</button>
            <button class="delete" data-id="${student.id}">Delete</button>
        `;
        studentList.appendChild(li);
    }

    // Function to remove a student
    function removeStudent(studentId) {
        const index = students.findIndex((student) => student.id === studentId);
        if (index !== -1) {
            students.splice(index, 1);
            document.querySelector(`[data-id="${studentId}"]`).parentNode.remove();
        }
    }

    // Function to edit a student
    function editStudent(studentId) {
        const newName = prompt("Edit student name:", students.find((student) => student.id === studentId).name);
        const newStudentId = prompt("Edit student ID:", students.find((student) => student.id === studentId).studentId);
        if (newName !== null && newStudentId !== null) {
            const student = students.find((student) => student.id === studentId);
            student.name = newName;
            student.studentId = newStudentId;
            const studentElement = document.querySelector(`[data-id="${studentId}"]`).parentNode;
            studentElement.firstChild.textContent = `${newName} (ID: ${newStudentId})`;
        }
    }

    // Event listener for form submission
    studentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        addStudent(studentNameInput.value, studentIdInput.value);
    });

    
    studentList.addEventListener("click", function (e) {
        if (e.target.classList.contains("edit")) {
            editStudent(parseInt(e.target.getAttribute("data-id")));
        } else if (e.target.classList.contains("delete")) {
            removeStudent(parseInt(e.target.getAttribute("data-id")));
        }
    });
});
