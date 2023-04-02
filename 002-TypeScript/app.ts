abstract class BookRepository {
    id: string;
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string


    abstract createBook(book:object): void;
    abstract getBook(id:string): void;
    abstract getBooks(): void;
    abstract updateBook(id:string): void;
    abstract deleteBook(id:string): void;
}