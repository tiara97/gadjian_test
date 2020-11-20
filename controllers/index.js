const database = require('../database')
const util = require('util')

const asyncQuery = util.promisify(database.query).bind(database)
const generateQuery = (body) => {
    let result = ''
    for (let key in body) {
        result += `${key} = ${database.escape(body[key])},`
    }
    return result.slice(0, -1)
}

module.exports = {
    getEmployees: async (req, res) => {
        const query = `SELECT * FROM employees;`
        try {
            const result = await asyncQuery(query)
            res.status(200).send(result)
        } catch (err) {
            res.status(500).send(err)
        }
    },
    getEmployeeByID: async (req, res) => {
        const id = parseInt(req.params.id)
        const query = `SELECT * FROM employees WHERE id = ${id};`
        try {
            const result = await asyncQuery(query)
            res.status(200).send(result[0])
        } catch (err) {
            res.status(500).send(err)
        }
    },
    addEmployee: async (req, res) => {
        const { name, phone_number, job_title } = req.body
        const query = `INSERT INTO employees (name, phone_number, job_title) VALUES (${database.escape(name)}, ${database.escape(phone_number)}, ${database.escape(job_title)});`
        try {
            const result = await asyncQuery(query)
            res.status(201).send(req.body)
        } catch (err) {
            res.status(500).send(err)
        }
    },
    editEmployee: async (req, res) => {
        const id = parseInt(req.params.id)
        try {
            const query = `SELECT * FROM employees WHERE id = ${id};`
            const check = await asyncQuery(query)
            if (check.length === 0) return res.status(500).send(`Employee dengan ID ${id} tidak ada`)

            const edit = `UPDATE employees SET ${generateQuery(req.body)} WHERE id = '${id}';`
            const result = await asyncQuery(edit)

            const update = await asyncQuery(query)
            res.status(200).send(update[0])
        } catch (err) {
            res.status(500).send(err)
        }
    },
    deleteEmployee: async (req, res) => {
        const id = parseInt(req.params.id)
        try {
            const query = `SELECT * FROM employees WHERE id = ${id};`
            const check = await asyncQuery(query)
            if (check.length === 0) return res.status(500).send(`Employee dengan ID ${id} tidak ada`)

            const del = `DELETE FROM employees WHERE id =${id};`
            const result = await asyncQuery(del)
            res.status(204).send(result)
        } catch (err) {
            res.status(500).send(err)
        }
    },
    reverse: async (req, res) => {
        const { character } = req.body
        console.log(character)
        let out = ''
        let arr = character.toString().split('')
        for (let i = arr.length - 1; i >= 0; i--) {
            out += arr[i]
        }
        try {
            res.status(200).send(`result : ${out}`)
        } catch (err) {
            res.status(500).send(err)
        }
    },
    fibonacci: async (req, res) => {
        const { n } = req.body
        let out = []
        for (let i = 0; i < n; i++) {
            if (i === 0) out.push(0)
            else if (i === 1) out.push(1)
            else {
                out.push(out[i - 1] + out[i - 2])
            }
        }
        try {
            res.status(200).send(`result : ${out.join(' ')}`)
        } catch (err) {
            res.status(500).send(err)
        }
    },
    combination: async (req, res) => {
        const { n, r } = req.body
        if (isNaN(parseInt(n)) || isNaN(parseInt(r))) return res.status(500).send('Input harus berupa integer')
        if (n < r) return res.status(500).send('nilai n harus lebih besar daripada r')
        let sum_n = 1
        let sum_r = 1
        let sum_nr = 1
        for (let i = 1; i <= n; i++) {
            sum_n *= i
        }
        for (let i = 1; i <= r; i++) {
            sum_r *= i
        }
        for (let i = 1; i <= n - r; i++) {
            sum_nr *= i
        }
        try {
            res.status(200).send(`result : ` + (sum_n / (sum_r*sum_nr)))
        } catch (err) {
            res.status(500).send(err)
        }
    },
}