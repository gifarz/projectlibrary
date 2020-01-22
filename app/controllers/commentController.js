const db = require('../configs/db');
const Comment = db.comment;
const Book = db.book;
const User = db.user;
const asyncMiddleware = require("express-async-handler");

exports.createComment = asyncMiddleware(async (req, res) => {
    const book_id = req.params.id;

    const comment = await Comment.create({
        userId: req.userId,
        bookId: book_id,
        name: req.body.name,
        message: req.body.message
    })

    res.status(201).send({
        status: "comment has been added",
        comment: comment
    })
})

exports.getComment = asyncMiddleware(async (req, res) => {
    const comment = await Comment.findAll({
        attributes: ["id", "name", "message"],
        include: [
            {
                model: Book,
                attributes: ["id", "title"]
            },
            {
                model: User,
                attributes: ["id", "username"]
            }
        ]
    });
    res.status(200).json({
        description: "All Comments",
        comment: comment
    });
});