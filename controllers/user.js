const { getUserByID } = require('../model/user')

const getUser = async (req,res) => {
    const { userid } = req.session ;
    const data = await getUserByID(userid);
    if( data.err ) {
        return res.status(404).json({ err })
    }
    res.status(200).json({ data })

}

module.exports = {
    getUser,
    
}