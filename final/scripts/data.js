export async function getProducts() {
    try {
        const response = await fetch("data/products.json");

        if (!response.ok) {
            throw new Error(`Product data request failed: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

