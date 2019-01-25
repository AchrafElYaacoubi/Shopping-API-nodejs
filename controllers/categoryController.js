import Category from "../models/Category";

// Create a new Category
export function createCategory(req, res) {
    // Get data from req && Create a new object Category
    // ?? fields must not be null 
    if(!req.body.name) 
        return res.status(400).send("Categry name cannot be null");
    const newCategory = new Category ({
        name: req.body.name,
    })
    // Save it into the db
    newCategory.save()
    .then(category => res.send(category))
    // ?? Error while saving the category 500 error creating category
    .catch(err => res.status(500).send('Error while creating the category'))
}

// Delete a category 
export function deleteCategory(req, res) {
    // Get id from req.params
    // Delete the category
    Category.findByIdAndRemove(req.params.id)
        .then(category => {
            if(!category) {
                return res.send("Category not found", 401);
            }
            res.send("Category was deleted successfuly");
        }).catch(err => res(err.messahe, 500));
}
