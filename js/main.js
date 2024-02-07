(function () {

	const tableBody = document.getElementById('tBody');

	let num = 1;

	function formHandler() {

		const name = document.getElementById("inputDateName").value.trim();
		const surname = document.getElementById('inputDateSurname').value.trim();
		const patronymic = document.getElementById('inputDatePatronymic').value.trim();
		const dateBirth = document.getElementById('inputDateBirth').value.trim();
		const studYear = parseInt(document.getElementById('inputDateYear').value.trim());
		const faculty = document.getElementById('inputDateFaculty').value.trim();

		const errorMessageElement = document.getElementById('errorMessage');
		errorMessageElement.innerHTML = '';

		if (!name || !surname || !patronymic || !patronymic || !dateBirth || !studYear || !faculty) {
			errorMessageElement.innerHTML = 'Все поля обязательны для заполнения.';
			return;
		}

		const dDate = new Date(dateBirth);
		const currentYear = new Date().getFullYear();

		if (dDate < new Date('1900-01-01') || dDate > new Date()) {
			errorMessageElement.innerHTML = 'Дата рождения должна быть в диапазоне от 01.01.1900 до текущей даты.';
			return;
		}

		if (studYear < 1930 || studYear > currentYear) {
			errorMessageElement.innerHTML = 'Год начала обучения должен быть в диапазоне от 1930 до текущего года.';
			return;
		}

		const student = {
			number: num,
			firstName: name,
			surname: surname,
			patronymic: patronymic,
			dateBirth: dateBirth,
			studYear: studYear,
			faculty: faculty
		};
		[name, surname, patronymic, dateBirth, studYear, faculty].value = '';
		return student;
	}


	function getStudentItem(student) {
		const age = new Date().getFullYear() - new Date(student.dateBirth).getFullYear();
		const birth = new Date(student.dateBirth);
		const endYear = student.studYear + 4;
		const course = endYear <= new Date().getFullYear() ? 'закончил' : `${new Date().getFullYear() - student.studYear + 1} курс`;
		return `
        <tr>
					<th scope='row'>${num++}</th>
          <td>${student.firstName}</td>
          <td>${student.surname}</td>
          <td>${student.patronymic}</td>
          <td>${student.dateBirth} (${age} лет)</td>
          <td>${student.studYear}-${endYear} (${course})</td>
					<td>${student.faculty}</td>
					</tr>
					`;
				}
				
	function sortFunc(arr, prop, dir) {
		arr.sort((a, b) => {
			const A = String(a[prop]).toLowerCase();
			const B = String(b[prop]).toLowerCase();

			return dir ? A.localeCompare(B) : B.localeCompare(A);
		});
		renderStudentsTable(arr);
		
	}

	function renderStudentsTable(arr) {
		tableBody.innerHTML = '';

		arr.forEach((student, index) => {
			num = index + 1;
			tableBody.innerHTML += getStudentItem(student);
		});
	}

	function initColSort() {
		dir = false;

    const name = document.getElementById("firstName").addEventListener('click', function () {
			dir = !dir;
			sortFunc(arrStudents, "firstName", dir);
      renderStudentsTable(arrStudents);
    });
    const surname = document.getElementById('surname').addEventListener('click', function () {
      dir = !dir;
			sortFunc(arrStudents, "surname", dir);
      renderStudentsTable(arrStudents);
    });
    const patronymic = document.getElementById('patronymic').addEventListener('click', function () {
      dir = !dir;
			sortFunc(arrStudents, "patronymic", dir);
      renderStudentsTable(arrStudents);
    });
    const dateBirth = document.getElementById('dateBirth').addEventListener('click', function () {
      dir = !dir;
			sortFunc(arrStudents, "dateBirth", dir);
      renderStudentsTable(arrStudents);
    });
    const studYear = document.getElementById('studYear').addEventListener('click', function () {
      dir = !dir;
			sortFunc(arrStudents, "studYear", dir);
      renderStudentsTable(arrStudents);
    });
    const faculty = document.getElementById('faculty').addEventListener('click', function () {
      dir = !dir;
			sortFunc(arrStudents, "faculty", dir);
      renderStudentsTable(arrStudents);
    });
  }

	function tablFiltr(arr, prop, value) {
		let result = [];
		let copyArr = [...arr];
		for (const item of copyArr) {
			if (String(item[prop]).toLowerCase().includes(value)) result.push(item);
		}
		return result;
	}
	
	function initTablFiltr(arr) {
		let copy = [...arr];
		const name = String(document.getElementById('filtrFirstName').value).toLowerCase();
		const surname = String(document.getElementById('filtrSurname').value).toLowerCase();
		const patronymic = String(document.getElementById('filtrPatronymic').value).toLowerCase();
		const dateBirth = String(document.getElementById('filtrDateBirth').value).toLowerCase();
		const studYear = String(document.getElementById('filtrStudYear').value).toLowerCase();
		const faculty = String(document.getElementById('filtrFaculty').value).toLowerCase();
	
		if (name !== '') copy = tablFiltr(copy, 'firstName', name);
		if (surname !== '') copy = tablFiltr(copy, 'surname', surname);
		if (patronymic !== '') copy = tablFiltr(copy, 'patronymic', patronymic);
		if (dateBirth !== '') copy = tablFiltr(copy, 'dateBirth', dateBirth);
		if (studYear !== '') copy = tablFiltr(copy, 'studYear', studYear);
		if (faculty !== '') copy = tablFiltr(copy, 'faculty', faculty);
	
		renderStudentsTable(copy);
	}


	document.addEventListener('DOMContentLoaded', function () {
		if (!tableBody.innerHTML.trim()) {
			arrStudents.forEach((student) => {
				num = student.number;
				tableBody.innerHTML += getStudentItem(student);
			});
		};
		const form = document.getElementById('studentForm').addEventListener('submit', function (event) {
			event.preventDefault();
			
			const student = formHandler();
			if (student) {
				arrStudents.push(student);
				
				const newItem = getStudentItem(student);
				tableBody.innerHTML += newItem;
				
			} else {
				console.error('Элемент тела таблицы не найден');
			}
		});
		
		initColSort()
		const filtrForm = document.getElementById('filterStudentForm').addEventListener('submit', function(event) {
			event.preventDefault();
			const copy = [...arrStudents]
			initTablFiltr(copy);
		})
		
	});
})();

