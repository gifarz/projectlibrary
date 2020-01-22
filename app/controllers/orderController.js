const db = require('../configs/db');
const User = db.user;
const Book = db.book;
const Order = db.order;
const asyncMiddleware = require("express-async-handler");

exports.order = asyncMiddleware(async (req, res) => {
    const userId = req.body.userId;

    if(userId){
        const order = await Order.create({
            userId: req.body.userId,
            bookId: req.body.bookId
        });
        res.status(201).send({
            status: "order has been added"
        });
    }else{
        res.status(404).send({
            status: "userId not found"
        });
    }  
});

exports.orders = asyncMiddleware(async (req, res) => {
    const order = await Order.findAll({
        attributes: ["id", "userid", "bookId"]
    });
    res.status(200).json({
        description: "All Order",
        order: order
    });
});

exports.orderId = asyncMiddleware(async (req, res) => {
    const user_id = req.params.id;

    const order = await Order.findAll({
        where: {
            userId: user_id
        }
    })
    if(!order){
        res.status(404).send({
            message: 'Id not found',
            order: order
        })
    }else{
        res.status(200).send({
            message: 'order',
            order: order
        })
    }
    
});