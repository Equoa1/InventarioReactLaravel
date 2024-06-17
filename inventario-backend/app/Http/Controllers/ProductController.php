<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        $product = Product::create($request->all());

        return response()->json(['message' => 'Product created successfully', 'data' => $product], 201);
    }

   
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->all());

        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(null, 204);
    }

    public function getProductCount()
    {
        $productCount = Product::count();
        return response()->json(['product_count' => $productCount]);
    }
    public function getProductStatistics()
    {
        
        $products = Product::all();
        
        
        $productStats = [
            'views' => $products->count() * 80,  
            'sales' => $products->sum('quantity'), 
        ];

        return response()->json($productStats);
    }

}
