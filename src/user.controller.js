import { readFile } from "fs/promises";

const readData = async() => {
    try {
        const data = await readFile('./src/dev-data/users.json', { encoding: "utf-8" })
        const json = await JSON.parse(data)
        return json

    } catch (error) {
        console.log(error)
    }
}
export const getUsers = async(req, res) => {
    const arrOfUsers = await readData();
    if (req.params.id) {
        res.send(arrOfUsers.find(user => user._id == req.params.id))
        return
    }
    res.send(arrOfUsers)
}

export const addUsers = async(req, res) => {
    console.log(req.params)
    res.send(req.body)
}