import { Component } from "react";
module.exports = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/login') {
        if (res.body.username === 'jack' && req.body.password === '123456') {
            return res.status(200).json({
                user: {
                    token: '123'
                }
            })
        } else {
            return res.status(400).json({
                message: '用户名或者密码错误'
            })
        }
    }
    next();
}