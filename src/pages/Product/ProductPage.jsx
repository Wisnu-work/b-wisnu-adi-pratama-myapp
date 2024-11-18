import { useState, useEffect, useRef, useTransition } from "react";
import getAllProducts from "../../services/getAllProducts";
import CardList from "../../components/CardList/CardList";
import Navbar from "../../components/Navbar/Navbar";
import RadioButton from "../../components/RadioButton/RadioButton";
import getAllProductCategories from "../../services/getAllProductCategories";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const radioButtonOpts = useRef([
        {
        label: "All",
        value: "all",
        },
    ]);

    const originalProducts = useRef([]);
    const [isPending, startTransition] = useTransition();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [priceSort, setPriceSort] = useState("default"); // State untuk filter harga

    useEffect(() => {
        function fetchAllProducts() {
        let allProducts = getAllProducts();
        allProducts = allProducts.length > 0 ? allProducts : [];
        originalProducts.current = allProducts; // simpan data produk yg belum difilter
        setProducts(allProducts); // simpan data produk yg sudah difilter
        }

        function fetchCategories() {
        const allCategories = getAllProductCategories();
        const newCategories = allCategories
            .map((cat) => ({ label: cat.name, value: cat.slug }))
            .filter(
            (newCat) =>
                !radioButtonOpts.current.some(
                (existingCat) => existingCat.value === newCat.value
                )
            );
        radioButtonOpts.current = [...radioButtonOpts.current, ...newCategories];
        }

        fetchCategories();
        fetchAllProducts();
    }, []);

    useEffect(() => {
        startTransition(() => {
        let filtered = originalProducts.current.filter((product) => {
            const matchedCategory =
            selectedCategory === "all" || product.categorySlug === selectedCategory;
            const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
            return matchedCategory && matchesSearch;
        });

        // Penyortiran harga
        if (priceSort === "high-to-low") {
            filtered = filtered.sort((a, b) => b.price - a.price); // High to Low
        } else if (priceSort === "low-to-high") {
            filtered = filtered.sort((a, b) => a.price - b.price); // Low to High
        }

        setProducts(filtered);
        });
    }, [selectedCategory, searchQuery, priceSort]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    return (
        <>
        <Navbar onSearchChange={handleSearchChange}></Navbar>
        <div className="px-24 py-4 gap-4 mt-4 flex-wrap">
            <h3 className="font-medium text-[#f5f5f5]">Filter</h3>
            <div className="flex gap-2 flex-wrap">
            <RadioButton
                options={radioButtonOpts.current}
                defaultValue={"all"}
                onChange={handleCategoryChange}
            />
            </div>
            <div className="flex gap-2 items-center">
            <label htmlFor="priceSort" className="font-medium text-[#f5f5f5]">
                Sort by Price:
            </label>
            <select
                id="priceSort"
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="px-4 py-2 border rounded-md"
            >
                <option value="default">Default</option>
                <option value="high-to-low">High to Low</option>
                <option value="low-to-high">Low to High</option>
            </select>
            </div>
        </div>
        <section className="container px-24 py-4">
            <main className="grid grid-cols-4 gap-4">
            <CardList products={products} isPending={isPending} />
            </main>
        </section>
        </>
    );
}
