import Commande from "../models/Commande";

// Func to get all Commandes
export function getAllCommandes(req,res) {
    // Get all Commandes from db
    Commande.find()
    .then(commandes => res.status(200).send(commandes))
    .catch(err => res.status(500).send(err.message || "Some error occured while retrieving commandes"))
        
}

// Get one Commande by id
export function getCommandeById(req, res) {
    // Get id from req
    // Fetch the Commande
    Commande.findById(req.params.id)
    .then(commande => {
        if(!commande)
            return res.status(401).send(`commande with id: ${req.params.id} does not exist!`)
        res.status(200).send(commande)
    }).catch(err => {
        if(err.kind === 'ObjectId')
            return res.status(401).send(`commande with id: ${req.params.id} does not exist!`)
        res.status(500).send(err.message || "Some error occured while retrieving the commande with id: " + req.params.id);
    })
}

// Create a new Commande
export function createCommande(req, res) {
    // Get authenticated user
    const currentUser = req.session.currentUser;
    let totalprice = 0;
    currentUser.cart.forEach(product => {
        totalprice += product.price;
    })

    console.log('totalprice', totalprice)
    const newCommande = new Commande({
        produits: currentUser.cart,
        totalPrice:totalprice,
        userId: currentUser._id
    })
    newCommande.save()
        .then(commande => res.status(200).send(commande))
        .catch(err => res.status(500).send(err.message))

}




