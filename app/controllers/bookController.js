const db = require('../configs/db');
const User = db.user;
const Book = db.book;
const Comment = db.comment
const asyncMiddleware = require("express-async-handler");

exports.createbook = asyncMiddleware(async (req, res) => {
    const book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        published_date: req.body.published_date,
        pages: req.body.pages,
        language: req.body.language,
        publisher_id: req.body.publisher_id
    });
    res.status(201).send({
        status: "book has been added"
    });
});

exports.books = asyncMiddleware(async (req, res) => {
    const book = await Book.findAll({
        attributes: ["id", "title", "author","published_date", "pages", "language", "publisher_id"],
        include: [
            {
                model: Comment,
                attributes: ["id", "message"],
                include: [
                    {
                        model: User,
                        attributes: ["id", "username"]
                    }
                ]
            }
        ]
    });

    res.status(200).json({
        description: "All Book",
        book: book
    });
});

exports.getBookById = asyncMiddleware(async (req, res) => {
    const book = await Book.findOne({
        attributes: ["id", "title", "author","published_date", "pages", "language", "publisher_id"],
        where:{
            id: req.params.id
        },
        include: [
            {
                model: Comment,
                attributes: ["id", "message"],
                include: [
                    {
                        model: User,
                        attributes: ["id", "username"]
                    }
                ]
            }
        ]
    });

    res.status(200).json({
        description: "Book",
        book: book
    });
});

exports.book = asyncMiddleware(async (req, res) => {
    const book_id = req.params.id;

    const book = await Book.findOne({
        where: {
            id: book_id
        },
        include: [
            {
                model: Comment,
                attributes: ["id", "name", "message"]
            }
        ]
    })
    if(!book){
        res.status(404).send({
            message: 'Id not found',
            book: book
        })
    }else{
        res.status(200).send(book)
    }
    
});

exports.update = asyncMiddleware(async (req, res) => {
    const book_id = req.params.id;
    
    const { title, author, pages, language } = req.body;

    const book = await Book.update({
        title: req.body.title,
        author: req.body.author,
        published_date: req.body.published_date,
        pages: req.body.pages,
        language: req.body.language,
        publisher_id: req.body.publisher_id
    },
    {
        where: {
            id: book_id
        }
      }
    )
    if(!book_id){
        res.status(404).send({
            error: true,
            message: 'Id not found'
        })
    }else{
        res.status(201).send({
            error: false,
            message: 'Data has been updated'
        })
    }
});

exports.deletebook = asyncMiddleware(async (req, res) => {
    const book_id = req.params.id;

    const book = await Book.destroy({
        where: {
            id: book_id
        }
    })

    if(!book){
        res.status(404).send({
            message: 'Id not found'
        })
    }else{
        res.status(200).send({
            message: 'book has been deleted'
        })
    }
});
