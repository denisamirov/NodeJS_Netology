abstract class BookRepository {
    id: string;
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string


    createBook(book:object) {
        console.log(`new boo ${book}`)
    }
    getBook(id:string) {
        console.log(`get book with id - ${id}`)
    }
    getBooks() {
        console.log("ok")
    }
    updateBook(id:string) {
        console.log(`update book with id - ${id}`)
    }
    deleteBook(id:string) {
        console.log(`delete book with id - ${id}`)
    }
}