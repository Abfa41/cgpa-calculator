const gradePoints = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "F": 0
};

const subjectTable = document.getElementById("subjectTable");

const addSubjectBtn = document.getElementById("addSubjectBtn");
const calculateBtn = document.getElementById("calculateBtn");
const predictBtn = document.getElementById("predictBtn");
const resetBtn = document.getElementById("resetBtn");

addSubjectBtn.addEventListener("click", addSubject);
calculateBtn.addEventListener("click", calculateGPA);
predictBtn.addEventListener("click", predictCGPA);
resetBtn.addEventListener("click", resetAll);

// Add 5 subjects initially
for(let i = 0; i < 5; i++){
    addSubject();
}

function addSubject(){

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <input
                type="text"
                placeholder="Subject Name"
            >
        </td>

        <td>
            <input
                type="number"
                class="credit"
                min="1"
                placeholder="Credits"
            >
        </td>

        <td>
            <select class="grade">

                <option value="O">O</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="F">F</option>

            </select>
        </td>

        <td>
            <button
                class="delete-btn"
                onclick="deleteSubject(this)"
            >
                Delete
            </button>
        </td>
    `;

    subjectTable.appendChild(row);

}

function deleteSubject(button){

    button.parentElement.parentElement.remove();

}

function calculateGPA(){

    const rows = subjectTable.querySelectorAll("tr");

    let totalCredits = 0;
    let totalPoints = 0;

    rows.forEach(row=>{

        const credit = parseFloat(
            row.querySelector(".credit").value
        );

        const grade =
            row.querySelector(".grade").value;

        if(!isNaN(credit)){

            totalCredits += credit;

            totalPoints +=
                credit * gradePoints[grade];

        }

    });

    if(totalCredits === 0){

        alert("Please enter subject credits.");

        return;

    }

    const semesterGPA =
        totalPoints / totalCredits;

    document.getElementById(
        "semesterGPA"
    ).textContent = semesterGPA.toFixed(2);

    const currentCGPA = parseFloat(
        document.getElementById("currentCGPA").value
    );

    const completedCredits = parseFloat(
        document.getElementById("completedCredits").value
    );

    if(
        !isNaN(currentCGPA) &&
        !isNaN(completedCredits)
    ){

        const updatedCGPA =
        (
            currentCGPA * completedCredits +
            semesterGPA * totalCredits
        )
        /
        (
            completedCredits +
            totalCredits
        );

        document.getElementById(
            "updatedCGPA"
        ).textContent = updatedCGPA.toFixed(2);

    }
    else{

        document.getElementById(
            "updatedCGPA"
        ).textContent = "-";

    }

}

function predictCGPA(){

    const currentCGPA = parseFloat(
        document.getElementById("currentCGPA").value
    );

    const completedCredits = parseFloat(
        document.getElementById("completedCredits").value
    );

    const futureCredits = parseFloat(
        document.getElementById("futureCredits").value
    );

    const expectedGPA = parseFloat(
        document.getElementById("expectedGPA").value
    );

    if(
        isNaN(currentCGPA) ||
        isNaN(completedCredits) ||
        isNaN(futureCredits) ||
        isNaN(expectedGPA)
    ){

        alert("Please fill all fields.");

        return;

    }

    if(expectedGPA < 0 || expectedGPA > 10){

        alert("Expected GPA should be between 0 and 10.");

        return;

    }

    const projectedCGPA =
    (
        currentCGPA * completedCredits +
        expectedGPA * futureCredits
    )
    /
    (
        completedCredits +
        futureCredits
    );

    document.getElementById(
        "projectedCGPA"
    ).textContent = projectedCGPA.toFixed(2);

}

function resetAll(){

    document.getElementById("currentCGPA").value = "";
    document.getElementById("completedCredits").value = "";
    document.getElementById("futureCredits").value = "";
    document.getElementById("expectedGPA").value = "";

    document.getElementById("semesterGPA").textContent = "0.00";
    document.getElementById("updatedCGPA").textContent = "0.00";
    document.getElementById("projectedCGPA").textContent = "0.00";

    subjectTable.innerHTML = "";

    for(let i = 0; i < 5; i++){
        addSubject();
    }

}