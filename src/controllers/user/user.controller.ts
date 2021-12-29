import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../../config';
import { IUser } from '../../interfaces/user.interface';
import User from '../../model/user/user';

function generateToken( user: IUser ): string {
    return jwt.sign({
        id: user.id,
        lastname: user.lastname,
        phone: user.phone,
        image: user.image,
        mail: user.mail
    }, 
    config.SECRET_KEY || '', 
    { expiresIn: '1h' })
}

export const signup: RequestHandler = async ( req, res) => {

    const emailExist = await User.findOne({ mail: req.body.mail });
    if ( emailExist ) return res.status(400).json({ message: 'Email already exists' });

    try {
        
        const newUser: IUser = new User({
            name: req.body.name,
            lastname: req.body.name,
            phone: req.body.phone,
            image: req.body.image,
            mail: req.body.mail,
            password: req.body.password,
        });
        newUser.password = await newUser.encrypPassword(newUser.password);
        const savedUser = await newUser.save();
        
        const token = generateToken( savedUser );

        res.send({
            ...savedUser._doc,
            token
        });

    } catch (error) {
        res.status(401).send(error);
    }

}

export const signin: RequestHandler = async ( req, res ) => {

    const user = await User.findOne({ mail: req.body.mail });

    if( !user ) {
        return res.status(401).send({ msg: 'User not found' });
    }

    const match = await user.validatePassword(req.body.password);

    if( !match ) {
        return res.status(401).send({ msg: 'Incorrect password' });
    }

    const token = generateToken( user );

    res.send({
        ...user._doc,
        token
    })

}