1. Запросы для вставки коллекцию book


db.book.insertOne({"title": "Harry Potter", "description": "Wizard book", "autors": "Rowling"})


db.book.insertOne({"title":"Sherlock", "description":"clever man", "autors": "Doul"})



---------------------------------------------------

2. Запросы для поиска полей документов коллекции books по полю title


db.book.find({title: 'Harry Potter'})


---------------------------------------------------

3. Запрос для редактирования полей description и autors коллекции book по _id записи

db.book.updateOne({ _id: ObjectId("63ed1fa122267e80a59fc9bb")}, {$set: {"description": "Book about schoolboy", "autors": "Rowling J.K."}})
