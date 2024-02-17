(function () {

	const tableBody = document.getElementById('tBody');
	const errorMessageElement = document.getElementById('errorMessage');
	let num = 1;
	const arrStudents = [];

	function formHandler() {
		const name = document.getElementById("inputDateName").value.trim();
		const surname = document.getElementById('inputDateSurname').value.trim();
		const patronymic = document.getElementById('inputDatePatronymic').value.trim();
		const dateBirth = document.getElementById('inputDateBirth').value.trim();
		const studYear = parseInt(document.getElementById('inputDateYear').value.trim());
		const faculty = document.getElementById('inputDateFaculty').value.trim();

		errorMessageElement.textContent = '';

		if (!name || !surname || !patronymic || !dateBirth || !studYear || !faculty) {
			errorMessageElement.textContent = 'Все поля обязательны для заполнения.';
			return;
		}

		const dDate = new Date(dateBirth);
		const currentYear = new Date().getFullYear();

		if (dDate < new Date('1900-01-01') || dDate > new Date()) {
			errorMessageElement.textContent = 'Дата рождения должна быть в диапазоне от 01.01.1900 до текущей даты.';
			return;
		}

		if (studYear < 1930 || studYear > currentYear) {
			errorMessageElement.textContent = 'Год начала обучения должен быть в диапазоне от 1930 до текущего года.';
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
		[name, surname, patronymic, dateBirth, studYear, faculty].forEach(input => input.value = '');
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
		tableBody.textContent = '';

		arr.forEach((student, index) => {
			num = index + 1;
			tableBody.innerHTML += getStudentItem(student);
		});
	}

	function initColSort() {
		let ascending = false;

		const addSortListener = (element, property) => {
			element.addEventListener('click', function () {
				ascending = !ascending;
				sortFunc(arrStudents, property, ascending);
				renderStudentsTable(arrStudents);
			});
		};

		addSortListener(document.getElementById("firstName"), "firstName");
		addSortListener(document.getElementById("surname"), "surname");
		addSortListener(document.getElementById("patronymic"), "patronymic");
		addSortListener(document.getElementById("dateBirth"), "dateBirth");
		addSortListener(document.getElementById("studYear"), "studYear");
		addSortListener(document.getElementById("faculty"), "faculty");
	}

	function tablFiltr(arr, prop, value) {
		return arr.filter(item => String(item[prop]).toLowerCase().includes(value));
	}

	function initTablFiltr(arr) {
		let filteredArray = [...arr];
		const filtrFirstName = document.getElementById('filtrFirstName').value.trim().toLowerCase();
		const filtrSurname = document.getElementById('filtrSurname').value.trim().toLowerCase();
		const filtrPatronymic = document.getElementById('filtrPatronymic').value.trim().toLowerCase();
		const filtrDateBirth = document.getElementById('filtrDateBirth').value.trim().toLowerCase();
		const filtrStudYear = document.getElementById('filtrStudYear').value.trim().toLowerCase();
		const filtrFaculty = document.getElementById('filtrFaculty').value.trim().toLowerCase();

		if (filtrFirstName) filteredArray = tablFiltr(filteredArray, 'firstName', filtrFirstName);
		if (filtrSurname) filteredArray = tablFiltr(filteredArray, 'surname', filtrSurname);
		if (filtrPatronymic) filteredArray = tablFiltr(filteredArray, 'patronymic', filtrPatronymic);
		if (filtrDateBirth) filteredArray = tablFiltr(filteredArray, 'dateBirth', filtrDateBirth);
		if (filtrStudYear) filteredArray = tablFiltr(filteredArray, 'studYear', filtrStudYear);
		if (filtrFaculty) filteredArray = tablFiltr(filteredArray, 'faculty', filtrFaculty);

		renderStudentsTable(filteredArray);
	}

	document.addEventListener('DOMContentLoaded', function () {
		if (!tableBody.innerHTML.trim()) {
			arrStudents.forEach((student) => {
				num = student.number;
				tableBody.innerHTML += getStudentItem(student);
			});
		}

		document.getElementById('studentForm').addEventListener('submit', function (event) {
			event.preventDefault();
			const student = formHandler();
			if (student) {
				arrStudents.push(student);
				tableBody.innerHTML += getStudentItem(student);
			} else {
				console.log('Не удалось добавить студента в таблицу: некоторые элементы формы не найдены.');
			}
		});

		initColSort();

		document.getElementById('filterStudentForm').addEventListener('submit', function(event) {
			event.preventDefault();
			initTablFiltr(arrStudents);
		});
	});

})();