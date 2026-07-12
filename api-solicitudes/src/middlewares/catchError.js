
import { jsonResponse } from '../helpers/json_response.js';

export const catchError= (err, req, res, next) => {
    console.error(err)
   res.status(500).json(jsonResponse({
        status: 500,
        message: "Internal Server Error",
        data: err.message
    }))
}