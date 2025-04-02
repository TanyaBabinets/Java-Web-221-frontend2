import { useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";

export default function Admin() {
    const [categories, setCategories] = useState([]);
    const { request } = useContext(AppContext);
    useEffect(() => {
        request('/product?type=categories')
            .then(setCategories)
            .catch(console.log);
    }, []);
    const formSubmit = e => {
        e.preventDefault();
        console.log("Intercepted");
        // все, что приходит в doPost ProductServlet join:
        fetch("http://localhost:8082/javaweb221/product", {
            method: 'POST',
            body: new FormData(e.target)
        }).then(r => r.text()).then(console.log);

    }
    return <>
        <h1>Admin</h1>
        <form onSubmit={formSubmit} encType="multipart/form-data">
            < input name="product-title" placeholder="Назва" />
            < input name="product-desciption" placeholder="Опис" />
            < input name="product-price" placeholder="Цена" type="number" step="0.01" />
            < input name="product-stock" placeholder="Кол-во" type="number"/>
            < input name="product-code" placeholder="Код" />
            < input name="product-image" placeholder="file" />
            <br />
            <select name="category-id" id="cat_id">
                {categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.categoryTitle}</option>)}
            </select>
            <br /><br />
            <button type="submit">Додати продукт</button>
        </form>
    </>;
}