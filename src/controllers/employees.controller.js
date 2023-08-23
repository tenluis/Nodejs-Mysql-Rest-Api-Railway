import {pool} from '../db.js';

export const getEmployees = async(req,res) => { 
    try{
        const [rows] = await pool.query('SELECT * FROM employee');
        res.send(rows);
    }catch(e){
        return res.status(500).json({
            message:'something goes wrong'
        });
    }

}

export const getEmployee = async(req,res) => { 
    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Employee not found'
        })   
        res.send(rows);
    }catch(e){
        return res.status(500).json({
            message:'something goes wrong'
        });
    }
}

export const postEmployees = async (req,res) => { 
    //console.log(req.body)
    const {name, salary} = req.body;
    try{       
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES(?,?)',[name, salary]);  

        res.send({
            id: rows.insertId,
            name,
            salary
        });
    }catch(e){
        return res.status(500).json({
            message:'something goes wrong'
        });
    }
}

export const updateEmployees = async(req,res) => { 
    const {name, salary} = req.body;
    const id = req.params.id;
    try{    
        const [rows] = await pool.query('UPDATE employee SET name = IFNULL(?,name), salary = IFNULL(?,salary) WHERE id = ?',[name, salary,id]);  
        if (rows.affectedRows <= 0) return res.status(404).json({
            message: 'Employee not exists'
        })
        
        const [result] = await pool.query('SELECT * FROM employee where id = ?',id);

        res.json(result[0]);
    }catch(e){
        return res.status(500).json({
            message:'something goes wrong'
        });
    }
 }

export const deleteEmployees = async(req,res) => { 
    try {
        const [rows] = await pool.query('DELETE FROM employee WHERE id = ?', req.params.id);  
        if (rows.affectedRows <= 0) return res.status(404).json({
            message: 'Employee not exists'
        })
        res.status(204);
    }catch(e){
        return res.status(500).json({
            message:'something goes wrong'
        });
    }
 }

