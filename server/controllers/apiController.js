
import apiModel from "../models/apiModel.js"


const apiController = {
    async verifUser(req, res) {
        try {
            const userId = req.body.id
            const result = await apiModel.findOne({
                where: { id: userId }
            });
            if(result){
                res.status(200).json(result.token)
            }
        } catch (error) {res.status(500).json("erreur serveur")}
    }
}
export default apiController