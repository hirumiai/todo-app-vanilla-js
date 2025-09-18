// Menangkap elemen-elemen penting dari HTML
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

//Array untuk menyimpan semua data to-do
let todos = [];

// Menambahkan event listener ke form saat disubmit
todoForm.addEventListener('submit', function(event) {
    // Mencegah halaman refresh saat form disubmit
    event.preventDefault();

    // Mengambil teks dari input dan membersihkan spasi
    const newTodoText = todoInput.value.trim();

    // Cek apakah input tidak kosong
    if (newTodoText !== '') {
        // Membuat object to-do baru
        const newTodo = {
            id: Date.now(), // ID unik menggunakan timestamp
            text: newTodoText,
            completed: false // Status awal, belum selesai
        };

        // Menambahkan object baru ke dalam array todos
        todos.push(newTodo);

        // Mengosongkan kembali input field
        todoInput.value = '';

        // Menggambar ulang daftar tugas di layar
        renderTodos();
    }
});

// Fungsi untuk me-render atau menampilkan semua to-do ke layar
function renderTodos() {
    // Kosongkan dulu list yang ada di HTML
    todoList.innerHTML = '';

    // Looping setiap object di dalam array todos
    todos.forEach(function(todo) {
        // Buat elemen <li> baru
        const li = document.createElement('li');

        // Isi teks <li> dengan teks dari object todo
        li.textContent = todo.text;

        // Tambahkan atribut 'data-id' untuk menyimpan ID unik
        li.setAttribute('data-id', todo.id);

        // Jika status todo 'completed', tambahkan class 'completed'
        if (todo.completed) {
            li.classList.add('completed');
        }

        // Masukkan <li> yang sudah jadi ke dalam <ul>
        todoList.appendChild(li);
    });
}

// menambahkan event listener ke <ul> untuk menangani klik pada <li>
todoList.addEventListener('click', function(event) {
    //cek apakah yang di klik adalah element li
    if (event.target.tagName === 'LI') {
        //ambil ID dari atribut 'data-id' yang di klik
        const clickedId = Number(event.target.getAttribute('data-id'));

        //cari todo di dalam array yang ID nya cocok
        const todoToToggle = todos.find(function(todo) {
            return todo.id === clickedId;
        });

        //balik status 'completed' nya (true jadi false, false jadi true)
        todoToToggle.completed = !todoToToggle.completed;

        //gambar ulang listnya dengan data yang sudah di update
        renderTodos();
        }
});