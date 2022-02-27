import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import config from '../../config';
import { IUser } from '../../interfaces/user.interface';
import User from '../../model/user/user';
import { generateRandom } from '../../utils/generateNumber';

function generateToken( user: IUser ): string {
    return jwt.sign({
        id: user.id,
        lastname: user.lastname,
        username: user.username,
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

    const rand = generateRandom();

    const username = `${req.body.name + '.' + req.body.lastname + '.' + rand}`;

    try {
        
        const newUser: IUser = new User({
            name: req.body.name,
            lastname: req.body.lastname,
            username: username,
            phone: req.body.phone,
            image: req.body.image,
            mail: req.body.mail,
            password: req.body.password,
        });
        newUser.password = await newUser.encrypPassword(newUser.password);
        const savedUser = await newUser.save();
        
        const token = generateToken( savedUser );

        res.json({
            ...savedUser._doc,
            token
        });

    } catch (error) {
        res.status(401).json(error);
    }

}

export const signin: RequestHandler = async ( req, res ) => {

    const user = await User.findOne({ mail: req.body.email });

    if( !user ) {
        return res.status(401).json({ msgUser: 'User not found' });
    } else {

        const match = await user.validatePassword(req.body.password);

        if( !match ) {
            return res.status(401).json({ msgPass: 'Incorrect password' });
        }

        const token = generateToken( user );

        res.json({
            ...user._doc,
            token
        });

    }
    
}

export const getUser: RequestHandler = async ( req, res ) => {

    const user = await User.findById(req.userId);

    if ( !user ) {
        res.status(401).send({ message: 'Usuario no encontrado' })
    }

    res.status(201).send(user);

}