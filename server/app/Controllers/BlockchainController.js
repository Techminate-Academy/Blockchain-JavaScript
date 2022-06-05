const asyncHandler = require('express-async-handler')

const blockChain = asyncHandler(
    async (req, res) => {
        // const contactList = await Contact.find()
        const contactList = await Contact.find({ user: req.user.id })

        res.status(200).json(contactList)
    }
)


module.exports = {
    blockChain
}