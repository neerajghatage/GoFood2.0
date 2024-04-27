import React, { useState } from 'react';

export default function FormFoodItem() {
    const [categoryName, setCategoryName] = useState("");
    const [dishName, setDishName] = useState("");
    const [description, setDescription] = useState("");
    const [halfPrice, setHalfPrice] = useState("");
    const [fullPrice, setFullPrice] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('CategoryName', categoryName);
        formData.append('name', dishName);
        formData.append('description', description);
        formData.append('half', halfPrice);
        formData.append('full', fullPrice);
        formData.append('files', image);

        try {
            const response = await fetch('http://localhost:5000/api/food-items', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('Form Data Submitted: ', formData);
                // Here you can handle the success case, e.g., show a success message
                // Navigate to /admin route
                window.location.href = '/admin';
            } else {
                console.log('Form Data Submission Failed');
                // Here you can handle the failure case, e.g., show an error message
            }
        } catch (error) {
            console.log('Form Data Submission Error: ', error);
            // Here you can handle the error case, e.g., show an error message
        }
    };

    return (
        <div className="card mt-3 mx-auto" style={{ width: "20rem" }}>
            <div className="card-body">
                <h5 className="card-title">Add New Dish</h5>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control mb-2" placeholder="Category Name" onChange={e => setCategoryName(e.target.value)} />
                    <input type="text" className="form-control mb-2" placeholder="Dish Name" onChange={e => setDishName(e.target.value)} />
                    <input type="file" className="form-control mb-2" onChange={e => setImage(e.target.files[0])} />
                    <input type="text" className="form-control mb-2" placeholder="Half Portion Price" onChange={e => setHalfPrice(e.target.value)} />
                    <input type="text" className="form-control mb-2" placeholder="Full Portion Price" onChange={e => setFullPrice(e.target.value)} />
                    <textarea className="form-control mb-2" placeholder="Description" rows="3" onChange={e => setDescription(e.target.value)}></textarea>
                    <button type="submit" className="btn btn-success w-100">Add Dish</button>
                </form>
            </div>
        </div>
    );
}
