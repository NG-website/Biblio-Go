import path from 'path'
import fs from 'fs'

const imageController = {
    async getOne(req, res) {
       const image = (req.query.name)
        console.log(image)
        const pathFile = path.join(path.resolve("uploads", image))

        if (!fs.existsSync(pathFile)) {
            return res.status(404).send("Image non trouvée");
        }
            res.sendFile(pathFile)
    },
        async postOne(req, res) {
            console.log("file",req.file)
             console.log("body",req.body)
    }


}
export default imageController