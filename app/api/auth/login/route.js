import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export async function POST(request) {
 let body = await request.json();
 // let user = await pool.query(`SELECT * FROM auth.users WHERE email = '${email}' AND password = '${password}' `)
 // user = user.rows[0]
 // console.log(user)
 console.log(body)
 if (user) {} else {}
}